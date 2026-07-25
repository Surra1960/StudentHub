import { Link, useParams } from "react-router-dom";
import announcementData from "../data/announcements";

function AnnouncementDetails() {
    const { id } = useParams();
    const announcement = announcementData.find((item) => String(item.id) === id);

    if (!announcement) {
        return (
            <div className="page_content">
                <h1>Announcement not found</h1>
                <p>The requested announcement does not exist or may have been removed.</p>
                <Link to="/announcements">Back to Announcements</Link>
            </div>
        );
    }

    return (
        <div className="page_content">
            <article className="announcement_details">
                <h1>{announcement.title}</h1>
                <div className="announcement_meta">
                    <span>{announcement.category}</span>
                    <span>{announcement.date}</span>
                </div>
                <p>{announcement.description}</p>
                <p>{announcement.details}</p>
                <Link to="/announcements">← Back to Announcements</Link>
            </article>
        </div>
    );
}

export default AnnouncementDetails;
