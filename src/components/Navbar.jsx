import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
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
                <button className="Navlogin_button">Login</button>
            </div>
        </div>
    );
}

export default Navbar;