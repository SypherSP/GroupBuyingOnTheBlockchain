import React from "react";
import MetamaskLogo from "./metamask-icon.svg";
// import { TransactionContext } from "../context/TransactionContext";

const Hero = () => {
  // const { connectWallet, currentAccount } = useContext(TransactionContext);
  // const [walletStatus, setWalletStatus] = useState('Connect Wallet');
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   connectWallet();
  // };
  return (
    <div className="mt-64 flex justify-evenly items-center ">
      <div className="grid place-items-center">
        <div>
          <span className="self-center text-7xl font-semibold whitespace-nowrap dark:text-blue-950 ">
            BulkBlock
          </span>
          <img src="" alt="" />
        </div>
        <div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-600 ">
            No middlemen, just bulk savings!
          </span>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {}}
        >
          <div className="flex items-center text-lg">
            <img src={MetamaskLogo} className="h-7 m-1 mr-2" alt="" /> Connect to
            Metamask
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero;
