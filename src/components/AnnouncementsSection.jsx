
import AnnouncementCard from "./AnnouncementCard";
function AnnouncementsSection(){

    const announcements=[
        {
         id:1, title:"Midterm Examination Schedule", category:"Academic", date:"July 10, 2026",
         description:"Midterm exams will begin on July 10. Students are advised to check their department schedule."
        },
        {
         id:2, title:"Programming Club Recruitment", category:"Club",   date:"July 12, 2026", description:"The Programming Club is recruiting new members. Students interested in coding, software development, and technology are encouraged to register and attend the orientation session."
        },
        {
        id:3, title:"University Football Tournament", category:"Sports",   date:"July 15, 2026", description:"The annual university football tournament will kick off on July 15. Students are invited to support their departments and enjoy the exciting matches throughout the competition."
        }
    ]

    return (
        <div className="Announcements_container">
            <h2>Latest Announcements</h2>
            <p> Stay updated with the latest campus news, academic announcements, and important university notices </p>
            <div className="card_container">
            {announcements.length===0 ? (<h2>There are currently no announcements to display.</h2>):
            (announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            title={announcement.title}
            category={announcement.category}
            date={announcement.date}
            description={announcement.description}
          />)))}
           </div>
           </div> 
    )

}
  export default AnnouncementsSection;