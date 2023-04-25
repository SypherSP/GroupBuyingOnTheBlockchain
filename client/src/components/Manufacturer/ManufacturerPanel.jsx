import { useContext, useEffect, useState } from "react";
import AddProduct from "../Products/AddProduct";
import AddListing from "../Products/AddListing";
import { TransactionContext } from "../../context/TransactionContext";
import ManufacturerListings from "../Products/ManufacturerListings";
import ManufacturerProducts from "../Manufacturer/ManufacturerProducts";

function ManufacturerPanel() {
  const { getProductsByManufacturer, } = useContext(TransactionContext);
  const [products, setProducts] = useState([
    {
      name: "calculator",
      pID: "hsdf",
      mID: "dsf",
      description: "This is calcultors description",
      isValue: false,
    },
  ]);
  // const [property, setIsProperty] = useState("")
  const [showModal, setShowModal] = useState("");
  const toggleModal = (param) => setShowModal(param);
  const handleClick = (e) => {
    e.preventDefault();
    const { name } = e.target;
    // setIsProperty(name);
    if (name === "addProduct") toggleModal("product");
    else if (name === "addListing") toggleModal("list");
  };
  useEffect(() => {
    let data = getProductsByManufacturer();
    setProducts(data);
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen items-center">

        <div className="mt-[6rem] max-w-[80rem] p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Account Summary
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Key statistics about your account
          </p>
          <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <div
              
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-700 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              
              <div className="text-center">
                <div className="mb-1 text-base">Revenue Generated</div>
                <div className="-mt-1 font-sans text-lg font-semibold">
                  0$
                </div>
              </div>
            </div>
            <div
              
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-700 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              
              <div className="text-center">
                <div className="mb-1 text-base">Total Earnings</div>
                <div className="-mt-1 font-sans text-lg font-semibold">
                  0$
                </div>
              </div>
            </div>
            
            <div
              
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-700 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              
              <div className="text-center">
                <div className="mb-1 text-base">Completed Listings</div>
                <div className="-mt-1 font-sans text-lg font-semibold">
                  0$
                </div>
              </div>
            </div>

            <div
              
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-700 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              
              <div className="text-center">
                <div className="mb-1 text-base">Customers Served</div>
                <div className="-mt-1 font-sans text-lg font-semibold">
                  0
                </div>
              </div>
            </div>

            <div
              
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-700 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              
              <div className="text-center">
                <div className="mb-1 text-base">Items Delivered</div>
                <div className="-mt-1 font-sans text-lg font-semibold">
                  0
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-row justify-around mt-[3rem]">
          <div className="flex flex-col mr-[1rem]">
            <div>
              <button
                onClick={handleClick}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                name="addListing"
              >
                Add Listing
              </button>
              {showModal === "list" && (
                <AddListing showModal={showModal} toggleModal={toggleModal} />
              )}
            </div>
            <div className="mt-[1rem]">
              <ManufacturerListings />
            </div>
          </div>
          <div className="flex flex-col ml-[1rem]">
            <div>
              <button
                onClick={handleClick}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                name="addProduct"
              >
                Add Product
              </button>
              {showModal === "product" && (
                <AddProduct showModal={showModal} toggleModal={toggleModal} />
              )}
            </div>
            <div className="mt-[1rem]">
              <ManufacturerProducts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ManufacturerPanel;
