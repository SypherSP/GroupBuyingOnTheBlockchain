import React, { useContext, useState, useEffect } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

function Account() {
  const [groups, setGroups] = useState([]);
  const { getCustomerGroups, currentAccount } = useContext(TransactionContext);

  useEffect(() => {
    const fetchCustomerGroups = async () => {
      const customerGroups = await getCustomerGroups(currentAccount);
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
        <table className="w-full text-sm text-left text-gray-500">
          <caption className="p-5 text-2xl font-semibold text-left text-gray-900 bg-white">
            Account Information
            <p className="mt-1 text-sm font-normal text-gray-500 ">
              Groups for the current customer.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Group ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3">
                Max Subscription
              </th>
              <th scope="col" className="px-6 py-3">
                Current Subscription
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Value
              </th>
              <th scope="col" className="px-6 py-3">
                Accumulated Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Open
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.length === 0 ? (
              <tr className="bg-white border-b">
                <td colSpan="7" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  No groups found for this customer.
                </td>
              </tr>
            ) : (
              groups.map((group, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4">{group.groupID}</td>
                  <td className="px-6 py-4">{group.pID}</td>
                  <td className="px-6 py-4">{group.maxSubscription}</td>
                  <td className="px-6 py-4">{group.currentSubscription}</td>
                  <td className="px-6 py-4">{group.unitValue}</td>
                  <td className="px-6 py-4">{group.accumulatedPayment}</td>
                  <td className="px-6 py-4">{group.isOpen ? 'Yes' : 'No'}</td>
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
