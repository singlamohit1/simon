import {useState} from 'react'
import Header from './components/header'
import Game from './components/game'
import './App.css'
const App = ()=>{
  const [dangerzone,setdangerzone] = useState(false)
  var className5 = !dangerzone ? "App" : ["App" , "Appglow"].join(' ');

  return (
    <div  className={className5}>
      <Header/>
      <Game dangerstate={{ setdangerzone: setdangerzone }}/>
    </div>
  )
}

export default App