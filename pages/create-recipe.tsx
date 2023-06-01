import { useEffect, useState } from "react";
import RecipeName from "@/components/flow/RecipeName";
import ChooseIngredients from "@/components/flow/ChooseIngredients";
import Minisearch from 'minisearch'
import Amount from "@/components/flow/Amount";
import RecipeInstructions from "@/components/flow/RecipeInstruction";
import OverviewModal from "@/components/flow/OverviewModal";
import ImageAndTime from "@/components/flow/ImageAndTime";

async function getIngredients() {
  const response = await fetch('/api/getIngredients')
  const json = await response.json();
  return json.rows;
}

export default function CreateRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredientsAndAmounts, setIngredientsAndAmounts] = useState();
  const [fremgangsmåte, setFremgangsmåte] = useState();
  const [image, setImage] = useState()

  const [completeRecipe, setCompleteRecipe] = useState()
  
  
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
    fetched = fetched.map(ingredient => ingredient.ingrediensNavn)
    fetched.sort();
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
    const arrayOfIngredients = []
    chosenIngredients.map(ingrediens => {
      const amountAndIngredient = {ingredient: ingrediens, messurment: document.getElementById(ingrediens+"messurment").value, amount: document.getElementById(ingrediens+"amount").value}
      arrayOfIngredients.push(amountAndIngredient)
    })
    setIngredientsAndAmounts(arrayOfIngredients)
  }

  const nextStep = () => {
    setStep(step + 1);
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const goToOverview = (time) => {
    const recipe = {recipeName: recipeName, ingredients: ingredientsAndAmounts, time: time, instructions: fremgangsmåte, imageBase64: image}
    setCompleteRecipe(recipe)
    setStep(step + 1)
  }

  const saveImage = () => {
    const fileInput = document.getElementById('image')
    const file = fileInput.files[0];


    const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;
    // Send the base64String to your backend or store it in your database
    setImage(base64String)
  };

  reader.readAsDataURL(file);
  }

  const saveFremgangsmåte = (fremgangsmåte) => {
    setFremgangsmåte(fremgangsmåte);
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
          <Amount chosenIngredients={chosenIngredients} onNextStep={nextStep} onPrevStep={prevStep} getAmounts={getAmounts} ingredientsAndAmounts={ingredientsAndAmounts} />
        </div>
      </div>
    )
  }
  if(step === 4){
    return (
      <div className="h-screen pt-20 pb-10 w-screen flex items-center justify-center">
        <div className="w-1/2 h-full rounded-3xl bg-light-background">
          <RecipeInstructions onPrevStep={prevStep} saveFremgangsmåte={saveFremgangsmåte} onNextStep={nextStep} />
        </div>
      </div>
    )
  }

  if(step === 5){
    return(
      <div className="h-screen pt-20 pb-10 w-screen flex items-center justify-center">
        <div className="w-1/2 h-full rounded-3xl bg-light-background">
          <ImageAndTime goToOverview={goToOverview} onPrevStep={prevStep} saveNewImage={saveImage} />
        </div>
      </div>
    )
  }

  if(step === 6){
    return(
      <OverviewModal recipe={completeRecipe} onPrevStep={prevStep} />
    )
  }
}
