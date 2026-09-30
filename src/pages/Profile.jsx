import { useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../api";
import { useStudent } from "../context/useStudent";
import "../styles/Auth.css";

export default function Profile() {
    const { user, loading, logout, updateProfile } = useStudent();
    const [fullName, setFullName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [saving, setSaving] = useState(false);
    if (loading) return <main className="page_content">Loading your profile…</main>;
    if (!user) return <Navigate to="/login" replace state={{ from: "/profile" }} />;
    const image = user.profileImageUrl && (user.profileImageUrl.startsWith("http") ? user.profileImageUrl : `${API_URL}${user.profileImageUrl}`);
    return <main className="page_content profile-page"><section className="auth-card profile-card">
        <div className="profile-heading">{image ? <img className="profile-avatar" src={image} alt="Profile" /> : <div className="profile-avatar profile-placeholder" aria-hidden="true">{user.fullName?.charAt(0)?.toUpperCase()}</div>}
            <div><h1>{user.fullName}</h1><p>{user.email}</p></div></div>
        <dl className="profile-details"><div><dt>Role</dt><dd>{user.role}</dd></div><div><dt>Program</dt><dd>{user.programName || "Not available"}</dd></div><div><dt>Academic year</dt><dd>{user.yearNumber ? `Year ${user.yearNumber}` : "Not available"}</dd></div><div><dt>Semester</dt><dd>{user.semesterNumber ? `Semester ${user.semesterNumber}` : "Not available"}</dd></div><div><dt>Stream</dt><dd>{user.streamName || "Not available"}</dd></div></dl>
        <form className="auth_form profile-edit" onSubmit={async (event) => {
            event.preventDefault(); setError(""); setNotice(""); setSaving(true);
            const changes = {};
            if (fullName.trim()) changes.fullName = fullName.trim();
            if (imageUrl.trim()) changes.profileImageUrl = imageUrl.trim();
            if (!Object.keys(changes).length) { setError("Enter a new name or image URL."); setSaving(false); return; }
            try { await updateProfile(changes); setFullName(""); setImageUrl(""); setNotice("Profile updated."); }
            catch (err) { setError(err.message); }
            finally { setSaving(false); }
        }}>
            <h2>Edit profile</h2>
            <label className="form_group">Full name<input value={fullName} maxLength="120" onChange={(e) => setFullName(e.target.value)} placeholder={user.fullName} /></label>
            <label className="form_group">Profile picture URL<input type="url" value={imageUrl} maxLength="2048" onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" /></label>
            <small>Use an image hosted at an HTTP or HTTPS address.</small>
            {error && <p className="auth-error" role="alert">{error}</p>}{notice && <p className="auth-success" role="status">{notice}</p>}
            <button className="auth_submit_button" disabled={saving}>{saving ? "Saving…" : "Save profile"}</button>
        </form>
        <button className="Navlogin_button" onClick={logout}>Log out</button>
    </section></main>;
}
