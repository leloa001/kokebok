export default function FaqComponent ({faqHeader, faqContent}) {
    return(
        <div className=" w-2/5 space-y-4 bg-light-background rounded-lg p-6 border-highlight border-2 items-center flex-col flex justify-evenly text-center">
            <h1 className=" text-xl">{faqHeader}</h1>
            <p>{faqContent}</p>
        </div>
    )
}