import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { StudentProvider } from "./context/StudentProvider";
import { useStudent } from "./context/useStudent";

import Announcements from "./pages/Announcements";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Clubs from "./pages/Clubs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import AnnouncementDetails from "./pages/AnnouncementDetails";
import EventDetails from "./pages/EventDetails";
import NotFound from "./pages/NotFound";

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

function ProtectedProfile() {
    const { user, loading } = useStudent();
    const location = useLocation();
    if (loading) return <main className="page_content">Loading your account…</main>;
    return user ? <Profile /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

function App() {
    return (
        <BrowserRouter>
            <StudentProvider>
                <div className="container">
                    <Navbar />

                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/announcements"
                            element={<Announcements />}
                        />

                        <Route
                            path="/events"
                            element={<Events />}
                        />

                        <Route
                            path="/resources"
                            element={<Resources />}
                        />

                        <Route
                            path="/clubs"
                            element={<Clubs />}
                        />

                        <Route
                            path="/register"
                            element={<Register />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<ProtectedProfile />} />

                        <Route
                            path="/announcements/:id"
                            element={<AnnouncementDetails />}
                        />

                        <Route
                            path="/events/:id"
                            element={<EventDetails />}
                        />

                        <Route
                            path="*"
                            element={<NotFound />}
                        />
                    </Routes>

                    <Footer />
                </div>
            </StudentProvider>
        </BrowserRouter>
    );
}

export default App;
