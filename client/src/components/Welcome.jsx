import { useContext, useState } from "react"
import Box from "./Box"
import { TransactionContext } from "../context/TransactionContext"
import AdminPanel from "./Manufacturer/Admin";
import ManufacturerPanel from "./Manufacturer/ManufacturerPanel";
import CustomerPanel from "./Manufacturer/CustomerPanel";


function Welcome() {
    const {userCategory} = useContext(TransactionContext);

    
    return (
        <div>
            {userCategory === "owner" ? <AdminPanel />: ""} 
            {/* {need to remove not registered from above} */}
            {userCategory === "manufacturer"? <ManufacturerPanel />: ""}
            {userCategory === "customer" || userCategory === "not registered" ? <CustomerPanel />: ""}
            {/* {userCategory === "not registered"? <RegisterPanel />: ""} */}
        </div>
    )
}

export default Welcome