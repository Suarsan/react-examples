
import { useState, useEffect } from 'react'
import './App.css'

const FACT_API_URL = `https://catfact.ninja/fact`;
// const IMAGE_API_URL = `https://cataas.com/cat/says/${firstword}?size=50&color=red&json=true`;

export function App() {

    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        fetch(FACT_API_URL)
            .then(res => res.json())
            .then(data => setFact(data.fact))
            .catch(err => console.dir(err))
    }, [])

    useEffect(() => {
        if (!fact) return
        const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?json=true`)
            .then(res => res.json())
            .then(data => setImageUrl(`https://cataas.com/cat/${data._id}`))
            .catch(err => console.dir(err))
    }, [fact])

    return (
        <main>
            <h1>Cats app</h1>
            { fact && <p>{ fact }</p> }
            { imageUrl && <img src={imageUrl} alt="Image"/> }
        </main>
    )
}