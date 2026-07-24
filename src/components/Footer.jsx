
import "./Footer.css";
function Footer(){


return(
    <footer className="footer">
    <h3 className="footer_logo">StudentHub</h3>

    <p className="footer_text">
        Connecting students through information and community.
    </p>

    <nav className="footerNav">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Privacy Policy</a>
    </nav>

    <p className="footer_copyright">
        &copy; 2026 StudentHub. All rights reserved.
    </p>
</footer>
)
}
export default Footer;