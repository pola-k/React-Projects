export default function Header(props)
{
    return(
        <>
            <header className="header">
                <h2>Assembly Endgame</h2>
                <p>Guess the word in under {props.life} attempts to keep the programming world safe from Assembly!</p>
            </header>
        </>
    )
}