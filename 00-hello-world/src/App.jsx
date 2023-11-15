import './App.css';
import { TwitterFollowCard } from  './TwitterFollowCard.jsx'

export function App () {
    return (
        <section>
            <TwitterFollowCard 
                userName="midudev" 
                name="Elon Musk"/>
            <TwitterFollowCard
                userName="pheralb"
                name="Pablo Hernández"/>
        </section>
    )
}