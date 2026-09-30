import { useCallback, useEffect, useMemo, useState } from "react";
import { API_URL, TOKEN_KEY } from "../api";
import { AuthContext } from "./AuthContext";

export function StudentProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));
    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    }, []);
    const loadUser = useCallback(async (activeToken) => {
        const response = await fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${activeToken}` } });
        if (!response.ok) throw new Error("Your session has expired. Please sign in again.");
        const data = await response.json();
        setUser(data.user);
        return data.user;
    }, []);
    useEffect(() => {
        if (!token) return;
        let alive = true;
        // The request resolves asynchronously and updates auth state from the server response.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadUser(token).catch(() => { if (alive) logout(); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [token, loadUser, logout]);
    const login = useCallback(async (credentials) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to sign in");
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
        return data.user;
    }, []);
    const updateProfile = useCallback(async (changes) => {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(changes)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not update profile");
        setUser(data.user);
        return data.user;
    }, [token]);
    const value = useMemo(() => ({ user, token, loading, login, logout, loadUser, updateProfile }), [user, token, loading, login, logout, loadUser, updateProfile]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
