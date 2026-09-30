import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useStudent } from "../context/useStudent";
import "../styles/Auth.css";

export default function Login() {
    const { user, login } = useStudent();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault(); setError(""); setSubmitting(true);
        try { await login({ email: email.trim(), password }); navigate(location.state?.from || "/profile", { replace: true }); }
        catch (err) { setError(err.message); }
        finally { setSubmitting(false); }
    }
    if (user) return <Navigate to="/profile" replace />;

    return <main className="page_content auth-page"><section className="auth-card">
        <h1>Welcome back</h1><p>Sign in to your StudentHub account.</p>
        <form className="auth_form" onSubmit={handleSubmit}>
            <label className="form_group">Email<input type="email" autoComplete="email" required maxLength="254" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label className="form_group">Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="auth_submit_button" disabled={submitting}>{submitting ? "Signing in…" : "Sign In"}</button>
        </form>
        <p className="auth-switch">New to StudentHub? <Link to="/register">Create an account</Link></p>
    </section></main>;
}
