import { useState } from "react";
import "./ReviewForm.css";

export default function ReviewForm() {
    const [reviews, setReviews] = useState([
        { id: 1, name: "Dr. John Smith", speciality: "Dentist", feedback: "" },
        { id: 2, name: "Dr. Alice Johnson", speciality: "Gynecologist", feedback: "" },
        { id: 3, name: "Dr. Michael Lee", speciality: "General Physician", feedback: "" },
    ]);

    const handleFeedbackChange = (id, value) => {
        setReviews(reviews.map(review =>
            review.id === id ? { ...review, feedback: value } : review
        ));
    };

    const handleSubmit = (id) => {
        setReviews(reviews.map(review =>
            review.id === id ? { ...review, submitted: review.feedback } : review
        ));
    };

    return (
        <div className="review-form-container">
            <h3>Reviews</h3>
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Speciality</th>
                        <th>Provide Feedback</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={review.id}>
                            <td>{index + 1}</td>
                            <td>{review.name}</td>
                            <td>{review.speciality}</td>
                            <td>
                                <button>Click Here</button>
                            </td>
                            <td>{review.submitted || "No review yet"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

