import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './FindDoctorSearch.css'
import DoctorCard from "../DoctorCard/DoctorCard.jsx"

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

export default function FindDoctorSearch() {
    const [hideDropdown, setHideDropdown] = useState(true);
    const [specialities, setSpecialities] = useState(initSpeciality);
    const [searchDoctors, setSearchDoctors] = useState('');
    const navigate = useNavigate();

    function handleDoctorSelect(value) {
        setSearchDoctors(value);
    }


    return (
        <div className="consultationpage-container">
            <div className="doctorsearch-container">
                <div className="search-container">
                    <div>
                    <input type="text" className="search-bar" placeholder="Search for doctors" value = {searchDoctors} onChange={(e) => setSearchDoctors(e.target.value)} onFocus={() => setHideDropdown(false)} onBlur={() => setHideDropdown(true)}/>
                    <button>Find Doctor</button>
                    </div>
                    <div className="autofill-dropdown-container" hidden={hideDropdown}>
                        {specialities.map(speciality => 
                            <div className="dropdownItem" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                <p>{speciality}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        <div className="searchresults-container">
            <h3>8 doctors available</h3>
            <p>Book appointments with minimum effort.</p>
            <DoctorCard />
        </div>
        </div>
    )
}