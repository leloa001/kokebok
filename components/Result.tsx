import { AiOutlineClockCircle } from "react-icons/ai";

export default function Result({oppskrift}) {
    if(oppskrift.bilde == ''){
        oppskrift.bilde = '../images/noImage.png'
    }
    console.log(oppskrift)
    return (
        <div className=" bg-medium-bacground h-72 w-full rounded-lg p-4 my-2 pl-8 flex">
            <div className=" flex flex-col w-3/4 bg-medium-bacground justify-evenly">
                <h1 className=" text-4xl font-medium">{oppskrift.rettNavn}</h1>
                <div className=" flex flex-row items-center space-x-2 text-xl">
                <AiOutlineClockCircle />
                <p>{oppskrift.tid} min</p>
                </div>
                <div className=" flex-wrap flex flex-row space-x-2">
                    {oppskrift.ingredienser.map(ingrediens => {
                        return (<p key={ingrediens} className=" bg-white text-black w-fit px-6 py-1 rounded-2xl">{ingrediens}</p>)
                    })}
                </div>
            </div>
            <div className={`bg-slate-200 w-fit rounded-lg items-end justify-center flex flex-col overflow-hidden`}>
                <img src={"/uploads/" + oppskrift.bilde} alt="bilde av matretten" className="rounded-lg" />
            </div>
        </div>
    )
}