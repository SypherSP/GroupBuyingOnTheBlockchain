import { useState } from 'react'
import AddManufacturer from './AddManufacturer'


function AdminPanel() {
    const manufacturerList = [{ name: "dev", address: '0xbda224c4Db7D1E88E9B5B89895210CC3B6900fFF' }]
    const [manufacturerBoxProperty, setManufacturerBoxProperty] = useState("")
    function add() {
        console.log("add")
        setManufacturerBoxProperty("add")
    }
    function remove() {
        setManufacturerBoxProperty("remove")
    }

    return (
        <div className="flex justify-center items-center top-10 h-screen w-screen">
            <div className='p-12 text-center '>
                <div className="m-12 text-3xl flex justify-center">Manufacturer List</div>
                <div className="flex justify-center">
                    <table className="table-fixed border-separate border-spacing-2 border p-1 border-slate-500 ...">
                        <thead>
                            <tr>
                                <th className="border border-slate-500 text-left py-1 px-2 ...">Name</th>
                                <th className="border border-slate-500 text-left py-1 px-2 ...">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                manufacturerList.map((manufacturer) => {
                                    return (
                                        <tr  key={manufacturer.address}>
                                            <td className="border border-slate-500 text-left px-2 py-1 ..." >{manufacturer.name}</td>
                                            <td className="border border-slate-500 text-left px-2 py-1 ..." >{manufacturer.address}</td>
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