import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="page_content">
            <header className="page_heading">
                <h1>404 — Page not found</h1>
                <p>We couldn't find the page you're looking for.</p>
            </header>

            <Link to="/">Return to Home</Link>
        </div>
    );
}

export default NotFound;