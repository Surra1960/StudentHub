import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";

function AnnouncementDetails() {
    const { id } = useParams();
     const [error, setError] = useState("");
    const [announcement, setAnnouncement]=useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(
        ()=>{
            fetch(`http://localhost:4000/announcements/${id}`)
                .then(response=>{
                    if(!response.ok){
                        throw new Error('Failed to Fetch the Announcement');
                    }
                    return response.json();
                   
                })
                .then(data=>{
                    setAnnouncement(data.announcement)
                })
                .catch((err) =>{
                     console.error(err);
                    setError('Unbale to load the announcement')
                })
                .finally(
                 () =>{  setLoading(false)}
                );
        },[id])

    if(loading){
        return (
            <div className="page_content">
                <h1>Loading Announcement</h1>
            </div>
        );
    }
    if(error){
        return (
            <div className="page_content">
                <h1>{error}</h1>
                <Link to="/announcements">Back to Announcements</Link>
            </div>
        );
    }
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
