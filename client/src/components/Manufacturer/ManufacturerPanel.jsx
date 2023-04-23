import { useContext, useEffect, useState } from "react";
import AddProduct from "../Products/AddProduct"
import AddListing from "../Products/AddListing"
import { TransactionContext } from "../../context/TransactionContext";
import ManufacturerListings from "../Products/ManufacturerListings";

function ManufacturerPanel() {
    const { getProductsByManufacturer } = useContext(TransactionContext)
    const [products, setProducts] = useState([{ name: "calculator", pID: "hsdf", mID: "dsf", description: "This is calcultors description", isValue: false }])
    // const [property, setIsProperty] = useState("")
    const [showModal, setShowModal] = useState("");
    const toggleModal = (param) => setShowModal(param);
    const handleClick = (e) => {
        e.preventDefault();
        const { name } = e.target;
        // setIsProperty(name);
        if(name==="addProduct") toggleModal("product")
        else if(name==="addListing") toggleModal("list")
    }
    useEffect(() => {
        let data = getProductsByManufacturer();
        setProducts(data);
    }, [])
    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/2 bg-slate-500">
                <div className="mt-[7rem] ml-[5rem]">
                    <div className="flex flex-row space-x-5 m-6">
                        <button onClick={handleClick} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="addProduct">Add Product</button>
                        {showModal==="product" && <AddProduct showModal={showModal} toggleModal={toggleModal} />}
                        <button onClick={handleClick} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="addListing">Add Listing</button>
                        {showModal==="list" && <AddListing showModal={showModal} toggleModal={toggleModal} />}
                    </div>
                    {/* <div className="m-3 text-left text-2xl">
                        Our Listings
                    </div> */}
                    <ManufacturerListings />
                </div>
            </div>
            <div className="w-1/2 bg-slate-0">
                <div className="mt-[7rem] ml-[5rem] text-left text-2xl">
                    Total Earnings: {"0"}
                </div>
                <div className="">
                    Completed Listings
                </div>
                <button className="">Transfer Funds</button>
            </div>
         </div>
    )
}
export default ManufacturerPanel;