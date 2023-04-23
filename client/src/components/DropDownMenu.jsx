import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

function DropdownMenu({ selectedItem, setSelectedItem }) {
    const { getProductsByManufacturer } = useContext(TransactionContext);
    const [products, setProducts] = useState()
    const handleSelect = (event) => {
        setSelectedItem(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            let data = await getProductsByManufacturer();
            console.log(data);
            setProducts(data);
        }
        fetchData();
    },[])

    return (
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedItem} onChange={handleSelect}>
            <option value="">-- Select an item --</option>
            {products && products.map((product) => (
                <option key={product.pID} value={product.pID}>
                    {product.name}
                </option>
            ))}
        </select>
    );
}

export default DropdownMenu;