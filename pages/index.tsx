import next from "next/types";
import React, { useState, useEffect } from 'react';
import Minisearch from 'minisearch'
import SearchComponent from "@/components/SearchComponent";
import Ingredient from "@/components/Ingredient";
import ChosenIngredient from "@/components/ChosenIngredient";
import Result from "@/components/Result";

async function getIngredients() {
  const response = await fetch('/api/getIngredients')
  const json = await response.json();
  return json.rows;
}

async function getRecipes() {
  const response = await fetch('/api/getRecipes')
  const json = await response.json();
  return json.rows;
}

export default function Home() {

  
  const [recipeResults, setRecipeResults] = useState([])
  // list of all ingredients directly fetched from DB (should not change)
  const [ingredients, setIngredients] = useState([])
  // list of ingredients displayed (will be updated with search, adding/removing of ingredients etc)
  const [ingredientsResult, setIngredientsResult] = useState(ingredients)
  // filtered vertion of ingredientsResult
  const [filteredIngredients, setFilteredIngredients] = useState([])
  // list of your chosen ingredients/ingredients you have access to
  const [chosenIngredients, setChosenIngredients] = useState([])


  // TEMP!!
  const [recipes, setRecipes] = useState([{rettNavn: 'Spaghetti med kjøttsaus', ingredienser: ['spaghetti', 'tomatsaus', 'kjøttdeig'], beskrivelse: 'for å lage dette må du ....', tid: 15, bilde: 'https://www.dagbladet.no/images/70860042.jpg?imageId=70860042&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630'}, {rettNavn: 'Eple', ingredienser: ['eple'], beskrivelse: 'bro... det er legit ett eple. bare spis kompis :)', tid: 0, bilde: 'https://www.shutterstock.com/image-photo/red-apple-isolated-on-white-600w-1727544364.jpg'}]);
  
  
  // Fetching list of ingredients from database
  // calls function "getIngredients()" listed at line 9
  const fetchIngredients = async () => {
    let fetched = await getIngredients();
    fetched = fetched.map(ingredient => ingredient.ingrediensNavn)
    fetched.sort();
    setIngredients(fetched)
  }

  const fetchRecipes = async () => {
    let fetched = await getRecipes();
  }

  useEffect(() => {
    fetchRecipes()
    fetchIngredients()
  }, []);

  useEffect(() => {
    setIngredientsResult(ingredients)
  }, [ingredients])

  useEffect(() => {
    const filteredIngredientResult = ingredients.filter(item => !chosenIngredients.includes(item))
    setFilteredIngredients(filteredIngredientResult)
    setRecipeResults([])
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

  const searchRecipe = () => {
    recipes.map(recipe => {
      if(recipe.ingredienser.every(item => chosenIngredients.includes(item)) && !recipeResults.includes(recipe)){
        setRecipeResults(prevArray => [...prevArray, recipe])
      }
    })
  }

  return (
    <div className=" flex flex-row">
      {/* Search and select part of site (left) */}
      <div className=" h-screen flex flex-col w-2/6 bg-light-background px-4 space-y-4 py-8 fixed -z-10 top-0 pt-12 overflow-y-auto scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full border-r-2 border-highlight">
        <div className=" flex flex-col flex-1 h-1/2 mt-4 bg-medium-bacground p-4 rounded-xl">
        <p>Velg ingredienser du har her</p>
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
        <div className="flex flex-1 flex-col h-1/2 bg-medium-bacground p-4 rounded-xl">
          <div className=" flex flex-row justify-between items-center">
            <p>Dine ingredienser</p>
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
        <button className=" py-2 rounded-xl w-full" onClick={searchRecipe}>Søk</button>
      </div>
      {/* Resluts part of site (right) */}
      <div className=" w-4/6 p-4 absolute right-0 top-10 items-center justify-center flex flex-col-reverse">
      {recipeResults.map(oppskrift => {
        return (
          <Result key={oppskrift} oppskrift={oppskrift} />
        )
      })}
      {/* <p>søkeresultater vil dukke opp her</p> */}
      </div>
    </div>
  )
}
