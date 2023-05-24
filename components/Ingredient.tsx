export default function Ingredient({ ingredientName, addIngredient }) {

    const onAddIngredient = () => {
        addIngredient(ingredientName)
    }

    return (
        <div className=" bg-highlight text-white rounded-2xl h-fit w-fit px-4 py-1 m-1 flex flex-row items-center space-x-2 font-medium hover:cursor-pointer" onClick={onAddIngredient}>
            <p>{ingredientName}</p>
        </div>
    )
}