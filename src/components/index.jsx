import React, { useState } from 'react'
import './style.css'

function Lyricist() {

    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [found, setFound] = useState(true);
    const [loading,setLoading]=useState(false);

    async function search(e) {
        e.preventDefault();
        setLoading(true);
        setSong(e.target[0].value);
        setArtist(e.target[1].value)

        if (song === '') {
            alert("Please enter a song!");
            return;
        }

        if (artist === '') {
            alert("Please enter artist's name!");
            return;
        }

        try {
            const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
            const response = await fetch(url);
      
            // Check for 404 or any other error status
            if (!response.ok) {
              throw new Error('Lyrics not found');
            }
      
            const data = await response.json();
      
            setLoading(false);
      
            if (data.error) {
              setFound(false);
            } else {
              setFound(true);
              setLyrics(data.lyrics);
            }
        } catch (err) {
            setLoading(false);
            setFound(false);
        }
    }

    return (
        <div className='main-container'>
            <div className="heading">
                <h1>lyricist</h1>
            </div>
            <div className="container">
                <form onSubmit={search}>
                    <div className="song">
                        <input type="text" placeholder="Enter Song's Name"
                            onChange={(e) => { setSong(e.target.value) }} />
                    </div>
                    <div className="same-line">
                        <input type="text" placeholder="Enter Arist's Name" className='artist'
                            onChange={(e) => { setArtist(e.target.value) }} />
                        <button>Search</button>
                    </div>
                </form>
                <div className="lyrics-container">
                    {loading && <div className='fetching'>Fetching Lyrics...</div>}
                    {!loading && (found === true  ? <pre>{lyrics}</pre> : <span>Sorry, the lyrics cannot be found!!</span>)}
                </div>
            </div>
        </div>
    )
}

export default Lyricist