import { useState,useContext, useEffect } from "react"
import { TransactionContext } from "../../context/TransactionContext"

function Listings() {
    const { getGroupsByManufacturer } = useContext(TransactionContext);
    const [listings, setListings] = useState();
    useEffect(() => {
        async function fetchData() {
            let data = await getGroupsByManufacturer();
            setListings(data);
        }
        fetchData();
    })
    return (
        <div className="flex justify-center">
            <table className="table-fixed border-separate border-spacing-2 border p-1 border-slate-500 ...">
                <thead>
                    <tr>
                        <th className="border border-slate-500 text-left py-1 px-2 ...">Product Id</th>
                        <th className="border border-slate-500 text-left py-1 px-2 ...">Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {listings &&
                        listings.map((listing) => {
                            return (
                                <tr key={listing.pID}>
                                    <td className="border border-slate-500 text-center px-2 py-1 ..." >{listing.pID}</td>
                                    <td className="border border-slate-500 text-center px-2 py-1 ..." >{listing.accumulatedPayment.toString()}</td>
                                    <td><button className={listing.isOpen ?  "disabled:opacity-75": ""}>Close</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Listings