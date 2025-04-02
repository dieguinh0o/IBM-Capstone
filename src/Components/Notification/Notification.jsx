import React, { useEffect, useState } from 'react';
import "./Notification.css"; 
import Navbar from '../Navbar/Navbar';

export default function Notification({ children }) {
    const [appointmentData, setAppointmentData] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("AppointmentData"));
        setAppointmentData(data);
    }, []);

    function handleConfirm() {
        setAppointmentData(null);
        localStorage.removeItem("AppointmentData");
    }

    return (
        <>
            <Navbar />
            {children}
            {appointmentData && (
                <>
                    <div className="notification-overlay"></div> 
                    <div className="notification-container">
                        <p><strong>Doctor:</strong> {appointmentData.doctor.name}</p>
                        <p><strong>Speciality:</strong> {appointmentData.doctor.speciality}</p>
                        <p><strong>Patient:</strong> {appointmentData.patient.name}</p>
                        <p><strong>Phone:</strong> {appointmentData.patient.phone}</p>
                        <p><strong>Date:</strong> {appointmentData.date}</p>
                        <p><strong>Time:</strong> {appointmentData.time}</p>
                        <button onClick={handleConfirm}>Confirm Appointment</button>
                    </div>
                </>
            )}
        </>
    );
}
