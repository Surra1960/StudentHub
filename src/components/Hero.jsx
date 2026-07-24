import "./Hero.css";

function Hero(){

    return(
        <div className="hero">
            <div className="hero_content">
        <h1>Welcome to StudentHub!</h1>
        <p>Stay informed, stay connected, and make the most of your university life. StudentHub brings announcements, events, resources, and student communities together in one simple platform.
             </p>
             <div className="hero_buttons">
        <button className="exploreAnnouncements">Explore Announcements</button>
        <button className="joinCommunity">Join Community</button>
        </div>
        </div>

       </div>
    );
}

export default Hero;