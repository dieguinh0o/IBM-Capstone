import React, { useEffect, useState } from 'react';
import "./Notification.css"; 
import Navbar from '../Navbar/Navbar';

export default function Notification({children}) {
    const [appointmentData, setAppointmentData] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("AppointmentData"));
        if (data) {
            setAppointmentData(data);
        }
    }, []);

    function handleCancel() {
        setAppointmentData(null);
        localStorage.removeItem("AppointmentData");
    }

    if (!appointmentData) return null; // Don't render if no appointment

    return (
        <>
        <Navbar></Navbar>
        {children}
        <div className="notification-container">
            <p><strong>Doctor:</strong> {appointmentData.doctor.name}</p>
            <p><strong>Speciality:</strong> {appointmentData.doctor.speciality}</p>
            <p><strong>Patient:</strong> {appointmentData.patient.name}</p>
            <p><strong>Phone:</strong> {appointmentData.patient.phone}</p>
            <p><strong>Date:</strong> {appointmentData.date}</p>
            <p><strong>Time:</strong> {appointmentData.time}</p>
            <button onClick={handleCancel}>Cancel Appointment</button>
        </div>
        </>
    );
}
