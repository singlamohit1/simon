import react , {useState} from 'react'
import './game.css'
const Game = (props)=>{
    // var audioElement = new Audio('car_horn.wav');
    const [gamestarted, setgamestarted] = useState(false);
    const [level, setlevel] = useState(1);
    const [tilearray, settilearray] = useState([]);
    const [curindex, setcurindex] = useState(0);
    const [dangerzone, setdangerzone] = useState(props.dangerzone);
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
        if(!gamestarted)
        {
          // audioElement.play();
            const rn =  Math.floor(Math.random() * 4) + 1  ;
            console.log('num gen is ',rn)
            settilearray(tilearray => [...tilearray, rn])
            
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
            // setuserinputtilearray([]);
        }

    }
  

    const recoredresponse = (tile)=>  {

        if(gamestarted)
        {
            console.log('tile clicked ,',tile)

            if(tile==tilearray[curindex])
            {
                setcurindex(index => index+1)
                if(curindex == tilearray.length-1)
                {
                    setlevel(level => level+1)
                    setcurindex(0);

                    const rn =  Math.floor(Math.random() * 4) + 1  ;
                    console.log('num gen is ',rn)
                    settilearray(tilearray => [...tilearray, rn])
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
                setlevel(1);
                settilearray([]);
                setcurindex(0)  
                setprevscore(level)
                setdangerzone(true)
                if(bestscore && prevscore<bestscore)
                setbestscore(level)
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
        <p>Game Started -  <b>{String(gamestarted)}</b>.</p>
        {/* <p>Current Tile Array -  {tilearray.map((n)=>{
            <p>n</p>
        })}</p>
        {tilearray.map((n)=>{
            <p>n</p>
        })} */}
        <p>{tilearray}</p>
        <p>msg- {msg}</p>
        
        {gamestarted ? <p>Level - {level}</p>:<p>Click on start to play the game</p>}
        
        <div className="first2tiles">
            <div className={className1}onClick={() => recoredresponse(1)}></div>
            <div className={className2} onClick={() => recoredresponse(2)}></div>
        </div>
        <div className="last2tiles">
            <div className={className3} onClick={() => recoredresponse(3)}></div>
            <div className={className4} onClick={() => recoredresponse(4)}></div>
        </div>
        { prevscore ? <p>Previous Score - {prevscore} </p>:null}
        { prevscore ? <p>Best Score - {bestscore} </p>:null}
        {!gamestarted ? <button className="button" onClick={changeGameStatus}>START</button>
        : <button className="button" onClick={changeGameStatus}>STOP</button>
    }
     </div>
  )
}

export default Game