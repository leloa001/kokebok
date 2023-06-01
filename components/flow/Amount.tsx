import { useEffect } from "react"
import Ingredient from "../Ingredient"

export default function Amount ( {chosenIngredients, onNextStep, onPrevStep, getAmounts, ingredientsAndAmounts} ) {

    const nextStep = () => {
        let counter = 0; 
        chosenIngredients.map(ingrediens => {
            const messurment = document.getElementById(ingrediens+"messurment").value;
            const amount = document.getElementById(ingrediens+"amount").value;
            if(messurment === '---' ){
                document.getElementById('alert').innerHTML = 'Alle feltene må fylles ut før du kan gå videre'
            } else if (amount === ""){
                document.getElementById('alert').innerHTML = 'Alle feltene må fylles ut før du kan gå videre'
            } else {
                counter++
            }
        })
        if(counter === chosenIngredients.length){
            getAmounts()
            onNextStep()
        }
        
    }
    

    return (
        <>
        <div className=" flex justify-between w-1/2 m-auto mt-4">
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">1</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">2</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold border-highlight border-4 rounded-full bg-medium-bacground">3</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">4</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">5</h1>
        </div>
        <h1 className=" w-fit mx-auto mt-10 font-semibold text-2xl">Hvor mye er det av hver ingrediens?</h1>
        <div className=" h-4/6 mt-8">
            {
                chosenIngredients.map(ingredient => {
                    return(
                        <div className=" flex w-full items-center h-fit justify-center my-4" key={ingredient}>
                            <input type="number" id={ingredient+"amount"} className=" rounded-xl text-black text-center py-1 font-semibold" />
                            <select name="messurment" id={ingredient+"messurment"} className=" rounded-lg text-black text-center py-1 font-semibold">
                            <option disabled selected defaultValue>---</option>
                              <option value="ts">ts</option>
                              <option value="ss">ss</option>
                              <option value="ml">ml</option>
                              <option value="dl">dl</option>
                              <option value="l">l</option>
                              <option value="g">g</option>
                              <option value="hg">hg</option>
                              <option value="kg">kg</option>
                              <option value="stk">stk</option>
                              <option value="bokser">bokser</option>
                              <option value="pakker">pakker</option>
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
            <label htmlFor="nextBtn" className=" absolute bottom-14 text-red-500 right-14" id="alert"></label>
            <button className=" px-4 py-2 rounded-full border-2 font-semibold" id="nextBtn" onClick={nextStep}>Neste</button>
        </div>

        <div className=" absolute right-10 top-20 rounded-xl bg-white h-fit w-1/5 flex items-center justify-center py-10 flex-col text-black px-6 text-center space-y-8">
            <h1 className=" text-black text-xl font-semibold">Er noe uklart?</h1>
            <p className=" border-t border-black pt-6">I det første feltet (feltet helt til venstere) skal du definere mengden av ingrediensen med ett tall</p>
            <p className=" border-b border-black pb-6">Skal du for eksempel ha 1/2 pakke spaghetti skriver du 0.5</p>
            <p>I nedtrekksmenyen (feltet i midten) skal du velge hvilken måleenhet som brukes til å måle ingrediensen</p>
            <p>Om du ikke finner den ønskede måleenheten send gjerne inn melding om dette på FAQ siden</p>
        </div>
        </>
    )
}