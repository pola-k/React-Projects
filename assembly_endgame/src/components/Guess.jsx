export default function Guess(props)
{   
    let color = "white"

    if(!props.isGuessed && props.show)
    {
        color = "red"
    }

    return (
        <>
            <span className="guess" style={{color: color}}>{props.show && props.letter}</span>
        </>
    )
}