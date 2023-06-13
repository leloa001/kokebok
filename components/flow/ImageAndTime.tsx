export default function ImageAndTime(   {goToOverview, onPrevStep, saveNewImage}    ) {

    const onFileInputChange = () => {
        saveNewImage()
    }

    const onGoToOverview = () => {
        const time = (document.getElementById("time") as HTMLInputElement).value;
        if((document.getElementById("image") as HTMLInputElement).files.length !== 1){
            document.getElementById('alert').innerHTML = 'Alle feltene må fylles ut før du kan gå videre'
        }else if(time === ""){
            document.getElementById('alert').innerHTML = 'Alle feltene må fylles ut før du kan gå videre'
        }else{
            goToOverview(time)
        }
    }
        

    return(
        <>
            <div className=" flex justify-between w-1/2 m-auto mt-4">
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">1</h1>
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">2</h1>
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">3</h1>
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">4</h1>
                <h1 className=" w-16 h-16 flex items-center justify-center font-bold border-highlight border-4 rounded-full bg-medium-bacground">5</h1>
            </div>
            <h1 className=" w-fit mx-auto mt-10 font-semibold text-2xl">Last opp ett bilde:</h1>
            <div className=" w-full flex justify-center mt-16">
            <input type="file" accept="image/*" id="image" className=" px-8 py-4 bg-standard-background rounded-3xl text-white" onChange={onFileInputChange} />
            </div>
            <h1 className=" w-fit mx-auto mt-20 font-semibold text-2xl">Hvor lang tid tar det?</h1>
            <div className=" flex w-full justify-center mt-8">
                <input type="number" className=" text-black rounded-lg font-semibold text-lg text-center" id="time" />
                <p className=" text-black px-4 py-2 bg-white rounded-lg font-semibold text-lg">min</p>
            </div>
            <div className=" relative w-full items-end flex justify-between px-12 mt-32">
                <button className=" px-4 py-2 rounded-full border-white text-white hover:bg-white border-2 font-semibold" onClick={onPrevStep}>Tilbake</button>
                <label htmlFor="nextBtn" className=" absolute bottom-14 text-red-500 right-14" id="alert"></label>
                <button className=" px-4 py-2 rounded-full border-2 font-semibold" onClick={onGoToOverview}>Se over</button>
            </div>
            </>
    )
}