import { useEffect, useState } from "react";
import RecipeName from "@/components/flow/RecipeName";
import ChooseIngredients from "@/components/flow/ChooseIngredients";
import Minisearch from 'minisearch'
import Amount from "@/components/flow/Amount";

async function getIngredients() {
  const response = await fetch('/api/getIngredients')
  const json = await response.json();
  return json.rows;
}

export default function CreateRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [step, setStep] = useState(1);

  // list of all ingredients directly fetched from DB (should not change)
  const [ingredients, setIngredients] = useState([])
  // list of ingredients displayed (will be updated with search, adding/removing of ingredients etc)
  const [ingredientsResult, setIngredientsResult] = useState(ingredients)
  // filtered vertion of ingredientsResult
  const [filteredIngredients, setFilteredIngredients] = useState([])
  // list of your chosen ingredients/ingredients you have access to
  const [chosenIngredients, setChosenIngredients] = useState([])

  // Fetching list of ingredients from database
  // calls function "getIngredients()" listed at line 9
  const fetchIngredients = async () => {
    let fetched = await getIngredients();
    console.log(fetched)
    fetched = fetched.map(ingredient => ingredient.ingrediensNavn)
    setIngredients(fetched)
  }

  useEffect(() => {
    fetchIngredients()
  }, []);

  useEffect(() => {
    setIngredientsResult(ingredients)
  }, [ingredients])

  useEffect(() => {
    const filteredIngredientResult = ingredients.filter(item => !chosenIngredients.includes(item))
    setFilteredIngredients(filteredIngredientResult)
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

  const settingNameOfRecipe = (rettNavn) => {
    if (rettNavn !== '') {
      setRecipeName(rettNavn);
    }
  }

  const getAmounts = () => {
    chosenIngredients.map(ingrediens => {
      document.getElementById(ingrediens+"messurment").value
    })
  }

  const nextStep = () => {
    setStep(step + 1);
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  if (step === 1) {
    return (
      <div className="h-screen pt-20 pb-10 w-screen flex items-center justify-center">
        <div className="w-1/2 h-full rounded-3xl bg-light-background">
          <RecipeName setRecipeName={settingNameOfRecipe} onNextStep={nextStep} recipeName={recipeName} />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="h-screen pt-20 pb-10 w-screen flex items-center justify-center">
        <div className="w-1/2 h-full rounded-3xl bg-light-background">
          <ChooseIngredients onNextStep={nextStep} serachIngredient={serachIngredient} ingredientsResult={ingredientsResult} addIngredient={addIngredient} onPrevStep={prevStep} removeAllChosen={removeAllChosen} chosenIngredients={chosenIngredients} removeChosen={removeChosen}  />
        </div>
      </div>
    );
  }

  if(step === 3) {
    return(
        <div className="h-screen pt-20 pb-10 w-screen flex items-center justify-center">
        <div className="w-1/2 h-full rounded-3xl bg-light-background">
          <Amount chosenIngredients={chosenIngredients} onNextStep={nextStep} onPrevStep={prevStep} />
        </div>
      </div>
    )
  }
}
