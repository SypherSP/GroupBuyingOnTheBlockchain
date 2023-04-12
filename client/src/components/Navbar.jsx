import './Navbar.css'

function Navbar() {
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
        </nav>
    )
}

export default Navbar;