import { useRef, useState, useEffect } from 'react'
import Header from './components/Header'
import Letter from './components/Letter'
import Language from './components/Language'
import Guess from './components/Guess'
import {languages} from '../languages.js'
import {words} from '../words.js'

export default function App() {
  
  const [lettersArray, setLettersArray] = useState(() => initialiseLetters())
  const [languageArray, setLanguageArray] = useState(languages)
  const [guessArray, setGuessArray] = useState(() => getGuessWord())
  const [life, setLife] = useState(languageArray.length - 1)
  const [notificationQueue, setNotificationQueue] = useState([])
  const [currentNotification, setCurrentNotification] = useState("")

  const gameOver = (life === 0) || (guessArray.every(guess => guess.show))
  const letterComponents = lettersArray.map(char => <Letter key={char.id} letter={char.letter} id={char.id} isGuessed={char.isGuessed} backgroundColor={char.backgroundColor} onClick={!gameOver ? () => handleLetterClick(char) : null} />)
  const languageComponents = languageArray.map(lang => <Language key={lang.id} text={lang.text} backgroundColor={lang.backgroundColor} color={lang.color} used={lang.used} id={lang.id}/>)
  const guessComponents = guessArray.map((char,index) => <Guess key={index} letter={char.letter} isGuessed={char.isGuessed} show={char.show} />)
  let notificationTimeout;

  useEffect(() => 
  {
    if (life !== languageArray.length - 1) 
      {
        const farewellText = getFarewellText(languages[languageArray.length - life - 2].text)
        setNotificationQueue(prevQueue => [...prevQueue, farewellText])
      }
  }, [life])

  useEffect(() => {
    if (currentNotification === "" && notificationQueue.length > 0) 
    {
      const nextNotification = notificationQueue[0]

      setCurrentNotification(nextNotification)
      setNotificationQueue(prevQueue => prevQueue.slice(1))

      notificationTimeout = setTimeout(() => {
        setCurrentNotification("")
      }, 2000)
    }
  }, [notificationQueue, currentNotification])

  useEffect(() => 
  {
    if (gameOver) 
      {
        setGuessArray(prev => prev.map(guess => ({ ...guess, show: true })));
      }
  }, [gameOver])

  function getGuessWord()
  {
    const random = Math.floor(Math.random() * words.length)
    const word =  words[random].toUpperCase()
    return word.split('').map(char => ({letter: char, isGuessed: false, show:false}))
  }

  function handleLetterClick(char)
  {
    if(guessArray.some(guess => guess.letter === char.letter))
    {
      setLettersArray(prev => prev.map(letter => (letter.id === char.id ? {...letter, backgroundColor:"#00e600", isGuessed: true} : letter)))
      setGuessArray(prev => prev.map(guess => (guess.letter === char.letter ? {...guess, isGuessed: true, show: true} : guess)))
    }
    else
    {
      setLanguageArray(prev => prev.map(lang => (lang.id === (languageArray.length - life - 1) ? {...lang, backgroundColor:"black", color:"white", used: true} : lang)))
      setLettersArray(prev => prev.map(letter => (letter.id === char.id ? {...letter, backgroundColor:"#ff3300", isGuessed: true} : letter)))
      setLife(prev => prev - 1)
    }
  }

  function initialiseLetters()
  {
    let letters = []
    for (let i = 0; i < 26; i++)
    {
      letters.push({letter: String.fromCharCode(65 + i), isGuessed: false, id: i, backgroundColor:"#ffaa00"})
    }
    return letters
  }

  function startNewGame()
  {
    setLettersArray(initialiseLetters())
    setGuessArray(getGuessWord())
    setLife(languageArray.length - 1)
    setLanguageArray(languages)
    setNotificationQueue([])
    setCurrentNotification("")
    if (notificationTimeout) 
    {
      clearTimeout(notificationTimeout)
      notificationTimeout = null
    }
  }

  function getFarewellText(language) 
  {
    const options = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

  return (
    <>
      {currentNotification && <div className="notification">{currentNotification}</div>}
      <Header life={life}/>
      {gameOver && life === 0 && <div className='lose'>
                                    <h2>Game Over!</h2>
                                    <p>You Lose! Better start Learn Assembly &#128557;</p>
                                    <button className='new-game-btn' onClick={startNewGame}>Retry</button>
                                  </div>}
      {gameOver && life > 0 &&  <div className='win'>
                                    <h2>You Win!</h2>
                                    <p>Well Done! &#128079;</p>
                                    <button className='new-game-btn' onClick={startNewGame}>New Game</button>
                                  </div>}
      {!gameOver && <div className="languages-container">
                      {languageComponents}
                    </div>}
      <div className="guess-container">
        {guessComponents}
      </div>
      <div className="letters-container">
          {letterComponents}
      </div>
    </>
  )
}