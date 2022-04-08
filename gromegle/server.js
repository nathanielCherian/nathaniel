const http = require('http');
const static = require('node-static');
const file = new static.Server('./');
const SocketEvents = require('./SocketEvents');
const { RTCPair } = require('./RTCPair');
const WebSocket = require('ws');

const {uuidv4, prepare_message} = require('./utils');

const server = http.createServer((req, res) => {
  req.addListener('end', () => file.serve(req, res)).resume();
});



const rtc_rooms = {};
const random_room = () => {
  const keys = Object.keys(rtc_rooms);
  if(keys.length == 0) return null;
  return rtc_rooms[keys[Math.floor(Math.random() * keys.length)]];
}


const socket_events = new SocketEvents();

// setting ping event
socket_events.on('ping', (payload, socket) => {
  console.log("recieved ping from ", socket.meta.id);
  socket.send(prepare_message('pong', socket.meta));
});

// client creates call
socket_events.on('clientInitiateCall', (payload, socket) => {
  console.log("recieved clientInitiateCall from ", socket.meta.id);
  socket.meta['role'] = 'caller';
  const pair = new RTCPair();
  pair.addSocket(socket);
  pair.setOffer(payload.offer);
  socket.pair = pair;

  rtc_rooms[socket.meta.id] = pair;

});

socket_events.on('clientJoinRequest', (payload, socket) => {
  console.log("recieved clientJoinRequest from ", socket.meta.id);
  socket.meta['role'] = 'callee';
  const {id} = payload;
  const rtc_pair = (rtc_rooms[id] || random_room());
  if(rtc_pair) { // found a room to connect with
    const offer = rtc_pair.offer;
    socket.pair = rtc_pair;
    socket.send(prepare_message('clientJoinResponse', {offer}));
    for(const candidate of rtc_pair.ice_candidates['caller']) {
      socket.send(prepare_message('clientRecieveIceCandidate', {candidate})); // adding callers ice candidates to callee
    }
  }
});

socket_events.on('clientSendAnswer', (payload, socket) => {
  const {answer} = payload;
  const rtc_pair = socket.pair;
  rtc_pair.setAnswer(answer);
  console.log("recieved clientSendAnswer from ", socket.meta.id);
  rtc_pair.sockets.caller.send(prepare_message('clientRecieveAnswer', {answer}));
});

socket_events.on('clientSendIceCandidate', (payload, socket) => {
  const rtc_pair = socket.pair;
  const {candidate} = payload;
  rtc_pair.ice_candidates[socket.meta['role']].push(candidate);
  const other_socket = rtc_pair.otherSocket(socket);
  if(other_socket) {
    other_socket.send(prepare_message('clientRecieveIceCandidate', {candidate}));
  }
});


const clients = new Map();
const wss = new WebSocket.Server({ port: 7071 });
wss.on('connection', (ws) => {
  console.log('new connection: ');
  const meta = {
    id: uuidv4(),
  }
  ws.meta = meta;

  clients.set(meta.id, ws);
  
  ws.on('message', (message) => { 
    const {code, payload} = JSON.parse(message);
    console.log({flow:"incoming",code, payload})
    socket_events.message_received({code, payload}, ws);
  });

  
});


const port = 8080;
server.listen(port, () => console.log(`Server running at http://localhost:${port}`));