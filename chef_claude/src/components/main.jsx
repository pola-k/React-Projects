import Form from "./form.jsx"
import { useState, useRef, useEffect } from "react";
import Ingredient from "./ingredients.jsx";
import Action from "./action.jsx"
import Recipe from "./recipe.jsx"
import { HfInference } from '@huggingface/inference'


export default function Main() 
{
    const [ingredients, setIngredients] = useState([]);
    const ingredientsListItems = ingredients.map((ingredient, index) => <Ingredient key={index} name={ingredient} onClick={() => removeIngredient(ingredient)}/>);
    const API_KEY = ""
    const [recipe, setRecipe] = useState("")
    const [loading, setLoading] = useState(false);
    const recipeRef = useRef(null);

    const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`
    const hf = new HfInference(API_KEY)

    async function getRecipe(ingredientsArr) 
    {
        const ingredientsString = ingredientsArr.join(", ")
        try 
        {
                const response = await hf.chatCompletion({
                model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
                max_tokens: 1024,
        })
            return response.choices[0].message.content
        } 
        catch (err) 
        {
            console.error(err.message)
        }
    }

    function removeIngredient(ingredientToRemove)
    {
        setIngredients((prevIngredients) =>
            prevIngredients.filter(ingredient => ingredient !== ingredientToRemove)
        );
        setRecipe("")
    }

    function addIngredient(event)
    {
        event.preventDefault()
        const form = event.target;
        const formData = new FormData(form);
        let newIngredient = formData.get("ingredient").trim()
        if(newIngredient)
        {
            newIngredient = newIngredient.charAt(0).toUpperCase() + newIngredient.slice(1).toLowerCase()
            if(!ingredients.includes(newIngredient))
            {
                setIngredients(function(prevIngredients)
                {
                    return [...prevIngredients, newIngredient]
                })
                setRecipe("")
            }
            else
            {
               displayNotification()    
            }
        }
        form.reset()
    }

    function displayNotification() 
    {
        const root = document.getElementById("root")
    
        if (document.querySelector(".notification"))
            return
    
        const notification = document.createElement("div")
        notification.className = "notification"
        notification.textContent = "Ingredient Already Added"
        root.prepend(notification)

        setTimeout(() => 
        {
            notification.classList.add("show");
        }, 10)
    
        setTimeout(() => 
        {
            notification.classList.remove("show");
            setTimeout(() => 
            {
                notification.remove();
            }, 500);
        }, 2000);
    }
    
    async function displayRecipe()
    {
        setLoading(true)
        const recipe_generated = await getRecipe(ingredients)
        setRecipe(recipe_generated)
        setLoading(false)
        scrollToRecipe()
    }
    
    useEffect(()=>
        {
            if(recipe !== "" && recipeRef.current != null)
            {
                recipeRef.current.scrollIntoView({behavior: "smooth"})
            }
     },[recipe])

    return(
        <>
            <main>
            {loading ? <>
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                       </> :
                <>
                     <Form
                        onSubmit={addIngredient}/>
                    {ingredients.length > 0 &&  
                    <>
                        <div className="container">
                        <h1 className="ingredients-heading">Ingredients</h1> 
                        {ingredientsListItems}
                        {ingredients.length >= 3 && <Action onclick={displayRecipe}/>}
                        </div>
                        {recipe != "" && <Recipe recipe={recipe} ref={recipeRef} />}
                    </>}
                </>
            }
            </main>
        </>
    )
}
