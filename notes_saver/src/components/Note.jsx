import { useState, useEffect } from "react";

export default function Note(props) {
    const [title, setTitle] = useState(props.note?.Title || "")
    const [content, setContent] = useState(props.note?.Note_Content || "")

    useEffect(() => {
        setTitle(props.note?.Title || "");
        setContent(props.note?.Note_Content || "");
    }, [props.note])

    const handleSave = () => {
        props.save({ id: props.note.id || "", Title: title, Note_Content: content })
    }

    console.log(props.note)

    return (
        <div className="note">
            <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="note-title" 
                type="text" 
                placeholder="Insert Title"
            />
            <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                className="note-area" 
                placeholder="Add Notes"
            />
            <div className="button-container">
                <button onClick={handleSave} className="save-btn" type="button">Save</button>
            </div>
        </div>
    );
}
