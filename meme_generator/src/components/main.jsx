import { useEffect, useState } from "react"
import Form from "./form"
import Meme from "./meme"
export default function Main()
{
    const [meme, setMeme] = useState({imageUrl: "http://i.imgflip.com/1bij.jpg",
                                        topText: "One does not simply", 
                                        bottomText: "Walk into Mordor"})
    const [allMemes, setAllMemes] = useState([])

    function handleChange(event)
    {
        const {name, value} = event.currentTarget
        setMeme(prev => ({...prev, [name] : value}))
    }

    useEffect(() => {
                fetch("https://api.imgflip.com/get_memes")
                .then(response => response.json())
                .then(data => setAllMemes(data.data.memes))
    }, [])

    function getRandomMeme()
    {
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        const img = allMemes[randomIndex]
        setMeme(prev => ({...prev, imageUrl: img.url}))       
    }

    return(
        <>
           <Form onClick={getRandomMeme} onChange={handleChange}/>
           <Meme image={meme.imageUrl} topText={meme.topText} bottomText={meme.bottomText}/> 
        </>
    )
}