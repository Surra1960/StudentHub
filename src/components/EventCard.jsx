

import {Link} from "react-router-dom";
import '../styles/EventCard.css';

function EventCard({event}){

    return(
        <div className="event_card">
            
            <div className="card_header">
                <h3 className="event_title">{event.title}</h3>
                <span className="event_date">{event.date}</span>
            </div>
            <p className="event_category">{event.category}</p>
            <p className="event_description">{event.description}</p>
            {
                event.image_url &&(
                     <img
                            src={event.image_url}
                             alt={event.title}
                             className="event_image"
    />
                )
            }
            <p className="event_organizer">{event.organizer}</p>
            <p className="event_location">{event.location}</p>
            <Link to={`/events/${event.id}`} className="read_more_btn">Read More →
            
            </Link>


        </div>
    )
}export default EventCard;