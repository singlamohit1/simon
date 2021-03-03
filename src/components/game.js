import  {useState} from 'react'
import useSound from 'use-sound';
import './game.css'
import sound from '../../src/buzzer.mp3';

const Game = ({dangerstate})=>{
    const [play] = useSound(sound);

 const [gamestarted, setgamestarted] = useState(false);
    const [level, setlevel] = useState(1);
    const [tilearray, settilearray] = useState([]);
    const [curindex, setcurindex] = useState(0);
    const { setdangerzone } = dangerstate
    const [msg, setmsg] = useState("");
    const [applyglobal , setapplyglobal] = useState([false , false ,false ,false])
    const [prevscore, setprevscore] = useState("");
    const [bestscore, setbestscore] = useState("");

    const makeTileGlow = (rn) =>{
      switch (rn) {
        case 1:
            setapplyglobal([true ,false,false,false])
          break;
          case 2:
            setapplyglobal([false,true ,false,false])
          break;
          case 3:
            setapplyglobal([ false,false,true,false])
          break;
          case 4:
            setapplyglobal([ false,false,false ,true])
          break;
          default :
           break;

      }
    }

    const changeGameStatus = ()=>  {
        setgamestarted(!gamestarted)
        setdangerzone(false)
        if(!gamestarted)
        {
            const rn =  Math.floor(Math.random() * 4) + 1  ;
            settilearray(tilearray => [...tilearray, rn])
            play()
            makeTileGlow(rn)
        }
        else
        {
            setlevel(1);
            settilearray([]);
            setcurindex(0)
            setapplyglobal([false ,false,false,false])
        }

    }
    

    const recoredresponse = (tile)=>  {
        if(gamestarted)
        {
            play()
            if(tile===tilearray[curindex])
            {
                setcurindex(index => index+1)
                if(curindex === tilearray.length-1) //last tile of pattern clicked ..to generate new tile
                {
                    setlevel(level => level+1)
                    setcurindex(0);
                    const rn =  Math.floor(Math.random() * 4) + 1  ;
                    settilearray(tilearray => [...tilearray, rn])
                    play()
                    makeTileGlow(rn)
                   
                }
                else //Not last tile of pattern clicked 
                {
                  setapplyglobal([false ,false,false,false])
                }

            }
            else //wrong tile tapped
            {
                if(!bestscore ||(level>bestscore) )
                setbestscore(level)
                setlevel(1);
                settilearray([]);
                setcurindex(0)  
                setprevscore(level)
                setdangerzone(true)
                setgamestarted(false)
                setmsg("GAME OVER...Thanks for playing")
                setapplyglobal([false ,false,false,false])
            }
        }
    }

    var className1 = !applyglobal[0] ? "tile1" : ["tile1" , "tile1glow"].join(' ');
    var className2 = !applyglobal[1] ? "tile2" : ["tile2" , "tile2glow"].join(' ');
    var className3 = !applyglobal[2] ? "tile3" : ["tile3" , "tile3glow"].join(' ');
    var className4 = !applyglobal[3] ? "tile4" : ["tile4" , "tile4glow"].join(' ');

  return (
    <div  className="gamestyle" >
        {msg ?  <p>{msg}</p>:null}
        {gamestarted ? <p>Level - {level}</p>:null}
        
        <div className="first2tiles">
            <div type="button" className={className1}onClick={() => recoredresponse(1)}></div>
            <div className={className2} onClick={() => recoredresponse(2)}></div>
        </div>
        <div className="last2tiles">
            <div className={className3} onClick={() => recoredresponse(3)}></div>
            <div className={className4} onClick={() => recoredresponse(4)}></div>
        </div>
 
        {!gamestarted ? <button className="button" onClick={changeGameStatus}>START</button>
        : <button className="button" onClick={changeGameStatus}>STOP</button>
    }
           { prevscore ? <p>Previous Score - {prevscore} </p>:null}
        { prevscore ? <p>Best Score - {bestscore} </p>:null}
     </div>
  )
}

export default Game