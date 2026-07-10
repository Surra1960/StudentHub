
// We will create website name/logo
// and then navigation menu , in this component
function Navbar(){

    return (
    <>
        <h1 className='navbar_title'>StudentHUb</h1>
        <nav className='navbar_links'>
            <a href='#home'>Home </a>
            <a href='#announcements'>Announcements</a>
            <a href='#events'>Events</a>
            <a href='#resources'>Resources</a>
            <a href='#clubs'>Clubs</a>
        </nav>
        <button className='Navlogin_button'>Login</button>
    </>
    )
}
export default Navbar;