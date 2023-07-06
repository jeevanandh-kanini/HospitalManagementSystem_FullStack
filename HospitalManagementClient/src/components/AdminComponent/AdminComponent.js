import React, { useState, useEffect } from "react";
import './AdminComponent.css'

const AdminComponent = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors pending approval from the API
    
    const fetchPendingDoctors = async () => {
      try {
        const response = await fetch("https://localhost:7150/api/Doctors?approved=false");
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error("Error fetching pending doctors:", response.status);
        }
      } catch (error) {
        console.error("Error fetching pending doctors:", error);
      }
    };

    fetchPendingDoctors();
  }, []);

  const handleApproval = async (doctorId, approved) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `https://localhost:7150/api/Doctors/${doctorId}/approval?approved=${approved}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({ approved }),
        }
      );

      console.log("API Response:", response);

      if (response.ok) {
        
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor.id !== doctorId)
        );
        
      } else {
        console.error("Error approving teacher:", response.status);
      }
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  return (
    <div className="container">
  <h1>Pending Approval</h1>
  <div className="row">
    {doctors.map((doctor) => (
      <div key={doctor.id} className="col-md-4">
        <div className="card mb-3">
          <div className="card-body">
            <div className="teacher-info">
              <img
                src={"https://localhost:7150/Images/" + doctor.imageName}
                alt="Teacher Profile"
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              />
              <div className="teacher-details">
                <h3 className="card-title">Dr. {doctor.name}</h3>
                <p className="card-text">{doctor.specialization}</p>
               
              </div>
            </div>
            <div className="teacher-actions">
              <button
                className="btn btn-success mr-2"
                onClick={() => handleApproval(doctor.id, true)}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleApproval(doctor.id, false)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default AdminComponent;

