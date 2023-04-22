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
        <select value={selectedItem} onChange={handleSelect}>
            <option value="">-- Select an item --</option>
            {products && products.map((product) => (
                <option key={product.pID} value={product.pID}>
                    <div>
                        <span>{product.name}</span>
                        <span>{product.description}</span>
                    </div>
                </option>
            ))}
        </select>
    );
}

export default DropdownMenu;