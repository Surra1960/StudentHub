
import EventCard from "../components/EventCard";
import '../styles/Events.css';
import { useState,useEffect, useMemo } from "react";



function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        fetch("http://localhost:4000/events")
            .then((response)=>{
                if(!response.ok){
                    throw new Error('Failed to fetch Events')
                }
                return response.json();
            })
            .then((data)=>{
                setEvents(data.Events);
            })
            .catch((err)=>{
                console.error(err);
                setError('Unable to load events');
            })
            .finally(
                setLoading(false)
            );
    },[]);
    useEffect(
        ()=>{
            if(!searchTerm){
                document.title='StudentHub';
            }
            else{
                document.title=`Searching: ${searchTerm}`;
            }
        },[searchTerm]
    );
       const filteredEvents = useMemo(() => {
        return events.filter((event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [events, searchTerm]);

    return (
        <div className="page_content">
            
        <header className="page_heading">
        <h1>Upcoming Events</h1>
            <p>
            Stay connected with campus activities and never miss a
                community event.
            </p>
        </header>
        <div className="events_toolbar">
            <input
            type="text"
            placeholder="Search Events...."
            className="input_field"
            onChange={(e)=>setSearchTerm(e.target.value)}
            value={searchTerm}
            />
        </div>
        <section className="event_summary">
            {
                loading ?(<h2>Loading Events...</h2>):error?(<h2>{error}</h2>):events.length===0 ?(<h2> There are no events currently</h2>):filteredEvents.length===0?(<h2>No events match your search.</h2>):
                filteredEvents.map((event)=>(
                    <EventCard event={event} key={event.id}/>
                ))
            }
        </section>
  
        </div>
    );
}

export default Events;