import "../styles/AnnouncementCard.css";
import { Link } from "react-router-dom";

function AnnouncementCard({ id, title, category, date, description }) {
    return (
        <div className="announcement_card">
            <div className="card_header">
                <span className="card_category">{category}</span>
                <span className="card_date">{date}</span>
            </div>

            <h3 className="card_title">{title}</h3>

            <p className="card_description">
                {description}
            </p>

            <Link
                to={`/announcements/${id}`}
                className="read_more_btn"
            >
                Read More →
            </Link>
        </div>
    );
}

export default AnnouncementCard;