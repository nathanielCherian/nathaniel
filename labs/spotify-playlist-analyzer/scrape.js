const fs = require("fs");
const fetch = require("node-fetch");

let OAUTH_TOKEN = "BQAfgmeOhB8MLjNXVPXCP8B7kfCqvqQOd-uIr2MMay6z7gnTp1peI_tVhCUTGDaUPHHTxRh-yOzxTlrLRXU";
let PLAYLIST_API = "https://api.spotify.com/v1/playlists/";
let PARAMS = "/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref%2Cimages)))&limit=100&offset=100";
const playlistID = "1H8x3NpOD4nBV20ExakdwW";


async function main(){
    const res = await fetch(PLAYLIST_API + playlistID + PARAMS, {
        headers:{
            'Authorization': "Bearer "+OAUTH_TOKEN
        }
    });
    const data = await res.json();
    console.log(data);

    let jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('playlist100-200.json', jsonData);
}

main();
