import { useContext, useEffect, useState } from "react";
import AddManufacturer from "./AddManufacturer";
import { TransactionContext } from "../../context/TransactionContext";

function AdminPanel() {
  const { getAllManufacturers } = useContext(TransactionContext);
  const [manufacturerList, setManufacturerList] = useState();
  const [manufacturerBoxProperty, setManufacturerBoxProperty] = useState("");
  function add() {
    console.log("add");
    setManufacturerBoxProperty("add");
  }
  function remove() {
    setManufacturerBoxProperty("remove");
  }
  useEffect(() => {
    async function fetchData() {
      let data = await getAllManufacturers();
      setManufacturerList(data);
    }
    fetchData();
  }, [manufacturerBoxProperty]);

  return (
    <div className="flex justify-center items-center top-10 h-screen w-screen">
      <div className="p-12 text-center ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <caption className="p-5 text-2xl font-semibold text-left text-gray-900 bg-white">
              Manufacturer List
              <p className="mt-1 text-sm font-normal text-gray-500 ">
                Details of all manufacturers registered on the blockchain.
              </p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Manufacturer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Revenue
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact Number
                </th>
              </tr>
            </thead>
            <tbody>
              {manufacturerList &&
                manufacturerList.map((manufacturer) => {
                  return (
                    <tr
                      key={manufacturer.manufacturerID}
                      className="bg-white border-b"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {manufacturer.name}
                      </th>
                      <td className="px-6 py-4">
                        {manufacturer.totalRevenue.toString()}
                      </td>
                      <td className="px-6 py-4">{manufacturer.phoneNo}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <button onClick={add} className="p-1">
            Add
          </button>
          <button className="p-1">Delete</button>
        </div>
      </div>
      {manufacturerBoxProperty === "add" ? (
        <AddManufacturer property={setManufacturerBoxProperty} />
      ) : null}
    </div>
  );
}

export default AdminPanel;
