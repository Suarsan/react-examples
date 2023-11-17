import { useState, useEffect } from 'react'
import { getCatImageFromTags } from '../services/cats.service';

export function useCatImage({ fact }) {

    const [imageUrl, setImageUrl] = useState()

    // Recupera imagen al actualizar fact
    useEffect(() => {
        if (!fact) return
        const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')
        getCatImageFromTags(threeFirstWords).then(data => setImageUrl(`https://cataas.com/cat/${data._id}`))
    }, [fact])

    return { imageUrl }

}