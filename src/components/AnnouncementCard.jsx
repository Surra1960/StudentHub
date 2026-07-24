
import "./AnnouncementCard.css"
function AnnouncementCard(props){

    return (
        <div className="announcement_card">

    <div className="card_header">
        <span className="card_category">{props.category}</span>
        <span className="card_date">{props.date}</span>
    </div>

    <h3 className="card_title">{props.title}</h3>

    <p className="card_description">
        {props.description}
    </p>

    <button className="read_more_btn">
        Read More →
    </button>

</div>
    )

}

export default AnnouncementCard;