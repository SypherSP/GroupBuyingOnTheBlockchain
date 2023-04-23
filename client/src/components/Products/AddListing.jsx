import { useState, useContext, useEffect } from "react"
import { TransactionContext } from "../../context/TransactionContext"
import DropdownMenu from "../DropDownMenu";

// const Input = ({ placeholder, name, type, value, handleChange }) => (
//     <input
//         className=" p-1 "
//         placeholder={placeholder}
//         type={type}
//         name={name}
//         value={value}
//         onChange={(e) => handleChange(e, "group")}
//     />
// )

function AddListing({ showModal, toggleModal }) {
  const { addGroup, group, handleChange, handlePIDChange } = useContext(TransactionContext);
  const [selectedItem, setSelectedItem] = useState("");
  const handleSubmit = async (e) => {
    const { pID, maxSubscription, unitValue } = group;
    e.preventDefault();
    if (!pID || !maxSubscription || !unitValue) return;
    await addGroup();
    toggleModal("");

  }
  useEffect(() => {
    handlePIDChange(selectedItem);
  }, [selectedItem, group.pID])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${showModal==="list" ? 'block' : 'hidden'
        }`}
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden={!(showModal==="list")}
    >
      <div className="relative left-1/3 top-1/3 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Listing
            </h3>
            <button onClick={() => toggleModal("")} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-3">
            <div className="mb-6">
              <label htmlFor="wallet_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
              <DropdownMenu selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="unit_value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit Value</label>
                <input type="number" id="unit_value" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" onChange={(e) => handleChange(e, "group")} name="unitValue" value={group.unitValue} required />
              </div>
              <div>
                <label htmlFor="maxSubscription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Subscription</label>
                <input type="tel" id="maxSubscription" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" onChange={(e) => handleChange(e, "group")} name="maxSubscription" value={group.maxSubscription} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Add Listing</button>
              <button onClick={() => toggleModal("")} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
    //     <div className="text-center p-12 flex flex-col box-border h-96 w-1/3 justify-center items-center space-y-3 bg-slate-300">
    //     {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> */}
    //         <DropdownMenu selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    //         <Input placeholder="Unit Value" handleChange={handleChange} type="number" name="unitValue" />
    //         <Input placeholder="Maximum Subscription" handleChange={handleChange} type="number" name="maxSubscription" />
    //         <button onClick={handleSubmit} type="submit">Add group</button>
    //     </div>
    // </div>
  )
}

export default AddListing;