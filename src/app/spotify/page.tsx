// // Because this is a literal single page application
// // we detect a callback from Spotify by checking for the hash fragment
// import { redirectToAuthCodeFlow, getAccessToken } from "../../authCodeWithPkce";
// import Searcher from "../../../components/Searcher";

// const clientId = "86045ad9441442bab73da36c38b8f617";
// const url = require('url');

// // Assuming you have a URL string
// const urlString = 'http://example.com/?code=abc123';

// const urlObj = new url.URL(urlString);
// const params = new url.URLSearchParams(urlObj.search);

// const code = params.get('code'); 

// if (!code) {
//     redirectToAuthCodeFlow(clientId);
// } else {
//     const accessToken = await getAccessToken(clientId, code);
//     const profile = await fetchProfile(accessToken);
//     console.log(profile);
//     populateUI(profile);
// }

// async function fetchProfile(code: string): Promise<UserProfile> {
//     const result = await fetch("https://api.spotify.com/v1/me", {
//         method: "GET", headers: { Authorization: `Bearer ${code}` }
//     });

//     return await result.json();
// }

// function populateUI(profile: UserProfile) {
//     const { JSDOM } = require('jsdom');
//     const dom = new JSDOM(`<!DOCTYPE html><p id="displayName"></p>`);
//     let document = dom.window.document;
    
//     document.getElementById("displayName").textContent = profile.display_name;
//     console.log(dom.serialize());
    
// }

// export default function Spotify() {
//     return (
//       <div>
//         <h1>Spotify</h1>
//         <Searcher />
//       </div>
//     );
//   }

  import querystring from "querystring";
import Searcher from "../../../components/Searcher";
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
  <h3>type: {myAccessToken.token_type}</h3>
  <h3>access token: {myAccessToken.access_token}</h3>
  <h3>scope: {myAccessToken.scope}</h3>
  <h3>refresh token: {myAccessToken.refresh_token}</h3>
  <Searcher />
  </>
  );

    }