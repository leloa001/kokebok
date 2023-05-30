import { useEffect } from "react"
import Ingredient from "../Ingredient"

export default function Amount ( {chosenIngredients, onNextStep, onPrevStep} ) {
    

    useEffect(() => {
        console.log(chosenIngredients)
    }, [])
    

    return (
        <>
        <div className=" flex justify-between w-1/2 m-auto mt-4">
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">1</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">2</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold border-highlight border-4 rounded-full bg-medium-bacground">3</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">4</h1>
        </div>
        <h1 className=" w-fit mx-auto mt-10 font-semibold text-2xl">Hvor mye er det av hver ingrediens?</h1>
        <div className=" h-4/6 mt-8">
            {
                chosenIngredients.map(ingredient => {
                    return(
                        <div className=" flex w-full items-center h-fit justify-center my-4">
                            <input type="number" id={ingredient+"amount"} className=" rounded-xl text-black text-center py-1 font-semibold" />
                            <select name="messurment" id={ingredient+"messurment"} className=" rounded-lg text-black text-center py-1 font-semibold">
                              <option value="ts">ts</option>
                              <option value="ss">ss</option>
                              <option value="ml">ml</option>
                              <option value="dl">dl</option>
                              <option value="l">l</option>
                              <option value="g">g</option>
                              <option value="hg">hg</option>
                              <option value="kg">kg</option>
                              <option value="stk">stk</option>
                              <option value="klype">klype</option>
                              <option value="knivspiss">knivspiss</option>
                            </select>
                            <h1 className=" ml-4 w-40 h-fit text-center py-1 rounded-xl bg-white text-black font-semibold">{ingredient}</h1>
                        </div>
                    )
                }
                )
            }
            
        </div>
        <div className=" relative w-full items-end flex justify-between px-12 mt-9">
            <button className=" px-4 py-2 rounded-full border-white text-white hover:bg-white border-2 font-semibold" onClick={onPrevStep}>Tilbake</button>
            <button className=" px-4 py-2 rounded-full border-2 font-semibold" onClick={onNextStep}>Neste</button>
        </div>
        </>
    )
}