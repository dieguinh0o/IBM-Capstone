import { useState } from "react";
import "./ReviewForm.css";
import FeedbackForm from "./FeedbackForm/FeedbackForm.jsx";

export default function ReportsLayout() {
    const [reviews, setReviews] = useState([
        { id: 1, name: "Dr. John Smith", speciality: "Dentist", feedback: "" },
        { id: 2, name: "Dr. Alice Johnson", speciality: "Gynecologist", feedback: "" },
        { id: 3, name: "Dr. Michael Lee", speciality: "General Physician", feedback: "" },
        { id: 3, name: "Dr. Lin Chao", speciality: "Dentist", feedback: "" }
    ]);

    const [formId, setFormId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (id, feedback) => {
        setReviews(reviews.map(review =>
            review.id === id ? { ...review, feedback } : review
        ));
        setShowForm(false); // Hide form after submission
    };

    const handleShowForm = (id) => {
        setFormId(id);
        setShowForm(true);
    };

    return (
        <>
            <div className="reports-form-container">
                <h3>Reports</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            <th>View Report</th>
                            <th>Download Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={review.id}>
                                <td>{index + 1}</td>
                                <td>{review.name}</td>
                                <td>{review.speciality}</td>
                                <td>
                                    <button 
                                        onClick={() => handleShowForm(review.id)} 
                                        disabled={!!review.feedback} // Disable if feedback exists
                                        className={review.feedback ? "disabled-btn" : ""}
                                    >
                                        {review.feedback ? "Feedback Given" : "Click Here"}
                                    </button>
                                </td>
                                <td>{review.feedback || "No review yet"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>
                        <FeedbackForm onSubmit={handleSubmit} id={formId} />
                    </div>
                </div>
            )}
        </>
    );
}
