
import { useParams } from "react-router-dom";

function AnnouncementDetails() {
    const {id}=useParams();
    return (
        <div className="announcement-details">
            <h1>Announcement Details</h1>

            <h2>Announcement ID: {id}</h2>

            <h2>Announcement Title</h2>
            

            <p>
                This page will display the complete announcement
                after clicking "Read More".
            </p>
        </div>
    );
}

export default AnnouncementDetails;