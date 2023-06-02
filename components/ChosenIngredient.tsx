import { RxCross2 } from "react-icons/rx";

export default function ChosenIngredient ( {ingredientName, removeChosen} ) {
    
    const onRemoveChosen = (e) => {
        console.log(e)
        removeChosen(ingredientName)
    }

    return (
        <div className=" bg-highlight rounded-2xl h-fit w-fit px-4 py-1 m-1 flex flex-row items-center space-x-2 font-medium hover:cursor-pointer text-white">
            <p>{ingredientName}</p>
            <RxCross2 className=" hover:text-light-red transition-all text-lg" onClick={onRemoveChosen} />
        </div>
    )
}