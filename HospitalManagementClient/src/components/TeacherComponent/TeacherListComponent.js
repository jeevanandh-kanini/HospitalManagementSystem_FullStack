// import React, { useState, useEffect } from "react";

// const TeacherListComponent = () => {
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     // Fetch the list of teachers from the API
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           console.error("Error fetching teachers:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleDelete = async (teacherId) => {
//     try {
//       const token = sessionStorage.getItem("token");

//       const response = await fetch(
//         `https://localhost:7185/api/Teachers/${teacherId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the bearer token in the Authorization header
//           },
//         }
//       );

//       console.log("API Response:", response);

//       if (response.ok) {
//         // Remove the deleted teacher from the list
//         setTeachers((prevTeachers) =>
//           prevTeachers.filter((teacher) => teacher.id !== teacherId)
//         );
//         // Display a success message
//       } else {
//         console.error("Error deleting teacher:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting teacher:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>All Teachers</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Approved</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.id}>
//               <td>{teacher.name}</td>
//               <td>{teacher.description}</td>
//               <td>{teacher.approved ? "Yes" : "No"}</td>
//               <td>
//                 <button onClick={() => handleDelete(teacher.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TeacherListComponent;




// import React, { useState, useEffect } from "react";

// const TeacherListComponent = () => {
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     // Fetch the list of teachers from the API
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           console.error("Error fetching teachers:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleDelete = async (teacherId) => {
//     try {
//       const token = sessionStorage.getItem("token");

//       const response = await fetch(
//         `https://localhost:7185/api/Teachers/${teacherId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the bearer token in the Authorization header
//           },
//         }
//       );

//       console.log("API Response:", response);

//       if (response.ok) {
//         // Remove the deleted teacher from the list
//         setTeachers((prevTeachers) =>
//           prevTeachers.filter((teacher) => teacher.id !== teacherId)
//         );
//         // Display a success message
//       } else {
//         console.error("Error deleting teacher:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting teacher:", error);
//     }
//   };

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
//         // Update the approved status of the teacher in the list
//         setTeachers((prevTeachers) =>
//           prevTeachers.map((teacher) =>
//             teacher.id === teacherId ? { ...teacher, approved } : teacher
//           )
//         );
//         // Display a success message
//       } else {
//         console.error("Error updating teacher approval:", response.status);
//       }
//     } catch (error) {
//       console.error("Error updating teacher approval:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>All Teachers</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Approved</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.id}>
//               <td>{teacher.name}</td>
//               <td>{teacher.description}</td>
//               <td>{teacher.approved ? "Yes" : "No"}</td>
//               <td>
//                 <button onClick={() => handleApproval(teacher.id, true)}>
//                   Approve
//                 </button>
//                 <button onClick={() => handleApproval(teacher.id, false)}>
//                   Reject
//                 </button>
//                 <button onClick={() => handleDelete(teacher.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TeacherListComponent;




// import React, { useState, useEffect } from "react";

// const TeacherListComponent = () => {
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     // Fetch the list of teachers from the API
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           console.error("Error fetching teachers:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleDelete = async (teacherId) => {
//     try {
//       const token = sessionStorage.getItem("token");

//       const response = await fetch(
//         `https://localhost:7185/api/Teachers/${teacherId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the bearer token in the Authorization header
//           },
//         }
//       );

//       console.log("API Response:", response);

//       if (response.ok) {
//         // Remove the deleted teacher from the list
//         setTeachers((prevTeachers) =>
//           prevTeachers.filter((teacher) => teacher.id !== teacherId)
//         );
//         // Display a success message
//       } else {
//         console.error("Error deleting teacher:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting teacher:", error);
//     }
//   };

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
//         // Update the approved status of the teacher in the list
//         setTeachers((prevTeachers) =>
//           prevTeachers.map((teacher) =>
//             teacher.id === teacherId ? { ...teacher, approved } : teacher
//           )
//         );
//         // Display a success message
//       } else {
//         console.error("Error updating teacher approval:", response.status);
//       }
//     } catch (error) {
//       console.error("Error updating teacher approval:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>All Teachers</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Approved</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.id}>
//               <td>{teacher.name}</td>
//               <td>{teacher.description}</td>
//               <td>{teacher.approved ? "Yes" : "No"}</td>
//               <td>
//                 {teacher.approved ? (
//                   <button onClick={() => handleApproval(teacher.id, false)}>
//                     Reject
//                   </button>
//                 ) : (
//                   <button onClick={() => handleApproval(teacher.id, true)}>
//                     Approve
//                   </button>
//                 )}
//                 <button onClick={() => handleDelete(teacher.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TeacherListComponent;




import React, { useState, useEffect } from "react";

const TeacherListComponent = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch the list of teachers from the API
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://localhost:7150/api/Doctors");
        if (response.ok) {
          const data = await response.json();
          setTeachers(data);
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
        
        setTeachers((prevTeachers) =>
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
       
        setTeachers((prevTeachers) =>
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
      {teachers.map((teacher) => (
        <tr key={teacher.id}>
          <td>
            <img
              src={"https://localhost:7150/Images/"+teacher.imageName}
              alt="Teacher"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          </td>
          <td style={{ whiteSpace: "nowrap" }}>{teacher.name}</td>
          <td style={{ width: "25%" }}>{teacher.specialization}</td>
          <td>{teacher.approved ? "Yes" : "No"}</td>
          <td>
            <div className="btn-group">
              {teacher.approved ? (
                <button
                  className="btn btn-danger"
                  onClick={() => handleApproval(teacher.id, false)}
                >
                  Reject
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => handleApproval(teacher.id, true)}
                >
                  Approve
                </button>
              )}
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(teacher.id)}
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

export default TeacherListComponent;



