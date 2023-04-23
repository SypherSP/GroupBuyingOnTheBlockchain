import { useState, useContext, useEffect } from "react"
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
            {/* <table className="table-fixed border-separate border-spacing-2 border p-1 border-slate-500 ...">
                <thead>
                    <tr>
                        <th className="border border-slate-500 text-left py-1 px-2 ...">Product Id</th>
                        <th className="border border-slate-500 text-left py-1 px-2 ...">Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {listings && listings.length !==0 &&
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
            </table> */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <caption className="p-5 text-2xl font-semibold text-left text-gray-900 bg-white">
                        Listings
                        <p className="mt-1 text-sm font-normal text-gray-500 ">
                            All listings by you.
                        </p>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Accumulated Payment
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Withdrawal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings && listings.length !== 0 &&
                            listings.map((listing) => {
                                return (
                                    <tr
                                        key={listing.pID}
                                        className="bg-white border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {listing.pID}
                                        </th>
                                        <td className="px-6 py-4">
                                            {listing.accumulatedPayment.toString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="" disabled={!listing.isOpen}></button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="" disabled={listing.isOpen}></button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Listings