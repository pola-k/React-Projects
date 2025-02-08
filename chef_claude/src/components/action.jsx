export default function Action(props)
{
    return (
        <>
            <div className="action-container">
                <div className="action-left">
                    <h3>Ready for a Recipe?</h3>
                    <p>Generate a recipe from your list of ingredients</p>
                </div>
                <div className="action-right">
                    <button className="action-btn" onClick={props.onclick}>Get a Recipe</button>
                </div>
            </div>
        </>
    )
}