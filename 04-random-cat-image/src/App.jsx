import './App.css'
import { Image } from './components/Image.jsx'
import { useCatImage } from './hooks/useCatImage'
import { useFact } from './hooks/useFact'

export function App() {

    const { fact, refreshFact } = useFact()
    const { imageUrl } = useCatImage({ fact })

    const handleClick = () => refreshFact()

    return (
        <main>
            <h1>Cats app</h1>
            { fact && <p>{ fact }</p> }
            <Image imageUrl={ imageUrl }></Image>
            <button onClick={ handleClick }>Cambiar gato</button>
        </main>
    )
}