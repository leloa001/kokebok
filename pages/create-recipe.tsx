import { useEffect, useState } from "react"
import Ingredient from "@/components/Ingredient"
import SearchComponent from "@/components/SearchComponent"
import Minisearch from 'Minisearch'
import ChosenIngredient from "@/components/ChosenIngredient"

async function getIngredients() {
  const response = await fetch('/api/getIngredients')
  const json = await response.json();
  return json.rows;
}

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState([])
  const [chosenIngredients, setChosenIngredients] = useState([])
  const [filteredIngredients, setFilteredIngredients] = useState([])
  const [searchResults, setSearchResults] = useState(ingredients)
  const [allIsFilled, setAllIsFilled] = useState(false)
  const [ingredientsResult, setIngredientsResult] = useState(ingredients)
  
  const fetchIngredients = async () => {
    let fetched = await getIngredients();
    console.log(fetched)
    fetched = fetched.map(ingredient => ingredient.ingrediensNavn)
    setIngredients(fetched)
  }

  useEffect(() => {
    fetchIngredients()
  }, [])

  useEffect(() => {
    setIngredientsResult(ingredients)
  }, [ingredients])
  
  let rettNavn = '';
  let fremgangsmåte = '';

  useEffect(() => {
    const filteredIngredientResult = ingredients.filter(item => !chosenIngredients.includes(item))
    setFilteredIngredients(filteredIngredientResult)
    updateRecipe()
  }, [ingredientsResult, chosenIngredients])
  
  let miniSearch = new Minisearch({
    fields: ['name'], // fields to index for full-text search
    storeFields: ['name'], // fields to return with search recipeResults
    searchOptions: {
      prefix: true,
      fuzzy: 0.3
    }
  })
  
  // creating a array that is compatible with minisearch
  const searchableArray = filteredIngredients.map((ingredient, index) => {
    return {id: index, name: ingredient}
  })
  
  // Index all items in searchableArray
  miniSearch.addAll(searchableArray)

  // for searching in the ingredients area
  // function is called when inputfield is updated
  const serachIngredient = () => {
    const searchInput = document.getElementById('SearchIngredient')
    // searchresult with lots of data we dont need
    const search = miniSearch.search(searchInput.value)
    // removing all the unneccesary data from the search
    const searchResult = search.map(searchResult => searchResult.name)
    setIngredientsResult(searchResult)
    if(searchInput.value == ''){
      setIngredientsResult(filteredIngredients)
    }
  }

  const addIngredient = (ingredientName) => {
    if(!chosenIngredients.includes(ingredientName)){
      setChosenIngredients([...chosenIngredients, ingredientName])
    }
    // Removes the ingredient we just added from list of addable ingredients
    setIngredientsResult(ingredientsResult.filter(ingerdient => ingerdient !== ingredientName))
  }

  const removeChosen = (ingredientName) => {
    setChosenIngredients(chosenIngredients.filter(item => item !== ingredientName))
    if(!ingredientsResult.includes(ingredientName)){
      setIngredientsResult([...ingredientsResult, ingredientName])
    }
  }

  const removeAllChosen = () => {
    // Seting shown ingredients to the original list off ingredients
    // since the original list is not changed this will be correct if we have no added ingredients
    setIngredientsResult(ingredients)
    setChosenIngredients([])
  }
  

  const updateRecipe = () => {
    // bypass for only rendering parts of the code client side
    // used when document returns as undefined when we want to get ellement by document.***
    if (typeof document !== 'undefined') {
      let element = document.querySelector('.class-name')
      // Manipulating the DOM here
      rettNavn = document.getElementById('rettNavn').value
      fremgangsmåte = document.getElementById('fremgangsmåte').value
    }
    if(rettNavn !== '' && fremgangsmåte !== '' && chosenIngredients.length > 0){
      setAllIsFilled(true)
    } else {
      setAllIsFilled(false)
    }
  }

  
  return (
        <div className=" bg-light-background space-x-2 absolute top-0 -z-10 pt-12 w-full h-full flex flex-row">
          {/* left side */}
          <div className="w-2/3 p-4 h-full space-y-4">
            <div className="w-full bg-medium-bacground h-fit p-3 rounded-2xl space-y-1">
              <p>Navn på rett</p>
              <input type="text" id="rettNavn" className="w-full rounded-md h-8 px-2" onChange={updateRecipe} />
            </div> 
            <div className="w-full bg-medium-bacground h-fit p-3 rounded-2xl space-y-1">
              <p>Fremgangsmåte</p>
              <textarea spellCheck='false' id="fremgangsmåte" className=" rounded-md w-full h-72 resize-none overflow-auto p-2" onChange={updateRecipe}></textarea>
            </div> 
            <input type="file" />
          </div>
          {/* right side */}
          <div className="w-1/3 h-full space-y-4 p-4 pb-8 bg-standard-background flex flex-col items-center">
            <h1 className=" text-xl">Legg til ingredienser man trenger her</h1>
          <div className=" flex flex-col flex-1 w-full h-1/2 bg-medium-bacground p-4 rounded-xl">
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
        <div className="flex flex-1 flex-col h-1/2 bg-medium-bacground p-4 rounded-xl w-full">
          <div className=" flex flex-row justify-between items-center">
            <p>Nødvendlige ingredienser</p>
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
        {allIsFilled ? (
          <button className="px-4 py-2 rounded-lg w-full">Opprett oppskrift</button>
        ) : <button className="px-4 py-2 rounded-lg w-full" disabled>Opprett oppskrift</button>}
      </div>
          </div>
    )
  }