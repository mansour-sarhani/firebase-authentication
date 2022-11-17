import {  Navigate } from "react-router-dom";
import {useAuth} from "../context/AuthProvider";

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth()

    return currentUser ? children : <Navigate to="/login" />;
}
