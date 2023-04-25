import { useContext, useState } from "react"
import { TransactionContext } from "../context/TransactionContext"
import AdminPanel from "./Manufacturer/Admin";
import ManufacturerPanel from "./Manufacturer/ManufacturerPanel";
import MarketListings from "./Products/MarketListings";
import RegisterPanel from "./RegisterPanel";


function Welcome() {
    const {userCategory, currentAccount} = useContext(TransactionContext);


    return (
        <div>
            {userCategory === "owner" ? <AdminPanel />: ""}
            {userCategory === "manufacturer"? <ManufacturerPanel />: ""}
            {userCategory === "customer" ? <MarketListings />: ""}
            {userCategory === "not registered" || (currentAccount === "" && userCategory === "") ? <RegisterPanel />: ""}
        </div>
    )
}

export default Welcome
