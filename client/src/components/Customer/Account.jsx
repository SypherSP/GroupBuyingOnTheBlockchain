import React, { useContext, useState, useEffect } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

function Account() {
  const [groups, setGroups] = useState([]);
  const [product, setProduct] = useState({});
  const [manufacturer, setManufacturer] = useState([]);
  const { getCustomerGroups, currentAccount, getAllProductFromProductID, getManufacturerFromID } = useContext(TransactionContext);

  useEffect(() => {
    const fetchCustomerGroups = async () => {
      const customerGroups = await getCustomerGroups(currentAccount);
      customerGroups.map(async (group) => {
        let prod = await getAllProductFromProductID(group.pID);
        let manu = await getManufacturerFromID(prod.manufacturerID)
        console.log(manu.phoneNo)
        setProduct((prevData) => ({
          ...prevData,
          [group.pID]: prod,
        }));
        setManufacturer((prevData) => ({
          ...prevData,
          [group.pID]: manu,
        }))
      })
      setGroups(customerGroups);
    };

    if (currentAccount) {
      fetchCustomerGroups();
    }
  }, [currentAccount]);

return (
  <div className="flex justify-center items-center top-10 h-screen w-screen">
    <div className="p-12 text-center ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Account Information
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Groups for the current customer.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Group ID
              </th>
              <th scope="col" className="px-6 py-3">
                Progress
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Value
              </th>
              <th scope="col" className="px-6 py-3">
                Your Subscription
              </th>
              <th scope="col" className="px-6 py-3">
                Group Status
              </th>
              <th scope="col" className="px-6 py-3">
                Manufacturer Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.length === 0 ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan="7" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  No groups found for this customer.
                </td>
              </tr>
            ) : (
              groups.map((group, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <td className="px-6 py-4">{product[group.pID] ? product[group.pID].name : "Product Name"}</td>
                  <td className="px-6 py-4">{group.groupID}</td>
                  <td className="px-6 py-4">{group.currentSubscription}/{group.maxSubscription}</td>
                  <td className="px-6 py-4">{group.unitValue}</td>
                  <td className="px-6 py-4">{"dummy"}</td>
                  <td className="px-6 py-4">{group.isOpen ? 'Open' : 'Closed'}</td>
                  <td className="px-6 py-4">{manufacturer[group.pID] ? manufacturer[group.pID].phoneNo : "Number"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default Account;
