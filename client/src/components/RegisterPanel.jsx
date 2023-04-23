import { useContext } from "react";
import MetamaskLogo from "../assets/metamask-icon.svg";
import light_logo from "../assets/light_logo.png";
import Listing from "./Products/Listing";
import { TransactionContext } from "../context/TransactionContext";

const RegisterPanel = () => {
  const { currentAccount, connectWallet, registerCustomer } = useContext(TransactionContext)
  // const [walletStatus, setWalletStatus] = useState('Connect Wallet');
  const handleClick = async (e) => {
    e.preventDefault();
    if (currentAccount === null || currentAccount === "" || currentAccount === undefined) await connectWallet();
    console.log("registering")
    await registerCustomer(123456789);
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
            <div className="flex items-center text-lg">
              <img src={MetamaskLogo} className="h-7 m-1 mr-2" alt="" /> Register as Customer
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterPanel;
