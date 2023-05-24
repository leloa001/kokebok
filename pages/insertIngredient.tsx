import Ingredient from "@/components/Ingredient";
import { useState } from "react";


async function getIngredients() {
    const response = await fetch('/api/getIngredients')
    const json = await response.json();
    return json.rows;
  }

export default function insertIngredient() {

    const [ingrediens, setIngredients] = useState([])

    const fetchIngredients = async () => {
        let fetched = await getIngredients();
        fetched = fetched.map(ingredient => ingredient.ingrediensNavn)
        console.log(fetched)
        setIngredients(fetched)
      }
    
    useState(() => {
        fetchIngredients()
    }, [])

    return(
        <div className=" h-screen w-full flex items-center justify-center bg-light-background flex-col space-y-4">
            <input type="text" className=" w-1/3 rounded-lg p-2 border-2 border-action" placeholder="ingrediens navn" />
            <button className=" rounded-lg p-4">Legg til ingrediens i databasen</button>
            <div className=" flex flex-col h-1/3 w-2/3 mt-4 bg-medium-bacground p-4 rounded-xl">
                {/* Felt med anbefalte ingredienser */}
                <div className="h-full my-4 rounded-xl p-2 bg-white flex flex-wrap content-start overflow-y-auto scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    {
                    ingrediens.map(ingredient => {
                        return (
                        <p className=" px-4 py-2 bg-highlight rounded-2xl m-1">{ingredient}</p>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
} 