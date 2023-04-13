import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

function Navbar() {
    const { connectWallet, currentAccount } = useContext(TransactionContext);
    const [walletStatus, setWalletStatus] = useState('Connect Wallet');

    const handleClick = (e) => {
        e.preventDefault();
        connectWallet();
    };

    useEffect(() => {
        if (currentAccount) {
            setWalletStatus(shortenAddress(currentAccount));
        } else {
            setWalletStatus('Connect Wallet');
        }
    }, [currentAccount]);

    return (
        <nav className="navbar">
            <div>
                <img src='' alt='logo' className="logo"/>
            </div>
            <ul>
                <li>Market</li>
                <li>About Us</li>
                <li>Login</li>
            </ul>
            <button onClick={handleClick}>{walletStatus}</button>
        </nav>
    );
}

export default Navbar;
