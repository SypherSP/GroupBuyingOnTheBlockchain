import { useContext } from "react"
import { TransactionContext } from "../../context/TransactionContext"

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        className=" p-1 "
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={(e) => handleChange(e, "manufacturer")}
    />
)

function AddManufacturer(props) {
    const { addManufacturer, manufacturer, handleChange } = useContext(TransactionContext);

    const handleSubmit = async (e) => {
        const { address, name } = manufacturer;
        e.preventDefault();
        props.property('')
        if (!address || !name) return;
        await addManufacturer();

    }

    return (
        // <></>
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
            <div className="text-center p-12 flex flex-col box-border h-96 w-1/3 justify-center items-center space-y-3 bg-slate-300">
            {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> */}
                <Input placeholder="Manufacturer Address" handleChange={handleChange} type="text" name="address" />
                <Input placeholder="Manufacturer Name" handleChange={handleChange} type="text" name="name" />
                <button onClick={handleSubmit} type="submit">Add Manufacturer</button>
            </div>
        </div>
    )
}

export default AddManufacturer;