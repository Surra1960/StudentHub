import React from 'react';
import  Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnnouncementsSection from './components/AnnouncementsSection';
import Footer from './components/Footer'; 
import StudentContext from './context/StudentContext';

import Announcements from './pages/Announcements';
import Events from './pages/Events';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Clubs from './pages/Clubs';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(){
  return(
    <BrowserRouter>
    <StudentContext.Provider value={{studentName:"Surraa",university:"Addis Ababa University", year:2026}}>
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/announcements" element={<Announcements/>}/>
        <Route path='/events' element={<Events/>} />
        <Route path="/resources" element={<Resources/>} />
        <Route path="/clubs" element={<Clubs/>} />
      </Routes>
       <Footer/>
    </div>
    </StudentContext.Provider>
    </BrowserRouter>
  )
}
export default App;