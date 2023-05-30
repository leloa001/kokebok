import ChosenIngredient from "../ChosenIngredient"
import Ingredient from "../Ingredient"
import SearchComponent from "../SearchComponent"

export default function ChooseIngredients ( {onNextStep, onPrevStep, serachIngredient, ingredientsResult, addIngredient, removeAllChosen, chosenIngredients, removeChosen} ) {

  const nextStep = () => {
    if (chosenIngredients.length !== 0){
      onNextStep()
    }else {
      document.getElementById('alert').innerHTML = 'Alle feltene må fylles ut før du kan gå videre'
    }
  }


    
    return (
        <>
        <div className=" flex justify-between w-1/2 m-auto mt-4">
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground text-standard-background">1</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold border-highlight border-4 rounded-full bg-medium-bacground">2</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">3</h1>
            <h1 className=" w-16 h-16 flex items-center justify-center font-bold rounded-full bg-medium-bacground">4</h1>
        </div>
        <h1 className=" w-fit m-auto mt-10 font-semibold text-2xl">Hvilke ingredienser trengs?</h1>
        <div className=" flex flex-col h-80 p-6 rounded-xl">
          {/* Searchbar for searching ingredients */}
          <SearchComponent onSearch={serachIngredient} />
          {/* Felt med anbefalte ingredienser */}
          <div className="h-full my-4 rounded-xl p-2 bg-white flex flex-wrap content-start overflow-y-auto scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {
              ingredientsResult.map(ingredient => {
                return (
                  <Ingredient ingredientName={ingredient} key={ingredient} addIngredient={addIngredient} />
                )
              })
            }
          </div>
          </div>
          {/* felt for valgte ingredienser */}
          <div className="flex flex-col h-72 px-6 rounded-xl">
            <div className=" flex flex-row justify-between items-center">
              <p>Ingredienser i retten:</p>
              <button className="px-4 py-2 rounded-lg border-red-500 text-red-500 hover:bg-red-500 hover:text-black" onClick={removeAllChosen}>Fjern alle</button>
            </div>
          <div className=" h-full my-4 rounded-xl p-2 bg-white flex flex-wrap content-start overflow-y-auto scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {
              chosenIngredients.map(ingredient => {
                return (
                  <ChosenIngredient ingredientName={ingredient} key={ingredient} removeChosen={removeChosen} />
                )
              })
            }
          </div>
        </div>
        <div className=" relative w-full items-end flex justify-between py-8 px-12">
            <button className=" px-4 py-2 rounded-full border-white text-white hover:bg-white border-2 font-semibold" onClick={onPrevStep}>Tilbake</button>
            <label htmlFor="nextBtn" className=" absolute pb-2 right-12 bottom-20 text-red-500" id="alert"></label>
            <button className=" px-4 py-2 rounded-full border-2 font-semibold" onClick={nextStep} id="nextBtn">Neste</button>
        </div>
        </>
    )
}