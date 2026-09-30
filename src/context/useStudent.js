import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useStudent() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useStudent must be used within StudentProvider");
    return context;
}
