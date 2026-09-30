import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStudent } from "../context/useStudent";

function Navbar() {
    const { user, logout } = useStudent();
    return (
        <div className="navbar">
            <div className="navbar_logo">
                <h1 className="navbar_title">StudentHub</h1>
            </div>

            <nav className="navbar_links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/announcements"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Announcements
                </NavLink>

                <NavLink
                    to="/events"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Events
                </NavLink>

                <NavLink
                    to="/resources"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Resources
                </NavLink>

                <NavLink
                    to="/clubs"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Clubs
                </NavLink>
            </nav>

            <div className="navbar_actions">
                {user ? <><Link className="navbar_user" to="/profile">{user.fullName}</Link><button className="Navlogin_button" onClick={logout}>Log out</button></> : <><Link className="navbar_auth_link" to="/login">Login</Link><Link className="Navlogin_button" to="/register">Sign Up</Link></>}
            </div>
        </div>
    );
}

export default Navbar;
