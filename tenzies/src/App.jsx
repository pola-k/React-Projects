import { useEffect, useRef, useState } from 'react'
import Header from './components/header'
import Die from './components/die'
import Confetti from 'react-confetti'

export default function App() 
{
    const [dices, setDices] = useState(() => generateAllNewDice())
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const gameOver = dices.every(die => die.freeze) && dices.every(die => dices[0].number === die.number)
    const dices_object = dices.map((die) => <Die key={die.id} 
                                                      number={die.number} 
                                                      freeze={die.freeze} 
                                                      onClick={gameOver ? null : () => selectDie(die)}/>)

    const btnRef = useRef(null)

    useEffect(() => {
        function handleResize() 
        {
          setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (gameOver) 
        {
          btnRef.current.focus()
        }
    }, [gameOver])

    function newGame() 
    {
      setDices(generateAllNewDice())
    }

    function selectDie(selectedDie) 
    {
      setDices(prev => prev.map((die) => die.id === selectedDie.id ? {...die, freeze: !die.freeze} : die))
    }

    function reRoll() 
    {
      setDices(prev => prev.map((die) => !die.freeze ? {...die, number: Math.floor(Math.random() * 6) + 1} : die))
    }

    function generateAllNewDice() 
    {
      return new Array(12).fill({}).map((n ,index) => ({id: index, number: Math.floor(Math.random() * 6) + 1, freeze: false}))
    }

    return (
      <>
        {gameOver && (<Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={true}/>)}

        <div className="game-area">
          <Header/>
          <div className="container">
              {dices_object}
          </div>
          <div className='btn-container'>
            <button ref={btnRef} className='roll-btn' onClick={!gameOver ? reRoll : newGame}>{gameOver ? "New Game" : "Roll"}</button>
          </div>
        </div>
      </>
    )
}
