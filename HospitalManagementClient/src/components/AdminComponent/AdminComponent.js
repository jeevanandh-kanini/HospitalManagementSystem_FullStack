// import React, { useState, useEffect } from "react";

// const AdminComponent = () => {
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     // Fetch the list of teachers pending approval from the API
//     const fetchPendingTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers?approved=false");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           console.error("Error fetching pending teachers:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching pending teachers:", error);
//       }
//     };

//     fetchPendingTeachers();
//   }, []);

 


//   const handleApproval = async (teacherId, approved) => {
//     try {
//       const token = sessionStorage.getItem("token");
  
//       const response = await fetch(
//         `https://localhost:7185/api/Teachers/${teacherId}/approval?approved=${approved}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Include the bearer token in the Authorization header
//           },
//           body: JSON.stringify({ approved }),
//         }
//       );
  
//       console.log("API Response:", response);
  
//       if (response.ok) {
//         // Remove the teacher from the pending list
//         setTeachers((prevTeachers) =>
//           prevTeachers.filter((teacher) => teacher.id !== teacherId)
//         );
//         // Display a success message
//       } else {
//         console.error("Error approving teacher:", response.status);
//       }
//     } catch (error) {
//       console.error("Error approving teacher:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Pending Teachers</h1>
//       {teachers.map((teacher) => (
//         <div key={teacher.id}>
//           <h3>{teacher.name}</h3>
//           <p>{teacher.description}</p>
//           <button onClick={() => handleApproval(teacher.id,true)}>
//             Approve
//           </button>
//           <button onClick={() => handleApproval(teacher.id,false)}>
//             Reject
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminComponent;



import React, { useState, useEffect } from "react";
import './AdminComponent.css'

const AdminComponent = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch the list of teachers pending approval from the API
    const fetchPendingTeachers = async () => {
      try {
        const response = await fetch("https://localhost:7150/api/Doctors?approved=false");
        if (response.ok) {
          const data = await response.json();
          setTeachers(data);
        } else {
          console.error("Error fetching pending teachers:", response.status);
        }
      } catch (error) {
        console.error("Error fetching pending teachers:", error);
      }
    };

    fetchPendingTeachers();
  }, []);

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
        
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.id !== teacherId)
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
    {teachers.map((teacher) => (
      <div key={teacher.id} className="col-md-4">
        <div className="card mb-3">
          <div className="card-body">
            <div className="teacher-info">
              <img
                src={"https://localhost:7150/Images/" + teacher.imageName}
                alt="Teacher Profile"
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              />
              <div className="teacher-details">
                <h3 className="card-title">Name {teacher.name}</h3>
                <p className="card-text">{teacher.specialization}</p>
                {/* <p className="card-text">{teacher.experience}</p> */}
              </div>
            </div>
            <div className="teacher-actions">
              <button
                className="btn btn-success mr-2"
                onClick={() => handleApproval(teacher.id, true)}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleApproval(teacher.id, false)}
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

