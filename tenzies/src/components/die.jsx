export default function Die(props)
{
    return(
        <button className={props.freeze ? "btn freeze" : "btn"} onClick={props.onClick}>{props.number}</button>
    )
}