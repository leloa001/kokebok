export default function SearchComponent({ onSearch }) {

    function search() {
        onSearch()
    }

    return (
        <>
            <input type="text" id="SearchIngredient" placeholder="Søk..." className=" rounded-xl w-full p-2 mt-4" autoComplete="off" onChange={search} />
        </>
    )
}