
import AnnouncementCard from "./AnnouncementCard";
import {useState} from 'react';
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
    const [searchTerm, setSearchTerm]=useState("");

    const [showAcademicOnly, setShowAcademicOnly]=useState(false);
    

    const filteredAnnouncements=announcements.filter((announcement)=>announcement.title.toLowerCase().includes(searchTerm.toLowerCase())|| announcement.category.toLowerCase().includes(searchTerm.toLowerCase())||announcement.description.toLowerCase().includes(searchTerm.toLowerCase()))
    
   const  checkAcademicStatus=()=> {
    setShowAcademicOnly(!showAcademicOnly);
    }
  const displayedAnnouncements=showAcademicOnly?filteredAnnouncements.filter((announcement=>announcement.category==='Academic')):filteredAnnouncements;
  

    return (
        <div className="Announcements_container">
            <h2>Latest Announcements</h2>
            <p> Stay updated with the latest campus news, academic announcements, and important university notices </p>
          <input type="text" placeholder="search Announcements..." className="input_field" 
          onChange={(e)=>setSearchTerm(e.target.value)}
          value={searchTerm}>

          </input>
        
          <button className="academic_announcemtns" onClick={checkAcademicStatus}>show academic Only</button>
          <h3>Showing {displayedAnnouncements.length} Announcements</h3>
            <div className="card_container">
          {
            announcements.length===0 ? (<h2>There are currently no announcements to display.</h2>):
            filteredAnnouncements.length===0? (<h2>No announcements match your search.</h2>):
            (displayedAnnouncements.map((announcement) => (
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