import { useContext } from "react"
import { TransactionContext } from "../context/TransactionContext"

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
    placeholder={placeholder}
    type={type}
    name={name}
    value={value}
    onChange={(e) => handleChange(e, "manufacturer")}
    />
)

function AddManufacturer(){
    const { addManufacturer, manufacturer, handleChange } = useContext(TransactionContext);

    const handleSubmit = async (e) => {
        const { address, name } = manufacturer;
        e.preventDefault();
        if(!address || !name) return;
        await addManufacturer();
    }
    
    return (
        <div className="add-manufacturer">
            <Input placeholder="Manufacturer Address" handleChange={handleChange} type="text" name="address"/>
            <Input placeholder="Manufacturer Name" handleChange={handleChange} type="text" name="name"/>
            <button onClick={handleSubmit} type="submit">Add Manufacturer</button>
        </div>
    )
}

export default AddManufacturer;