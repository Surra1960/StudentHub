import React from 'react';
import  Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnnouncementsSection from './components/AnnouncementsSection';
import Footer from './components/Footer'; 

function App(){
  return(
    <div className='container'>
      <Navbar/>
      <Hero/>
      <AnnouncementsSection/> 
       <Footer/>
    </div>
  )
}
export default App;