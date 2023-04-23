import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { abi } from '../../../smart_contracts/contractArtifacts';
const { ethereum } = window;
const { contractAbi, contractAddress } = abi;

export const TransactionContext = React.createContext();


export const TransactionsProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [manufacturer, setManufacturer] = useState({ "address": '', "name": '' });
    const [product, setProduct] = useState({ "name": '', "description": '', retailPrice: 0 });
    const [group, setGroup] = useState({ pID: "", maxSubscription: 0, unitValue: 0 })
    const [userCategory, setUserCategory] = useState("");
    const handleChange = (e, changeType) => {
        const { name, value } = e.target
        if (changeType === "manufacturer") setManufacturer((prevData) => ({
            ...prevData, [name]: value
        }))
        else if (changeType === "product") setProduct((prevData) => ({
            ...prevData, [name]: value
        }))
        else if (changeType === "group") setGroup((prevData) => ({
            ...prevData, [name]: value
        }))
    }
    const handlePIDChange = (value) => {
        setGroup((prevData) => ({
            ...prevData,
            pID: value
        }))
    }

    useEffect(() => {
        async function getDetails() {
            const provider = new ethers.BrowserProvider(ethereum);
            const contract = new ethers.Contract(contractAddress, contractAbi, provider);
            const tx = await contract.getUseCategory(currentAccount);
            console.log(tx)
            setUserCategory(tx);
        }
        if (currentAccount !== '') getDetails();
    }, [currentAccount])
    useEffect(() => {
        const storedAccount = sessionStorage.getItem("currentAccount");
      
        if (storedAccount) {
          setCurrentAccount(storedAccount);
        }
      }, []);
      

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            setCurrentAccount(accounts[0]);
            // Store currentAccount in localStorage
            sessionStorage.setItem("currentAccount", accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    // const getDetails = async () => {
    //     const provider = new ethers.BrowserProvider(ethereum);
    //     const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    //     const tx = await contract.getUserCategory(currentAccount);
    //     await tx.wait()
    //     setUserCategory(tx);
    // }

    const getAllGroups = async () => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.getAllGroups();
        return tx;
    }

    const getAllManufacturers = async () => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        console.log(currentAccount)
        const tx = await contract.getAllManufacturers();
        return tx;
    }

    const getGroupsByManufacturer = async () => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.getGroupsByManufacturer(currentAccount);
        return tx;
    }

    const getAllProductFromProductID = async (pID) => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.getAllProductFromProductID(pID);
        return tx;
    }

    const addManufacturer = async () => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        const tx = await contract.addManufacturer(manufacturer.address, manufacturer.name, manufacturer.phoneNo)
        await tx.wait();
        console.log("Added");
        return tx.hash;
    }
    const addGroup = async () => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        const tx = await contract.addGroup(group.pID, group.maxSubscription, group.unitValue);
        await tx.wait();
        console.log("Added");
        return tx.hash;
    }
    const addProduct = async () => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        console.log(product.name, product.description, "this is product ")
        const tx = await contract.addProduct(product.name, product.description, product.retailPrice);
        await tx.wait();
        console.log("Added");
        return tx.hash;
    }
    const getProductsByManufacturer = async () => {
        const provider = new ethers.BrowserProvider(ethereum);
        // const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const tx = await contract.getProductsByManufacturer(currentAccount);
        return tx;
    }
    const getProductsByCustomer = async (customerAddress) => {
        const provider = new ethers.BrowserProvider(ethereum);
        // const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const tx = await contract.getProductsByCustomer(customerAddress);
        return tx;
    }
    const registerCustomer = async (phoneNo) => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.registerCustomer(phoneNo);
        await tx.wait();
        return tx.hash;
    }

    const closeGroup = async (groupID) => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.closeGroup(groupID);
        await tx.wait();
        console.log("Closed");
        return tx.hash;
    }
    const joinGroupAndPay = async (groupID, units, totalPrice) => {
        console.log(totalPrice, units)
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const paymentAmountWei = ethers.parseUnits(totalPrice.toString(), 18);
        const tx = await contract.joinGroupAndPay(groupID, units, {value: paymentAmountWei});
        await tx.wait();
        console.log("Joined");
        return tx.hash;
    }
    const claimEscrowedFunds = async (groupID) => {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.claimEscrowedFunds(groupID);
        await tx.wait();
        console.log("Claimed");
        return tx.hash;
    };

    return (
        <TransactionContext.Provider value={{
            currentAccount,
            manufacturer,
            product,
            group,
            userCategory,
            handleChange,
            handlePIDChange,
            connectWallet,
            addManufacturer,
            addGroup,
            addProduct,
            getProductsByManufacturer,
            getGroupsByManufacturer,
            getProductsByCustomer,
            getAllProductFromProductID,
            getAllManufacturers,
            getAllGroups,
            registerCustomer,
            closeGroup,
            joinGroupAndPay,
            claimEscrowedFunds
        }}>
            {children}
        </TransactionContext.Provider>
    );
}