import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { useStudent } from "../context/useStudent";
import "../styles/Auth.css";

export default function Register() {
    const { user, login } = useStudent();
    const navigate = useNavigate();
    const [streams, setStreams] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [years, setYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selection, setSelection] = useState({ streamId: "", programId: "", yearId: "", semesterId: "" });
    const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        fetch(`${API_URL}/streams`).then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.message || "Could not load academic programs"); setStreams(d.streams || []); })
            .catch((e) => setError(e.message)).finally(() => setLoading(false));
    }, []);
    useEffect(() => {
        if (!selection.streamId) return;
        fetch(`${API_URL}/programs?stream_id=${encodeURIComponent(selection.streamId)}`).then((r) => r.json()).then((d) => setPrograms(d.programs || [])).catch(() => setError("Could not load departments"));
    }, [selection.streamId]);
    useEffect(() => {
        if (!selection.programId) return;
        fetch(`${API_URL}/program-years?program_id=${encodeURIComponent(selection.programId)}`).then((r) => r.json()).then((d) => setYears(d.programYears || [])).catch(() => setError("Could not load academic years"));
    }, [selection.programId]);
    useEffect(() => {
        if (!selection.yearId) return;
        fetch(`${API_URL}/semesters?program_year_id=${encodeURIComponent(selection.yearId)}`).then((r) => r.json()).then((d) => setSemesters(d.semesters || [])).catch(() => setError("Could not load semesters"));
    }, [selection.yearId]);

    function changeForm(e) { setForm((old) => ({ ...old, [e.target.name]: e.target.value })); }
    function changeSelection(key, value) {
        if (key === "streamId") { setPrograms([]); setYears([]); setSemesters([]); setSelection((old) => ({ ...old, streamId: value, programId: "", yearId: "", semesterId: "" })); }
        else if (key === "programId") { setYears([]); setSemesters([]); setSelection((old) => ({ ...old, programId: value, yearId: "", semesterId: "" })); }
        else if (key === "yearId") { setSemesters([]); setSelection((old) => ({ ...old, yearId: value, semesterId: "" })); }
        else setSelection((old) => ({ ...old, [key]: value }));
    }
    async function submit(e) {
        e.preventDefault(); setError("");
        if (form.password.length < 8) return setError("Password must be at least 8 characters.");
        if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
        if (!selection.semesterId) return setError("Select your current semester.");
        setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, programId: selection.programId, semesterId: selection.semesterId }) });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Unable to create your account");
            await login({ email: form.email.trim(), password: form.password });
            navigate("/profile", { replace: true });
        } catch (err) { setError(err.message); }
        finally { setSubmitting(false); }
    }

    if (user) return <Navigate to="/profile" replace />;
    return <main className="page_content auth-page"><section className="auth-card">
        <h1>Create your account</h1><p>Join StudentHub to access academic resources and practice materials.</p>
        {loading ? <p>Loading academic programs…</p> : <form className="auth_form" onSubmit={submit}>
            <label className="form_group">Full name<input name="fullName" autoComplete="name" required maxLength="120" value={form.fullName} onChange={changeForm} /></label>
            <label className="form_group">Email<input type="email" name="email" autoComplete="email" required maxLength="254" value={form.email} onChange={changeForm} /></label>
            <label className="form_group">Password<input type="password" name="password" autoComplete="new-password" required minLength="8" maxLength="128" value={form.password} onChange={changeForm} /><small>Use at least 8 characters.</small></label>
            <label className="form_group">Confirm password<input type="password" name="confirmPassword" autoComplete="new-password" required value={form.confirmPassword} onChange={changeForm} /></label>
            <label className="form_group">Stream<select required value={selection.streamId} onChange={(e) => changeSelection("streamId", e.target.value)}><option value="">Select your stream</option>{streams.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
            <label className="form_group">Department / Program<select required disabled={!programs.length} value={selection.programId} onChange={(e) => changeSelection("programId", e.target.value)}><option value="">Select your program</option>{programs.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
            <label className="form_group">Academic year<select required disabled={!years.length} value={selection.yearId} onChange={(e) => changeSelection("yearId", e.target.value)}><option value="">Select your year</option>{years.map((x) => <option key={x.id} value={x.id}>Year {x.year_number}</option>)}</select></label>
            <label className="form_group">Semester<select required disabled={!semesters.length} value={selection.semesterId} onChange={(e) => changeSelection("semesterId", e.target.value)}><option value="">Select your semester</option>{semesters.map((x) => <option key={x.id} value={x.id}>Semester {x.semester_number}</option>)}</select></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="auth_submit_button" disabled={submitting || loading}>{submitting ? "Creating account…" : "Create account"}</button>
        </form>}
        <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
    </section></main>;
}
