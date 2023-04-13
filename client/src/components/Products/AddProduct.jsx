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

function AddProduct() {
    const { addProduct, product, handleChange } = useContext(TransactionContext);

    const handleSubmit = async (e) => {
        const { name, description } = product;
        e.preventDefault();
        if(!name || !description) return;
        await addProduct();
    }
    return (
        <div className="add-product">
            <Input type="text" name="name" placeholder="Product Name" handleChange={addProduct}/>
            <Input type="text" name="description" placeholder="Product Description" handleChange={addProduct}/>
            <button onSubmit={handleSubmit} type="submit">Add Product</button>
        </div>
    )
}

export default AddProduct;