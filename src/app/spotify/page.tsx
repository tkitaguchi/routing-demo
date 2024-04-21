import querystring from "querystring";


const client_id= process.env.SPOTIFY_CLIENT_ID;
const client_secret= process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token= process.env.SPOTIFY_REFRESH_TOKEN;
const basic= Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT= `https://accounts.spotify.com/api/token`;


async function getAccessToken() {
const response= await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers:{
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
    grant_type: "refresh_token",
    refresh_token,
    }),
    });
    return response.json();
}


export default async function Spotify() {
    const myAccessToken= await getAccessToken();
    return(
        <>
        <h3>{myAccessToken.token_type}</h3>
        <h3>{myAccessToken.access_token}</h3>
        <h3>{myAccessToken.scope}</h3>
        </>
    );
}

