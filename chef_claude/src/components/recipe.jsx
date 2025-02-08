import ReactMarkdown from 'react-markdown'
import React from "react";

const Recipe = React.forwardRef((props, ref) => {
    return (
        <section className="container recipe-container" ref={ref}>
            <h1 className="recipe-heading">Chef Claude Recommends</h1>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    );
});

export default Recipe;
