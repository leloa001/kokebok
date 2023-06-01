export default function OverviewModal ( {recipe, onPrevStep} ) {


    const capitalizeFirstLetter = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

    const recipeNameCapitaalized = capitalizeFirstLetter(recipe.recipeName)

    console.log(recipe.imageBase64)

    const img = new Image();
    img.src = recipe.imageBase64;

    img.onload = function() {
      // Image has loaded
      document.body.appendChild(img); // Append the image element to the DOM
    };

    img.onerror = function() {
      // Error occurred while loading the image
      console.error('Failed to load image.');
    };



    return (
        <div className=" pt-12 h-screen w-3/4 bg-light-background m-auto flex items-center flex-col overflow-auto scrollbar scrollbar-thumb-action scrollbar-thumb-rounded-full scrollbar-track-rounded-full pb-20">
            <h1 className="mb-72 mt-12 text-3xl font-bold">{recipeNameCapitaalized}</h1>
            <div className="w-2/3 h-32 flex items-center py-4 space-y-2 flex-col border-y-2 border-white">
            <p className=" text-xl font-semibold">Ingredienser i oppskriften:</p>
            <div className=" flex space-x-3 justify-start ">
            {
              recipe.ingredients.map(ingredient => {
                return (
                  <h1 className=" h-fit w-fit px-4 py-2 bg-highlight rounded-full font-semibold">{ingredient.ingredient}</h1>
                )
              })
            }
            </div>
            </div>
            <h1 className=" text-xl font-semibold mt-4">Mengde av hver ingrediens:</h1>
            <ul className=" list-disc mt-4 w-2/3 flex flex-col items-center border-b-2 pb-4">
            {
              recipe.ingredients.map(ingredient => {
                return (
                  <li className=" font-semibold m-1">{ingredient.amount}{ingredient.messurment} {ingredient.ingredient}</li>
                )
              })
            }
            </ul>
            <h1 className=" text-xl font-semibold mt-4 mb-4">Fremgangsmåte:</h1>
            <ul className=" list-decimal space-y-3 text-lg">
            {recipe.instructions.map(step => {
                return(
                    <li>{step.text}</li>
                )
                
            })}
            </ul>
            <div className=" relative mt-10 flex justify-between w-1/3">
                <button className=" px-4 py-2 rounded-full font-semibold border-2 border-white text-white hover:bg-white" onClick={onPrevStep}>Rediger</button>
                <button className=" px-4 py-2 rounded-full font-semibold border-2">Ferdig!</button>
            </div>
        </div>
    )
}