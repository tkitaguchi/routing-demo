

import querystring from "querystring";
import React, { useState, useEffect } from 'react';
import '../app.css';
import axios from 'axios';

async function searchArtist(searchKey: string) {
    const access_token = "BQA0Yt0c5iuUUCA4NoUfBRHzkbaVFVZrjcmavH2Z7TybQKpovmXUye-la_VvFeS10KSBEUsYO9exAOIOSh78i-MhGIT6GN9rO4oPco0kBglReNPDWJSLnTiJwyb751sN-eHPAdpAl8Bsys_uvSLpHl-lA-zJVwpW8_rclcOjzxSoME_CKxoa88_Vub9__EvoNZbwASdoj6mjQgVx";
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            'Content-Type' : "application/json",
            'Authorization': `Bearer ${access_token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    var artistID = data.artists.items[0].id

    var artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${access_token}`
              },
              params: {
                limit: 10,
                market: 'US'
                 
              }
            })
    return artistTracks.data.tracks;
        // setTracks(artistTracks.data.tracks);
    }

export default async function Searcher() {
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
  
    const access_token = "BQA0Yt0c5iuUUCA4NoUfBRHzkbaVFVZrjcmavH2Z7TybQKpovmXUye-la_VvFeS10KSBEUsYO9exAOIOSh78i-MhGIT6GN9rO4oPco0kBglReNPDWJSLnTiJwyb751sN-eHPAdpAl8Bsys_uvSLpHl-lA-zJVwpW8_rclcOjzxSoME_CKxoa88_Vub9__EvoNZbwASdoj6mjQgVx";
    const artistTracks = await searchArtist(searchKey);
    
    // const searchArtist = async () => {
       
    //     const {data} = await axios.get("https://api.spotify.com/v1/search", {
    //         headers: {
    //             'Content-Type' : "application/json",
    //             'Authorization': `Bearer ${access_token}`
    //         },
    //         params: {
    //             q: searchKey,
    //             type: "artist"
    //         }
    //     })
      
    //     var artistID = data.artists.items[0].id
    

    //     var artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
    //         headers: {
    //             Authorization: `Bearer ${access_token}`
    //           },
    //           params: {
    //             limit: 10,
    //             market: 'US'
                 
    //           }
    //         })
    //     setTracks(artistTracks.data.tracks);
    // }

  return (
    
      <>
      <div className="SearchForm">
      
        <input
          className ="Name" 
          type="text" 
          placeholder="Search By Artist Name  ..."
          onChange={(e) => {setSearchKey(e.target.value)}}
          
          />
        
        <button  onClick= {artistTracks.data.tracks.map((track: any) => (
            <div key={track.id}>
                <ul>
                    <li>{track.name}</li>
                </ul>
          </div>
        ))}
        >Search</button>
      </div>
    {
        tracks.slice(0, 5).map((track: any) => (
            <div key={track.id}>
                <ul>
                    <li>{track.name}</li>
                </ul>
            </div>
        ))
    }
      </>
     
  )
}

// export default Searcher;