



import React, { useState, useEffect } from "react";

const DoctorListComponent = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of teachers from the API
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://localhost:7150/api/Doctors");
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error("Error fetching teachers:", response.status);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (teacherId) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `https://localhost:7150/api/Doctors/${teacherId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log("API Response:", response);

      if (response.ok) {
        
        setDoctors((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.id !== teacherId)
        );
       
      } else {
        console.error("Error deleting teacher:", response.status);
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleApproval = async (teacherId, approved) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `https://localhost:7150/api/Doctors/${teacherId}/approval?approved=${approved}`,
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
       
        setDoctors((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher.id === teacherId ? { ...teacher, approved } : teacher
          )
        );
       
      } else {
        console.error("Error updating teacher approval:", response.status);
      }
    } catch (error) {
      console.error("Error updating teacher approval:", error);
    }
  };

  return (
    <div className="container">
  <h1>Doctors List</h1>
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Specialization</th>
        <th>Approved</th>
        <th style={{ width: "30%" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {doctors.map((doctor) => (
        <tr key={doctor.id}>
          <td>
            <img
              src={"https://localhost:7150/Images/"+doctor.imageName}
              alt="Teacher"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          </td>
          <td style={{ whiteSpace: "nowrap" }}> Dr. {doctor.name}</td>
          <td style={{ width: "25%" }}>{doctor.specialization}</td>
          <td>{doctor.approved ? "Yes" : "No"}</td>
          <td>
            <div className="btn-group">
              {doctor.approved ? (
                <button
                  className="btn btn-danger"
                  onClick={() => handleApproval(doctor.id, false)}
                >
                  Reject
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => handleApproval(doctor.id, true)}
                >
                  Approve
                </button>
              )}
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(doctor.id)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


  
  );
};

export default DoctorListComponent;



