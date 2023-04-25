import { useState } from 'react';
import { useContext } from "react";
import MetamaskLogo from "../assets/metamask-icon.svg";
import light_logo from "../assets/light_logo.png";
import Listing from "./Products/Listing";
import { TransactionContext } from "../context/TransactionContext";

const PhoneNoModal = ({ modalStatus, setModalStatus, phoneNo, handleChange, register }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${modalStatus ? 'block' : 'hidden'
        }`}
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden={!modalStatus}
    >
      <div className="relative w-full left-1/3 top-1/3 max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Register as Customer
            </h3>
            <button onClick={() => setModalStatus(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <form className="p-3">
            <div>
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input type="tel" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Name" onChange={(e) => handleChange(e)} name="number" value={phoneNo} required />

            </div>
          </form>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={register}>Register</button>
            <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setModalStatus(false)}>Decline</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const RegisterPanel = () => {
  const { currentAccount, connectWallet, registerCustomer } = useContext(TransactionContext)
  // const [walletStatus, setWalletStatus] = useState('Connect Wallet');
  const [modalStatus, setModalStatus] = useState(false);
  const [phoneNo,setPhoneNo] = useState();
  const handleChange = (e) => {
    const {name, value} = e.target;
    setPhoneNo(value)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (currentAccount === null || currentAccount === "" || currentAccount === undefined) await connectWallet();
    setModalStatus(true);
    // console.log("registering")
    // setModalStatus(false);
    // window.location.reload()
  }

  const register = async () => {
    if (phoneNo === undefined || phoneNo === null || phoneNo === "") return;
    console.log(phoneNo)
    await registerCustomer(phoneNo);
    setModalStatus(false)
    window.location.reload()
  }
  return (
    <>
      <div className="mt-64 flex justify-evenly items-center ">
        <div className="grid place-items-center">
          <div className="flex items-end">
            <img className="h-20 m-1 mr-2" src={light_logo} alt="" />
            <span className="self-center text-7xl font-semibold whitespace-nowrap dark:text-blue-950 ">
              BulkBlock
            </span>
          </div>
          <div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-600">
              No middlemen, just bulk savings!
            </span>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleClick}
          >
            <PhoneNoModal modalStatus={modalStatus} setModalStatus={setModalStatus} phoneNo={phoneNo} handleChange={handleChange} register={register} />
            <div className="flex items-center text-lg">
              <img src={MetamaskLogo} className="h-7 m-1 mr-2" alt="" /> Register as Customer
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterPanel
