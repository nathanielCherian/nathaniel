const fs = require("fs");
const fetch = require("node-fetch");

let OAUTH_TOKEN = "BQDs5tzUahohB3utY0wlBgvtTQCF-3FmDvg90og3dG3Vvm18AAN5UL4B4aGrKE6QxK6KhZFreEsCequ57UvMtWc5_50bisZt9iqLdnBXYeF-c8oYRS6zE2v5QW7_tA3qFm055EUznNPAVPJqNIJBeXO5LvOpgzOtCnGgedJ5WsB1vIQ_8Ia3ElStFAq6CSmDxxBzfMhFTUNu3CiWNKLwUZooclWUiFdJXTsI07EAq-4imUy_Xg1fnIxTaJSMwzCNJunsm4VrzJm9qx3R6I6TAgphBW0CIl5GtzEH";
let PLAYLIST_API = "https://api.spotify.com/v1/playlists/";
let PARAMS = "/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref%2Cimages)))&limit=100&offset=200";
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
