export default function Ingredient(props)
{
    return(
        <>
                <div className="ingredient">
                    <p>{props.name}</p>
                    <svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#D1D5D8"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </div>
        </>
    )
}