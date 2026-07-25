
import { useContext } from "react";
import Hero from "../components/Hero";
import AnnouncementsSection from "../components/AnnouncementsSection";
import StudentContext from "../context/StudentContext";



function Home(){
    const student = useContext(StudentContext);

    return (
        <div className="page_content">
            <section className="home_intro">
                <p className="welcome_subtitle">Welcome back, {student?.studentName}. Your university is {student?.university}.</p>
            </section>
            <Hero/>
            <AnnouncementsSection/>
        </div>
    )
}

export default Home;