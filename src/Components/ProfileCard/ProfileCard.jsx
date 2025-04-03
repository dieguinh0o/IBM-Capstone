import "./ProfileCard.css";

export default function ProfileCard({ position }) {
    return (
        <div 
            className="profilecard-container" 
            style={{ top: position.top, left: position.left }}
        >
            <ul className="profilecard-menu">
                <li>View Profile</li>
                <li>Settings</li>
                <li>Help</li>
                <li>Logout</li>
            </ul>
        </div>
    );
}
