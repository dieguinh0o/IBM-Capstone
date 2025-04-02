import React, { useEffect, useState } from 'react';
import "./Notification.css"; 
import Navbar from '../Navbar/Navbar';

export default function Notification({ children }) {
    const [appointmentData, setAppointmentData] = useState(() => {
        return JSON.parse(localStorage.getItem("AppointmentData")) || null;
    });

    // Effect to detect changes in localStorage (within the same tab)
    useEffect(() => {
        const updateData = () => {
            setAppointmentData(JSON.parse(localStorage.getItem("AppointmentData")) || null);
        };

        // Listen for local storage updates (same tab)
        const interval = setInterval(updateData, 500);

        // Listen for storage updates (cross-tab)
        const handleStorageChange = (event) => {
            if (event.key === "AppointmentData") {
                updateData();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            clearInterval(interval);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    function handleCancel() {
        localStorage.removeItem("AppointmentData");
        setAppointmentData(null);

        // Manually trigger storage event for cross-tab updates
        window.dispatchEvent(new StorageEvent("storage", { key: "AppointmentData", newValue: null }));
    }

    return (
        <>
            <Navbar />
            {children}
            {appointmentData && (
                <div className="notification-container">
                    <p><strong>Doctor:</strong> {appointmentData.doctor.name}</p>
                    <p><strong>Speciality:</strong> {appointmentData.doctor.speciality}</p>
                    <p><strong>Patient:</strong> {appointmentData.patient.name}</p>
                    <p><strong>Phone:</strong> {appointmentData.patient.phone}</p>
                    <p><strong>Date:</strong> {appointmentData.date}</p>
                    <p><strong>Time:</strong> {appointmentData.time}</p>
                    <button onClick={handleCancel}>Cancel Appointment</button>
                </div>
            )}
        </>
    );
}
