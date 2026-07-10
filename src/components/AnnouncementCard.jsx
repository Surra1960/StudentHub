

function AnnouncementCard(props){

    return (
        <div className="Announcement_card">

            <h3> {props.title} </h3>
            <p> {props.category} </p>
            <p> {props.date} </p>
            <p> {props.description} </p>
        </div>
    )

}

export default AnnouncementCard;