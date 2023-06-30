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

const AdminComponent = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch the list of teachers pending approval from the API
    const fetchPendingTeachers = async () => {
      try {
        const response = await fetch("https://localhost:7185/api/Teachers?approved=false");
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
        `https://localhost:7185/api/Teachers/${teacherId}/approval?approved=${approved}`,
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
      <h1>Pending Teachers</h1>
      {teachers.map((teacher) => (
        <div key={teacher.id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{teacher.name}</h3>
            <p className="card-text">{teacher.description}</p>
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
      ))}
    </div>
  );
};

export default AdminComponent;

