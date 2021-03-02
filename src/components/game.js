import react , {useState} from 'react'
import useSound from 'use-sound';
import './game.css'
import sound from '../../src/buzzer.mp3';

const Game = ({dangerstate})=>{
    const [play] = useSound(sound);
    const [gamestarted, setgamestarted] = useState(false);
    const [level, setlevel] = useState(1);
    const [tilearray, settilearray] = useState([]);
    const [curindex, setcurindex] = useState(0);
    const {setdangerzone } = dangerstate
    const [msg, setmsg] = useState("");
    const [applyglobal1, setapplyglobal1] = useState(false);
    const [applyglobal2, setapplyglobal2] = useState(false);
    const [applyglobal3, setapplyglobal3] = useState(false);
    const [applyglobal4, setapplyglobal4] = useState(false);
    const [applyglobal, setapplyglobal] = useState(false);
    const [prevscore, setprevscore] = useState("");
    const [bestscore, setbestscore] = useState("");

    const changeGameStatus = ()=>  {
        setgamestarted(!gamestarted)
        setdangerzone(false)
        if(!gamestarted)
        {
            const rn =  Math.floor(Math.random() * 4) + 1  ;
            settilearray(tilearray => [...tilearray, rn])
            play()
            switch (rn) {
                case 1:
                    setapplyglobal1(true)
                  break;
                  case 2:
                    setapplyglobal2(true)
                  break;
                  case 3:
                    setapplyglobal3(true)
                  break;
                  case 4:
                    setapplyglobal4(true)
                  break;

              }
            
        }
        else
        {
            setlevel(1);
            settilearray([]);
            setcurindex(0)
            setapplyglobal1(false)
            setapplyglobal2(false)
            setapplyglobal3(false)
            setapplyglobal4(false)
        }

    }
  

    const recoredresponse = (tile)=>  {
        play()
        if(gamestarted)
        {
            if(tile==tilearray[curindex])
            {
                setcurindex(index => index+1)
                if(curindex == tilearray.length-1)
                {
                    setlevel(level => level+1)
                    setcurindex(0);

                    const rn =  Math.floor(Math.random() * 4) + 1  ;
                    //
                    // setTimeout(function(){ alert("Hello"); }, 5000);
                    settilearray(tilearray => [...tilearray, rn])
                    play()
                    switch (rn) {
                        case 1:
                            setapplyglobal1(true)
                          break;
                          case 2:
                            setapplyglobal2(true)
                          break;
                          case 3:
                            setapplyglobal3(true)
                          break;
                          case 4:
                            setapplyglobal4(true)
                          break;
        
                      }
                }
                else
                {
                  setapplyglobal1(false)
                  setapplyglobal2(false)
                  setapplyglobal3(false)
                  setapplyglobal4(false)
                }

            }
            else
            {
                if(!bestscore ||(level>bestscore) )
                setbestscore(level)
                setlevel(1);
                settilearray([]);
                setcurindex(0)  
                setprevscore(level)
                setdangerzone(true)
                setgamestarted(false)
                setmsg("game over")
                setapplyglobal1(false)
                setapplyglobal2(false)
                setapplyglobal3(false)
                setapplyglobal4(false)
            }


        }

    }

//   var className1 = !applyglobal ? "tile1" : ["tile1","tile1glow"];
  var className1 = !applyglobal1 ? "tile1" : ["tile1" , "tile1glow"].join(' ');
  var className2 = !applyglobal2 ? "tile2" : ["tile2" , "tile2glow"].join(' ');
  var className3 = !applyglobal3 ? "tile3" : ["tile3" , "tile3glow"].join(' ');
  var className4 = !applyglobal4 ? "tile4" : ["tile4" , "tile4glow"].join(' ');
  
  return (
    <div  className="gamestyle" >
        {/* <p>Game Started -  <b>{String(gamestarted)}</b>.</p> */}
        {msg ?  <p>{msg}...Thanks for playing</p>:null}
        {gamestarted ? <p>Level - {level}</p>:null}
        
        <div className="first2tiles">
            <div className={className1}onClick={() => recoredresponse(1)}></div>
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