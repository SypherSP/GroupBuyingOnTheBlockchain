import { useState, useContext, useEffect } from "react"
import { TransactionContext } from "../../context/TransactionContext"
import DropdownMenu from "../DropDownMenu";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        className=" p-1 "
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={(e) => handleChange(e, "group")}
    />
)

function AddListing(props) {
    const { addGroup, group, handleChange, handlePIDChange } = useContext(TransactionContext);
    const [selectedItem, setSelectedItem] = useState("");
    const handleSubmit = async (e) => {
        const { pID, maxSubscription, unitValue } = group;
        e.preventDefault();
        props.property('')
        if (!pID || !maxSubscription || !unitValue) return;
        await addGroup();

    }
    useEffect(() => {
        handlePIDChange(selectedItem);
    },[selectedItem, group.pID])

    return (
        // <></>
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
            <div className="text-center p-12 flex flex-col box-border h-96 w-1/3 justify-center items-center space-y-3 bg-slate-300">
            {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> */}
                <DropdownMenu selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                <Input placeholder="Unit Value" handleChange={handleChange} type="number" name="unitValue" />
                <Input placeholder="Maximum Subscription" handleChange={handleChange} type="number" name="maxSubscription" />
                <button onClick={handleSubmit} type="submit">Add Manufacturer</button>
            </div>
        </div>
    )
}

export default AddListing;