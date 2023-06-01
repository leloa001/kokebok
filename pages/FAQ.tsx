import FaqComponent from "@/components/FaqComponent"

export default function FAQ () {
    const faq = [{header: 'Hva er formålet med nettsiden?', content: 'Lurer du ofte på hva du skal ha til middag, eller kanskje du pleier å sitte igjen med mye rester du ikke får brukt? Da er denne siden for deg! Mitt ønske med denne "appen" er å gjøre det enklere å planlegge middager, minske enkeltpersoners matsvinn og lage ett dedikert sted hvor man kan lagre og utforske oppskrifter'}, {header: "header", content: "dette er innhold"}]

return(
    <div className=" h-full w-full mt-12 p-4 justify-evenly items-center flex flex-wrap space-x-4 space-y-4" >
    {faq.map(item => {
        return(<FaqComponent faqHeader={item.header} faqContent={item.content} />)
    })}
    </div>
)
    
}