import './App.css'
import { Mouse } from './Mouse.jsx'
import { Target } from './Target.jsx'
import { Time } from './Time.jsx'
import { getRandomNumberBetween } from './utils.js'
import { useEffect } from 'react'
import { useState } from 'react'

function App() {

  let stopPromise = null;
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [record, setRecord] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targets, setTargets] = useState([])
  const [touched, setTouched] = useState([])

  const initializeData = () => {
    const targets = new Array(getRandomNumberBetween(1, 10)).fill(0).map((t, id) => {
      const {width, height} = { width: getRandomNumberBetween(20, 100) , height: getRandomNumberBetween(20, 100)}
      return { 
        id,
        x: getRandomNumberBetween(0, window.innerWidth - width), 
        y: getRandomNumberBetween(0, window.innerHeight - height),
        width,
        height
      }
    })
    return targets
  }

  // Initialize targets
  useEffect(() => {
    setTargets(initializeData())
  }, [])

  // Update targets when some target is touched
  useEffect(() => {
    const newTargets = [...targets].filter(ta => touched.find(to => ta.id !== to.id))
    if (targets.length !== newTargets.length) {
      setTargets(newTargets)
    }
  }, [touched])

  // Calculate touched targets when position changes
  useEffect(() => {
    const touched = targets.filter(t => {
      return (position.y > t.y) && (position.y < (t.y + t.height)) && ((position.x > t.x) && (position.x < (t.x + t.width)));
    })
    if (touched?.length) {
      setTouched(touched)
    }
  }, [position])

  // Listen pointer moves and calculate collisions
  useEffect(() => {

    const handleMove = (e) => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })      
    }

    if (playing) {
      startTime()
      window.addEventListener('pointermove', handleMove)
    } else {
      console.dir(stopPromise)
      if (stopPromise) {
        stopPromise.then(intervalId => { console.dir(intervalId); clearInterval(intervalId)})
      }
      window.removeEventListener('pointermove', handleMove)
      setTargets(initializeData())
      setRecord(time);
      setTime(0)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
    
  }, [playing])

  useEffect(() => {
    if (!targets?.length) {
      setPlaying(false)
    }
  }, [targets])

  const toggleEffect = () => {
    setPlaying(true)
  }
  
  const startTime = () => {
    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime + 10)
    }, 10);
    stopPromise = new Promise((res, rej) => {res(intervalId)} )
  }

  return (
    <>
      <Time time={time} record={record}/>
      {
        targets.map((t,i) => {
          return (<Target key={t.id} position={{ x: t.x, y: t.y }} size={{ width: t.width, height: t.height }}/>)
        })
      }
      <Mouse position={{ x: position.x, y: position.y }}/>
      {
        playing || (
          (<button onClick={toggleEffect}>Start</button>)
        )
      }
    </>
  )
}

export default App
