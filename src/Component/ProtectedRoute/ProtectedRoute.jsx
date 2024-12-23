import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("Authorization");
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`http://verse-api-taupe.vercel.app/user/findById`, {
                    headers: { Authorization: token },
                });
                setUserData(data);

            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!userData) {
        localStorage.removeItem("Authorization")
    }
    return userData ? children : <Navigate to="/login" />
}