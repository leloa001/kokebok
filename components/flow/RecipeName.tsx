import { useEffect, useState } from "react"

export default function RecipeName( {setRecipeName, onNextStep, recipeName} ) {
    const [rettNavn, setRettNavn] = useState("")

    useEffect(() => {
        document.getElementById("rettNavn").value = recipeName
        updateRecipeName()
    }, [])


    const updateRecipeName = () => {
        setRettNavn(document.getElementById("rettNavn").value)
        setRecipeName(rettNavn)
    }

    const btnClick = () => {
        updateRecipeName()
        nextStep()
    }

    const nextStep = () => {
        if(rettNavn != ""){
            onNextStep()
        }else {
            document.getElementById('alert').innerHTML = 'Alle feltene må fylles ut før du kan gå videre'
        }
    }


    return (
        <>
        <div className=" flex justify-between w-1/2 m-auto mt-4">
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold border-highlight border-4 rounded-full bg-medium-bacground">1</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">2</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">3</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">4</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">5</h1>
        </div>
        <h1 className=" w-fit mx-auto mt-10 font-semibold text-2xl">Hva heter retten?</h1>
        <div className=" w-5/6 m-auto mt-64">
            <p className=" ml-4">Skriv inn navnet på retten her:</p>
            <input type="text" className=" w-full py-2 px-4 rounded-full" id="rettNavn" onChange={updateRecipeName} spellCheck="false" autoComplete="off" />
        </div>
        <div className=" relative mt-80 w-full items-end flex justify-end px-12">
            <label htmlFor="nextBtn" className=" absolute bottom-14 text-red-500" id="alert"></label>
            <button className=" px-4 py-2 rounded-full border-2 font-semibold" onClick={btnClick} id="nextBtn">Neste</button>
        </div>
        </>
    )
}