import AnnouncementCard from "./AnnouncementCard";
import { useState, useEffect, useRef, useMemo } from "react";
import "../styles/AnnouncementSection.css";

function AnnouncementsSection() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showAcademicOnly, setShowAcademicOnly] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/announcements")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch announcements");
                }

                return response.json();
            })
            .then((data) => {
                setAnnouncements(data.announcements);
            })
            .catch((err) => {
                console.error(err);
                setError("Unable to load announcements.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const searchInputRef = useRef(null);

    const filteredAnnouncements = useMemo(() => {
        return announcements.filter((announcement) =>
            announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            announcement.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [announcements, searchTerm]);

    const toggleAcademicFilter = () => {
        setShowAcademicOnly(!showAcademicOnly);
    };

    const displayedAnnouncements = showAcademicOnly
        ? filteredAnnouncements.filter(
            (announcement) => announcement.category === "Academic"
        )
        : filteredAnnouncements;

    useEffect(() => {
        if (!searchTerm) {
            document.title = "StudentHub";
        } else {
            document.title = `Searching: ${searchTerm}`;
        }
    }, [searchTerm]);

    const focusHandler = () => {
        searchInputRef.current.focus();
    };

    return (
        <div className="announcements_container">

            <div className="announcements_header">
                <h2>Latest Announcements</h2>
                <p>
                    Stay updated with the latest campus news, academic announcements,
                    and important university notices.
                </p>
            </div>

            <div className="announcements_toolbar">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search announcements..."
                    className="input_field"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />

                <button
                    className="focus_search"
                    onClick={focusHandler}
                >
                    Focus Search
                </button>

                <button
                    className="academic-filter-btn"
                    onClick={toggleAcademicFilter}
                >
                    {showAcademicOnly
                        ? "Show All Announcements"
                        : "Show Academic Only"}
                </button>
            </div>

            <div className="announcements_info">
                <h3>Showing {displayedAnnouncements.length} announcements</h3>
            </div>

            <div className="cards_container">
                {loading ? (
                    <h2>Loading announcements...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : announcements.length === 0 ? (
                    <h2>There are currently no announcements to display.</h2>
                ) : displayedAnnouncements.length === 0 ? (
                    <h2>No announcements match your search.</h2>
                ) : (
                    displayedAnnouncements.map((announcement) => (
                        <AnnouncementCard
                            key={announcement.id}
                            title={announcement.title}
                            category={announcement.category}
                            date={announcement.date}
                            description={announcement.description}
                            id={announcement.id}
                        />
                    ))
                )}
            </div>

        </div>
    );
}

export default AnnouncementsSection;