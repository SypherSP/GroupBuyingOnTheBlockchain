import { useContext, useEffect, useState } from "react";
import AddProduct from "../Products/AddProduct"
import AddListing from "../Products/AddListing"
import { TransactionContext } from "../../context/TransactionContext";
import Listings from "../Products/Listings";

function ManufacturerPanel() {
    const { getProductsByManufacturer } = useContext(TransactionContext)
    const [products, setProducts] = useState([{ name: "calculator", pID: "hsdf", mID: "dsf", description: "This is calcultors description", isValue: false }])
    const [property, setIsProperty] = useState("")
    const handleClick = (e) => {
        e.preventDefault();
        const { name } = e.target;
        setIsProperty(name);
    }
    useEffect(() => {
        let data = getProductsByManufacturer();
        setProducts(data);
    }, [])
    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/2 bg-slate-500">
                <div className="mt-[7rem] ml-[5rem]">
                    <div className="flex flex-row space-x-5">
                        <button onClick={handleClick} className="border rounded-lg p-2 m-3" name="addProduct">Add Product</button>
                        <button onClick={handleClick} className="border rounded-lg p-2 m-3" name="addListing">Add Listing</button>
                    </div>
                    <div className="m-3 text-left text-2xl">
                        Our Listings
                    </div>
                    <Listings />
                    {/* <div className=""> Our Products</div> */}
                    {1 === 1 ? "" :
                        products.map((product) => {
                            return (
                                <tr key={product.pID}>
                                    <td className="border border-slate-500 text-left px-2 py-1 ..." >{product.name}</td>
                                    <td className="border border-slate-500 text-left px-2 py-1 ..." >{product.address}</td>
                                </tr>
                            )
                        })
                    }
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
            {property === "addProduct" ? <AddProduct property={setIsProperty} /> : ""}
            {property === "addListing" ? <AddListing property={setIsProperty} /> : ""}
        </div>
    )
}
export default ManufacturerPanel;