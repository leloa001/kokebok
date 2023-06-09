import { AiOutlineClockCircle } from "react-icons/ai";
import axios from 'axios';
import { useState } from "react";
import { buffer } from "stream/consumers";

export default function OverviewModal ( {recipe, onPrevStep} ) {


    const capitalizeFirstLetter = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    const [imageUrl, setImageUrl] = useState(null);
    const [complete, setComplete] = useState(false)

    const recipeNameCapitaalized = capitalizeFirstLetter(recipe.recipeName)

  const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImageUrl(dataUrl);
    };
    reader.readAsDataURL(recipe.bilde);

  async function insertData() {
    const formData = new FormData();
    formData.append('image', recipe.bilde);

    let imageURL;

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      imageURL = await response.json()      
    } catch (error) {
      console.error('Error uploading image:', error);
    }


    const rettNavn = recipeNameCapitaalized
    const ingredienser = recipe.ingredients.map(ingrediens => ingrediens.ingredient).toString()
    const ingredienserMedMengde = recipe.ingredients.map(ingrediens => ingrediens.amount + "" + ingrediens.messurment + " " +  ingrediens.ingredient.toString()).toString()
    const tid = recipe.time
    const bilde = imageURL.imageURL
    const fremgangsmåte = recipe.instructions.map(step => step.text).toString()


    const oppskrift = {rettNavn: rettNavn, ingredienser: ingredienser, ingredienserMedMengde: ingredienserMedMengde, tid: tid, bilde: bilde, fremgangsmåte: fremgangsmåte}
    console.log(oppskrift)

    try {
      const response = await axios.post('/api/insertRecipe', { data: oppskrift });
      // console.log(response.data); // Success message from the API
    } catch (error) {
      console.error(error);
    }
    setComplete(true)
}

if(complete){
  return(
    <div className=" h-screen absolute w-screen flex items-center justify-center"><h1 className=" text-5xl">Gratulerer, Oppskriften er lagt til i databasen! :D</h1></div>
    
  )
}else {
  return (
    <div className=" pt-12 w-3/4 bg-light-background m-auto flex items-center flex-col h-fit scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full pb-20">
        <h1 className="mb-8 mt-12 text-5xl font-bold border-white border-b-2 w-2/3 text-center pb-8">{recipeNameCapitaalized}</h1>
        <img src={imageUrl} width="900" alt="bilde av matretten" id="image" className="mb-8 rounded-2xl" />

        <div className="w-2/3 h-fit flex items-center py-4 justify-around space-y-2 border-y-2 border-white">
          <div className=" flex items-center flex-col w-fit">  
        <p className=" text-xl font-semibold mb-4">Ingredienser i oppskriften:</p>
          <div className="flex flex-row">
              <div className=" flex space-x-3 justify-start flex-wrap">
              {
                recipe.ingredients.map(ingredient => {
                  return (
                    <h1 className=" h-fit mb-4 px-4 py-2 bg-highlight rounded-full font-semibold" key={ingredient}>{ingredient.ingredient}</h1>
                  )
                })
              }
              </div>
            </div>
          </div>
          <div className=" w-fit flex flex-col items-center h-full">
          <p className=" text-xl font-semibold mb-4">Estimert tid</p>
          <p className=" flex items-center px-4 py-2 bg-highlight rounded-full font-semibold">{recipe.time} min<AiOutlineClockCircle className=" ml-2" /></p>
          </div>
          </div>
        <h1 className=" text-xl font-semibold mt-4">Mengde av hver ingrediens:</h1>
        <ul className=" list-disc mt-4 w-2/3 flex flex-col items-center border-b-2 pb-4">
        {
          recipe.ingredients.map(ingredient => {
            return (
              <li className=" font-semibold m-1" key={ingredient}>{ingredient.amount}{ingredient.messurment} {ingredient.ingredient}</li>
            )
          })
        }
        </ul>
        <h1 className=" text-xl font-semibold mt-4 mb-4">Fremgangsmåte:</h1>
        <ul className=" list-decimal space-y-3 text-lg">
        {recipe.instructions.map(step => {
            return(
                <li key={step}>{step.text}</li>
            )
            
        })}
        </ul>
        <div className=" relative mt-10 flex justify-between w-1/3">
            <button className=" px-4 py-2 rounded-full font-semibold border-2 border-white text-white hover:bg-white" onClick={onPrevStep}>Rediger</button>
            <button className=" px-4 py-2 rounded-full font-semibold border-2" onClick={insertData}>Ferdig!</button>
        </div>
    </div>
)

}
    
}