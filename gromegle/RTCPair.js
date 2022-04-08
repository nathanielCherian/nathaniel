
class PairManager {
    pairs = []
    constructor(){}
    addPair(pair){ this.pairs.push(pair) }
    removePair(pair){ this.pairs = this.pairs.filter(p => p !== pair) }
    
}

class RTCPair {
    offer = null;
    answer = null;
    
    sockets = {
        'caller': null,
        'callee': null
    }

    ice_candidates = {
        'caller': [],
        'callee': []
    }


    addSocket(socket) {
        this.sockets[socket.meta.role] = socket;
    }

    otherSocket(socket) {
        if(socket.meta.role == 'caller') {
            return this.sockets['callee'];
        }
        return this.sockets['caller'];
    }

    randomEmptyRoom(){
        var pair = null;
        while(!pair) {
            const rand_i = Math.floor(Math.random() * this.pairs.length);
            pair = this.pairs[rand_i];
            pair = pair.empty() ? pair : null;
        }
        return pair;
    }

    empty(){return !!this.sockets.callee}

    setOffer(offer) {this.offer = offer}
    setAnswer(answer) {this.answer = answer}

}

module.exports = {RTCPair}