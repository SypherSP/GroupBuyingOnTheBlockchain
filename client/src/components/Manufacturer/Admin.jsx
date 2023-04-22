import { useContext, useEffect, useState } from 'react'
import AddManufacturer from './AddManufacturer'
import { TransactionContext } from '../../context/TransactionContext'


function AdminPanel() {
    const { getAllManufacturers } = useContext(TransactionContext);
    const [manufacturerList, setManufacturerList] = useState()
    const [manufacturerBoxProperty, setManufacturerBoxProperty] = useState("")
    function add() {
        console.log("add")
        setManufacturerBoxProperty("add")
    }
    function remove() {
        setManufacturerBoxProperty("remove")
    }
    useEffect(() => {
        async function fetchData(){
            let data = await getAllManufacturers();
            setManufacturerList(data)
        }
        fetchData();
    },[manufacturerBoxProperty])

    return (
        <div className="flex justify-center items-center top-10 h-screen w-screen">
            <div className='p-12 text-center '>
                <div className="m-12 text-3xl flex justify-center">Manufacturer List</div>
                <div className="flex justify-center">
                    <table className="table-fixed border-separate border-spacing-2 border p-1 border-slate-500 ...">
                        <thead>
                            <tr>
                                <th className="border border-slate-500 text-left py-1 px-2 ...">Name</th>
                                <th className="border border-slate-500 text-left py-1 px-2 ...">Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manufacturerList &&
                                manufacturerList.map((manufacturer) => {
                                    return (
                                        <tr  key={manufacturer.manufacturerID}>
                                            <td className="border border-slate-500 text-left px-2 py-1 ..." >{manufacturer.name}</td>
                                            <td className="border border-slate-500 text-left px-2 py-1 ..." >{manufacturer.totalRevenue.toString()}</td>
                                        </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <button onClick={add} className="p-1">Add</button>
                    <button className="p-1">Delete</button>
                </div>
            </div>
            {manufacturerBoxProperty === "add" ? <AddManufacturer property={setManufacturerBoxProperty} /> : null}
        </div>
    )
}

export default AdminPanel;