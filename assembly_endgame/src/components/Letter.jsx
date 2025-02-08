export default function Letter(props)
{
    return(
        <>
            <button className="letter" style={{backgroundColor: props.backgroundColor}} onClick={props.isGuessed ? null : props.onClick}>{props.letter}</button>
        </>
    )
}