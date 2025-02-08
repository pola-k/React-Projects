export default function Meme(props)
{
    return (
        <>
            <div className="meme">
                <img src={props.image} />
                <span className="top">{props.topText}</span>
                <span className="bottom">{props.bottomText}</span>
            </div>
        </>
    )
}