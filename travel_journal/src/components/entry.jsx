export default function Entry(props)
{
    const src = props.entry.img.src
    const alt = props.entry.img.alt
    return (
        <>
            <div className="entry">
                <div className="left-entry">
                    <img src={src} alt={alt} />
                </div>
                <div className="right-entry">
                    <header className="location">
                        <div className="location-left">
                            <img src="./src/images/marker.png" alt="Marker" />
                            <h3>{props.entry.country}</h3>
                        </div>
                        <div className="location-right">
                            <a href={props.entry.googleMapsLink}>View on Google Maps</a>
                        </div>
                    </header>
                    <h1 className="entry-heading">{props.entry.title}</h1>
                    <p className="entry-date">{props.entry.dates}</p>
                    <p className="entry-description">{props.entry.text}</p>
                </div>
            </div>
        </>
    )
}