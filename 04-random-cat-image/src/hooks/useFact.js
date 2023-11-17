import { getFact } from '../services/fact.service'
import { useEffect, useState } from 'react'

export function useFact() {

    const [fact, setFact] = useState()

    const refreshFact = () => {
        getFact().then(fact => setFact(fact))
    }

    useEffect(refreshFact, [])
    
    return  { fact, refreshFact }

}