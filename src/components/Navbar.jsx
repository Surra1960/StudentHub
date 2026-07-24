
import { useContext} from "react";
import StudentContext from "../context/StudentContext";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar(){
    const student=useContext(StudentContext);
    return (
    <div className="navbar">
        <div className="navbar_logo">
        <h1 className='navbar_title'>StudentHUb</h1>
        </div>
       
        <nav className='navbar_links'>
             <NavLink to="/">Home</NavLink>
             <NavLink to="/announcements">Announcements</NavLink>
             <NavLink to="/events">Events</NavLink>
             <NavLink to="/resources" >Resources</NavLink>
             <NavLink to="/clubs" >Clubs</NavLink>
        </nav>
        <div className="navbar_actions">

         <button className='Navlogin_button'>Login</button>
        </div>
      
    </div>
    )
}
export default Navbar;