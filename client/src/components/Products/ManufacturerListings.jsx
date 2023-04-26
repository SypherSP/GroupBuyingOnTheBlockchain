import { useState, useContext, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";

function ManufacturerListings() {
  const {
    getGroupsByManufacturer,
    claimEscrowedFunds,
    closeGroup,
    getAllProductFromProductID,
  } = useContext(TransactionContext);
  const [listings, setListings] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let data = await getGroupsByManufacturer();
      data.map(async (list) => {
        console.log("product fetching")
        let prod = await getAllProductFromProductID(list.pID);
        setProduct((prevData) => ({
          ...prevData,
          [list.pID]: prod,
        }));
      });
      setListings(data);
    }
    fetchData();
  });
  return (
    <div className="flex justify-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Listings
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              All listings by you.
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
            {listings &&
              product &&
              listings.length === 0 ?
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan="7" className="px-6 py-4 font-medium text-gray-400 whitespace-nowrap">
                  No Listing Added
                </td>
              </tr>
              :
              listings.map((listing) => {
                return (
                  <tr
                    key={listing.groupID}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product[listing.pID] ? product[listing.pID].name : "Product Name"}
                    </th>
                    <td className="px-6 py-4">{listing.groupID}</td>
                    <td className="px-6 py-4">{listing.currentSubscription.toString()}/{listing.maxSubscription.toString()}</td>
                    <td className="px-6 py-4">
                      {(listing.accumulatedPayment / BigInt(100000000000000)).toString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => closeGroup(listing.groupID)}
                        className={`text-red-700 border border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:text-red-500 dark:border-red-500 dark:focus:ring-red-900 ${!listing.isOpen
                            ? "cursor-not-allowed opacity-75"
                            : "hover:text-white hover:bg-red-800 dark:hover:bg-red-600 "
                          }`}
                        disabled={!listing.isOpen}
                      >
                        {listing.isOpen ? "Close" : "Closed"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => claimEscrowedFunds(listing.groupID)}
                        className={`text-green-700 border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:text-green-500 dark:border-green-500 dark:focus:ring-green-800 ${(listing.isOpen && !listing.isValue)
                            ? "cursor-not-allowed opacity-75"
                            : "hover:text-white hover:bg-green-800 dark:hover:bg-green-600 "
                          }`}
                        disabled={!(!listing.isOpen && listing.isValue)}
                      >
                        Withdraw
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManufacturerListings;
