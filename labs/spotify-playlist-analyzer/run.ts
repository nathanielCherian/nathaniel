import fetch from 'node-fetch';

//let OAUTH_TOKEN = "BQD0ydNsG9N2KTiKb7oMw0Igz2Vfo84wzbd0E8U4GaRpBl5DI1cfVxgUWZpTHGR11_fELWTjfZY7eKe_bw9kLKqcCuCim01F11qclPw0bLsFVnc4m4LaCB2-VIPo7HYQC9aU4RsA9C9UXxnjEQ1o_IoXDnStRG_Qd-sUY7TMeVCXu8SKqyG5nfvfMbhckQ_HI1A2QPOceRFjRB_ViG1mzzkX0cJErW-1EijiCy2ieq439gAAdc-JQkNKCWftnZEBn0kqUvMfwE2Iy4xMBaDHl6BcdUU";
let OAUTH_TOKEN = "BQD8cJma7kR3uq_HdOtqO8-f5LEqtB3snOMxxHo8PAT4qnejRwTCp8N59YDRt6Sy9UspsPRPIB7-I0RtIMC8_kEun-08_ZZ1UBK5pkPK5jmHi_Ux-vxXYtvfUDRAV3bovATLHCzsR1keNaz-5JJaO8tQWReODBNidmLX6lPTZerUpB9NUeXXuiMJEmU_EMrWBedgYFO6IsDteLu0Cf8ko6YeWDjBhJDNqoQOiSSoQoqyCxeBxaWsYFdgweDEURZWNfKyV8J0trV9ZoSg5OyoJZkuXqM5tGxkU-sZ";
let PLAYLIST_API = "https://api.spotify.com/v1/playlists/";
let PARAMS = "/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref%2Cimages)))&limit=5&offset=5";
const playlistID = "1H8x3NpOD4nBV20ExakdwW";


async function main(){
    const res = await fetch(PLAYLIST_API + playlistID + PARAMS, {
        headers:{
            'Authorization': "Bearer "+OAUTH_TOKEN
        }
    });
    const data = await res.json();
    const items = data["items"];
    const songs = [];

    for(const item of items){
        songs.push({
            name:item["track"]["album"]["name"],
            image:item["track"]["album"]["images"][0]["url"]
        });
    }

    console.log(songs);
}

main();