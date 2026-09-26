
import { useParams, Link } from "react-router-dom";
import "../styles/EventDetails.css";
import { useEffect,useState } from "react";


function EventDetails(){
    const { id } = useParams();
     const [error, setError] = useState("");
    const [event, setEvent]=useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(
        ()=>{
            fetch(`http://localhost:4000/events/${id}`)
                .then(response=>{
                    if(!response.ok){
                        throw new Error('Failed to Fetch the Event');
                    }
                    return response.json();
                   
                })
                .then(data=>{
                    setEvent(data.event)
                })
                .catch((err) =>{
                     console.error(err);
                    setError('Unable to load the event')
                })
                .finally(
                 () =>{  setLoading(false)}
                );
        },[id])

        
    if(loading){
        return (
            <div className="page_content">
                <h1>Loading Event...</h1>
            </div>
        );
    }
    if(error){
        return (
            <div className="page_content">
                <h1>{error}</h1>
                <Link to="/events">Back to Events</Link>
            </div>
        );
    }
        if (!event) {
        return (
            <div className="page_content">
                <h1>Event not found</h1>
                <p>The requested Event does not exist or may have been removed.</p>
                <Link to="/events">Back to Events</Link>
            </div>
        );
    }

    return (
        <div className="page_content">
            <article className="event_details">
                <h1>{event.title}</h1>
                <div className="event_meta">
                    <span>{event.category}</span>
                    <span>{event.date}</span>
                </div>

                <p>{event.description}</p>
                {
                    event.image_url &&(
                          <img src={event.image_url}
                           alt={event.title} />
                    )
                }
               
                 <p>Location :{event.location}</p>
                  <p>Organizer : {event.organizer}</p>
                <Link to="/events">← Back to Events</Link>
            </article>
        </div>
    );
}

export default EventDetails;