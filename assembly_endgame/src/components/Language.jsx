export default function Language(props)
{
    return(
        <>
            <span className="language" style={{backgroundColor: props.backgroundColor, color: props.color}}>{!props.used ? props.text : '💀'}</span>
        </>
    )
}