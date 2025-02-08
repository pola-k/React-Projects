export default function Form(props)
{
    return(
        <>
            <div className="form-content">
                <div className="form-up">
                    <label className="top-text">
                        <span>Top Text</span>
                        <input type="text" name="topText" placeholder="One does not simply" onChange={props.onChange} />
                    </label>
                    <label className="bottom-text">
                            <span>Bottom Text</span>
                            <input type="text" name="bottomText" placeholder="Walk into Mordor" onChange={props.onChange}/>
                    </label>
                </div>
                    <div className="form-down">
                        <button onClick={props.onClick} className="submit-btn" type="submit">Get a new Meme Image</button>
                    </div>
            </div>
        </>
    )
}