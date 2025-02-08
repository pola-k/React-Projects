export default function Form(props)
{
    return(
        <>
            <form  onSubmit={props.onSubmit} className="form">
                <input aria-label="Add Ingredient" placeholder="e.g. Oregano" type="text" name="ingredient" id="input-box" />
                <button type="submit" className="add-btn">Add Ingredient</button>
            </form>
        </>
    )
}