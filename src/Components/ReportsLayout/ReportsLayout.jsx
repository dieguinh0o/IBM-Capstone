import { useState } from "react";
import "./ReportsLayout.css";

export default function ReportsLayout() {
    const [reports, setReports] = useState([
        { id: 1, name: "Dr. John Smith", speciality: "Dentist", report: "" },
        { id: 2, name: "Dr. Alice Johnson", speciality: "Gynecologist", report: "" },
        { id: 3, name: "Dr. Michael Lee", speciality: "General Physician", report: "" },
        { id: 4, name: "Dr. Lin Chao", speciality: "Dentist", report: "" } // Fixed duplicate ID
    ]);

    const [reportId, setReportId] = useState(null);
    const [showReport, setShowReport] = useState(false);

    const handleSubmit = (id, newReport) => {
        setReports(reports.map(report =>
            report.id === id ? { ...report, report: newReport } : report
        ));
        setShowReport(false);
    };

    const handleShowReport = (id) => {
        setReportId(id);
        setShowReport(true);
    };

    const handleDownloadReport = (id) => {
        alert(`Downloading report for Doctor ID: ${id}`);
        // Implement actual download logic here
    };

    return (
        <>
            <div className="reports-container">
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
                        {reports.map((report, index) => (
                            <tr key={report.id}>
                                <td>{index + 1}</td>
                                <td>{report.name}</td>
                                <td>{report.speciality}</td>
                                <td>
                                    <button onClick={() => handleShowReport(report.id)}>
                                        View Report
                                    </button>
                                </td>
                                <td> 
                                    <a href="/DoctorReport.pdf" download="DoctorReport">
                                    <button>
                                        Download Report
                                    </button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup Modal */}
            {showReport && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowReport(false)}>✖</button>
                        <iframe src='/DoctorReport.pdf' width='100%' height='500px' />
                    </div>
                </div>
            )}
        </>
    );
}
