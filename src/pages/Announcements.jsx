
import AnnouncementsSection from "../components/AnnouncementsSection";

function Announcements(){

    return(
        <div className="page_content">
            <header className="page_heading">
                <h1>Announcements</h1>
                <p>Browse the latest campus news, academic updates, and event announcements in one place.</p>
            </header>
            <AnnouncementsSection/>
        </div>
    )
}
export default Announcements;