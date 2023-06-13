import Ingredient from "@/components/Ingredient";
import { useEffect, useState } from "react";
import axios from 'axios';

  async function getIngredients() {
    const response = await fetch('/api/getIngredients')
    const json = await response.json();
    return json.rows;
}


export default function InsertIngredient() {

    let itemsArray;

    async function insertData() {
        try {
          const response = await axios.post('/api/insertIngredient', { data: itemsArray });
          console.log(response.data); // Success message from the API
        } catch (error) {
          console.error(error);
        }
        fetchIngredients();
        (document.getElementById('ingredientName') as HTMLInputElement).value = ""
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ingrediens, setIngredients] = useState([])

    const fetchIngredients = async () => {
        let fetched = await getIngredients();
        fetched = fetched.map(ingredient => ingredient.ingrediensNavn)
        fetched.sort();
        setIngredients(fetched)
    }

    const insertIngredient = () => {
        const inputField = (document.getElementById('ingredientName') as HTMLInputElement).value
        itemsArray = inputField.split(", ");
        if(itemsArray.length !== 0){
            insertData()
        }
        
    }

    useEffect(() => {

    }, [])
    
    useEffect(() => {
        fetchIngredients()
    }, [])

    return(
        <div className=" h-screen w-full flex items-center justify-center bg-light-background flex-col space-y-4">
            <input type="text" className=" w-1/3 rounded-lg p-2 border-2 border-action" id="ingredientName" placeholder="ingrediens navn" />
            <button className=" rounded-lg p-4 w-1/3" onClick={insertIngredient} >Legg til ingrediens i databasen</button>
            <div className=" flex flex-col h-1/3 w-1/3 mt-4 bg-medium-bacground p-4 rounded-xl">
                {/* Felt med anbefalte ingredienser */}
                <div className="h-full my-4 rounded-xl p-2 bg-white flex flex-wrap content-start overflow-y-auto scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    {
                    ingrediens.map(ingredient => {
                        return (
                        <p className=" px-4 py-2 bg-highlight rounded-2xl m-1" key={ingredient}>{ingredient}</p>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
} 