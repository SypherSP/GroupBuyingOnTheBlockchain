import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={(e) => handleChange(e, "product")}
    />
)

function AddProduct(props) {
    const { addProduct, product, handleChange } = useContext(TransactionContext);

    const handleSubmit = async (e) => {
        const { name, description } = product;
        e.preventDefault();
        props.property('')
        console.log('add product', name, description);
        if (!name || !description) return;
        await addProduct();
    }
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
            <div className="text-center p-12 flex flex-col box-border h-96 w-1/3 justify-center items-center space-y-3 bg-slate-300">
                <Input type="text" name="name" placeholder="Product Name" handleChange={handleChange} />
                <Input type="text" name="description" placeholder="Product Description" handleChange={handleChange} />
                <Input type="number" name="retailPrice" placeholder="Product Retail Price" handleChange={handleChange} />
                <button onClick={handleSubmit} type="submit">Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct;