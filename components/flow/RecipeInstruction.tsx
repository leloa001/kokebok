import { useEffect, useState } from "react";
import OverviewModal from "./OverviewModal";
import ChosenIngredient from "../ChosenIngredient";

export default function RecipeInstructions ( {onPrevStep, saveFremgangsmåte, onNextStep} ) {

    const [stepsInRecipe, setStepsInRecipe] = useState([1])
    

    const nextStep = () => {
        let counter = 0;
        const fremgangsmåte = []
        stepsInRecipe.map(step => {
            var numToSting = step.toString();
            const stepText = document.getElementById("step"+numToSting).value
            if(stepText !== ""){
                counter++
                fremgangsmåte.push({step: step, text: stepText})
            }
        })
        if(counter === stepsInRecipe.length){
            saveFremgangsmåte(fremgangsmåte)
            onNextStep()
        } else {
            document.getElementById('alert').innerHTML = 'Alle feltene må fylles ut før du kan gå videre'
        }
        
    }

    const addStep = () => {
        setStepsInRecipe(prev => [...prev, stepsInRecipe.length + 1])
    }

    const removeStep = () => {
        setStepsInRecipe(stepsInRecipe.filter(id => id !== stepsInRecipe.length))
    }

    return (
        <>
            <div className=" flex justify-between w-1/2 m-auto mt-4">
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">1</h1>
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">2</h1>
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">3</h1>
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold border-highlight border-4 rounded-full bg-medium-bacground">4</h1>
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">5</h1>
            </div>
            <h1 className=" w-fit mx-auto mt-10 font-semibold text-2xl">Skriv fremgangsmåten her:</h1>
            <div className="h-3/5 w-full p-4 overflow-auto flex flex-col items-center scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {stepsInRecipe.map(step => {
                var numToSting = step.toString();
                return(
                <>
                <p className=" w-3/4 px-4 py-2 font-medium">Steg {step}</p>
                <input type="text" className=" rounded-full w-3/4 p-2" id={"step"+numToSting} spellCheck="false" autoComplete="off" />
                </>
                )
            })}
            <div className=" mt-8 w-2/3 flex justify-center space-x-2">
            <h1 className=" text-3xl text-red-500 border-4 border-red-500 rounded-2xl text-center px-8 pb-2 font-semibold hover:cursor-pointer mt-2 hover:bg-red-500 hover:text-black transition-all" onClick={removeStep}>-</h1>
            <h1 className=" text-3xl text-action border-4 border-action rounded-2xl text-center px-8 pb-2 font-semibold hover:cursor-pointer mt-2 hover:bg-action hover:text-black transition-all" onClick={addStep}>+</h1>
            </div>
                
            </div>
            
            <div className=" relative w-full items-end flex justify-between px-12 mt-32">
                <button className=" px-4 py-2 rounded-full border-white text-white hover:bg-white border-2 font-semibold" onClick={onPrevStep}>Tilbake</button>
                <label htmlFor="nextBtn" className=" absolute bottom-14 text-red-500 right-14" id="alert"></label>
                <button className=" px-4 py-2 rounded-full border-2 font-semibold" onClick={nextStep}>Neste</button>
            </div>
        </>
    )
}