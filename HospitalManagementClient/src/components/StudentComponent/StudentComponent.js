// import React, { useState, useEffect } from "react";

// const StudentComponent = () => {
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     // Fetch the list of approved teachers from the API
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers?approved=true");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           throw new Error("Error fetching teachers");
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   return (
//     <div>
//       <h1>Approved Teachers</h1>
//       {teachers.map((teacher) => (
//         <div key={teacher.id}>
//           <h3>{teacher.name}</h3>
//           <p>{teacher.description}</p>
//           {/* Add more teacher details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentComponent;


// import React, { useState, useEffect } from "react";

// const StudentComponent = () => {
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     // Fetch the list of approved teachers from the API
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers?approved=true");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           throw new Error("Error fetching teachers");
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   return (
//     <div className="container">
//       <h1>Approved Teachers</h1>
//       {teachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentComponent;


// import React, { useState, useEffect } from "react";

// const StudentComponent = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeacherId, setSelectedTeacherId] = useState(null);

//   let [sid,setSid] =useState(sessionStorage.getItem('id'));

//   useEffect(() => {
//     // Fetch the list of approved teachers from the API
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers?approved=true");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           throw new Error("Error fetching teachers");
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleAddTeacher = async () => {
//     if (selectedTeacherId) {
//       try {
//         const response = await fetch(`https://localhost:7185/api/Student/addTeacher/${sid}?teacherId=${selectedTeacherId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
        

//         if (response.ok) {
          

//           console.log("Teacher added successfully");
//         } else {
//           throw new Error("Error adding teacher");
//         }
//       } catch (error) {
//         console.error("Error adding teacher:", error);
//       }
//     } else {
//       console.error("No teacher selected");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Approved Teachers</h1>
//       {teachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//           </div>
//         </div>
//       ))}

//       <div className="mt-3">
//         <h2>Add Teacher to Student</h2>
//         <div className="form-group">
//           <label htmlFor="teacherSelect">Select Teacher:</label>
//           <select id="teacherSelect" className="form-control" onChange={(e) => setSelectedTeacherId(e.target.value)}>
//             <option value="">Select Teacher</option>
//             {teachers.map((teacher) => (
//               <option key={teacher.id} value={teacher.id}>
//                 {teacher.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button className="btn btn-primary" onClick={handleAddTeacher}>
//           Add Teacher
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentComponent;




// import React, { useState, useEffect } from "react";

// const SelectedTeachersComponent = ({ selectedTeachers }) => {
//   return (
//     <div className="container">
//       <h1>Selected Teachers</h1>
//       {selectedTeachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const StudentComponent = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeacherId, setSelectedTeacherId] = useState(null);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);
//   let [sid, setSid] = useState(sessionStorage.getItem("id"));

//   useEffect(() => {
//     // Fetch the list of approved teachers from the API
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers?approved=true");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           throw new Error("Error fetching teachers");
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleAddTeacher = async () => {
//     if (selectedTeacherId) {
//       try {
//         const response = await fetch(`https://localhost:7185/api/Student/addTeacher/${sid}?teacherId=${selectedTeacherId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           // Add the selected teacher to the list of selected teachers
//           const selectedTeacher = teachers.find((teacher) => teacher.id === selectedTeacherId);
//           if (selectedTeacher) {
//             setSelectedTeachers([...selectedTeachers, selectedTeacher]);
//           }
//           console.log("Teacher added successfully");
//         } else {
//           throw new Error("Error adding teacher");
//         }
//       } catch (error) {
//         console.error("Error adding teacher:", error);
//       }
//     } else {
//       console.error("No teacher selected");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Approved Teachers</h1>
//       {teachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//           </div>
//         </div>
//       ))}

//       <div className="mt-3">
//         <h2>Add Teacher to Student</h2>
//         <div className="form-group">
//           <label htmlFor="teacherSelect">Select Teacher:</label>
//           <select
//             id="teacherSelect"
//             className="form-control"
//             onChange={(e) => setSelectedTeacherId(e.target.value)}
//           >
//             <option value="">Select Teacher</option>
//             {teachers.map((teacher) => (
//               <option key={teacher.id} value={teacher.id}>
//                 {teacher.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button className="btn btn-primary" onClick={handleAddTeacher}>
//           Add Teacher
//         </button>
//       </div>

//       {/* Render the SelectedTeachersComponent and pass the selectedTeachers as a prop */}
//       <SelectedTeachersComponent selectedTeachers={selectedTeachers} />
//     </div>
//   );
// };

// export default StudentComponent;








// import React, { useEffect, useState } from "react";

// const SelectedTeachersComponent = ({ selectedTeachers }) => {
//   return (
//     <div className="container">
//       <h1>Selected Teachers</h1>
//       {selectedTeachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const StudentComponent = () => {
//   const [student, setStudent] = useState(null);
//   let [sid, setSid] = useState(sessionStorage.getItem("id"));

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const response = await fetch(`https://localhost:7185/api/Student/${sid}`);
//         if (response.ok) {
//           const data = await response.json();
//           setStudent(data);
//         } else {
//           throw new Error("Error fetching student details");
//         }
//       } catch (error) {
//         console.error("Error fetching student details:", error);
//       }
//     };

//     fetchStudent();
//   }, []);

//   const handleAddTeacher = async (selectedTeacherId) => {
//     if (selectedTeacherId) {
//       try {
//         const response = await fetch(
//           `https://localhost:7185/api/Student/addTeacher/${sid}?teacherId=${selectedTeacherId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.ok) {
//           const updatedStudent = { ...student };
//           const newTeacherResponse = await fetch(`https://localhost:7185/api/Teachers/${selectedTeacherId}`);
//           if (newTeacherResponse.ok) {
//             const newTeacher = await newTeacherResponse.json();
//             updatedStudent.teachers.push(newTeacher);
//             setStudent(updatedStudent);
//           } else {
//             throw new Error("Error fetching new teacher");
//           }

//           console.log("Teacher added successfully");
//         } else {
//           throw new Error("Error adding teacher");
//         }
//       } catch (error) {
//         console.error("Error adding teacher:", error);
//       }
//     } else {
//       console.error("No teacher selected");
//     }
//   };

//   return (
//     <div className="container">
//       {student && (
//         <>
//           <h1>Approved Teachers</h1>
//           {student.teachers.map((teacher) => (
//             <div key={teacher.id} className="card mb-3">
//               <div className="card-body">
//                 <h3 className="card-title">{teacher.name}</h3>
//                 <p className="card-text">{teacher.description}</p>
//                 {/* Add more teacher details as needed */}
//               </div>
//             </div>
//           ))}

//           <div className="mt-3">
//             <h2>Add Teacher to Student</h2>
//             <div className="form-group">
//               <label htmlFor="teacherSelect">Select Teacher:</label>
//               <select
//                 id="teacherSelect"
//                 className="form-control"
//                 onChange={(e) => handleAddTeacher(e.target.value)}
//               >
//                 <option value="">Select Teacher</option>
//                 {student.teachers.map((teacher) => (
//                   <option key={teacher.id} value={teacher.id}>
//                     {teacher.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <SelectedTeachersComponent selectedTeachers={student.teachers} />
//         </>
//       )}
//     </div>
//   );
// };

// export default StudentComponent;













// import React, { useEffect, useState } from "react";

// const SelectedTeachersComponent = ({ selectedTeachers, onRemoveTeacher }) => {
//   const handleRemoveTeacher = (teacherId) => {
//     onRemoveTeacher(teacherId);
//   };

//   return (
//     <div className="container">
//       <h1>Selected Teachers</h1>
//       {selectedTeachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//             <button className="btn btn-danger" onClick={() => handleRemoveTeacher(teacher.id)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const StudentComponent = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers?approved=true");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           throw new Error("Error fetching teachers");
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleAddTeacher = (teacherId) => {
//     const teacher = teachers.find((teacher) => teacher.id === teacherId);
//     if (teacher) {
//       setSelectedTeachers((prevTeachers) => [...prevTeachers, teacher]);
//     }
//   };

//   const handleRemoveTeacher = (teacherId) => {
//     setSelectedTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== teacherId));
//   };

//   return (
//     <div className="container">
//       <h1>Approved Teachers</h1>
//       {teachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//             <button className="btn btn-primary" onClick={() => handleAddTeacher(teacher.id)}>
//               Add Teacher
//             </button>
//           </div>
//         </div>
//       ))}

//       <SelectedTeachersComponent selectedTeachers={selectedTeachers} onRemoveTeacher={handleRemoveTeacher} />
//     </div>
//   );
// };

// export default StudentComponent;





// import React, { useEffect, useState } from "react";

// const SelectedTeachersComponent = ({ selectedTeachers, onRemoveTeacher }) => {
//   const handleRemoveTeacher = (teacherId) => {
//     onRemoveTeacher(teacherId);
//   };

//   return (
//     <div className="container">
//       <h1>Selected Teachers</h1>
//       {selectedTeachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//             <button className="btn btn-danger" onClick={() => handleRemoveTeacher(teacher.id)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const StudentComponent = () => {
//   const [student, setStudent] = useState(null);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);

//   const fetchStudent = async (studentId) => {
//     try {
//       const response = await fetch(`https://localhost:7185/api/Student/${studentId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setStudent(data);
//         setSelectedTeachers(data.teachers);
//       } else {
//         throw new Error("Error fetching student details");
//       }
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//     }
//   };

//   useEffect(() => {
//     const studentId = sessionStorage.getItem("id");
//     if (studentId) {
//       fetchStudent(studentId);
//     }
//   }, []);

//   const handleAddTeacher = (teacherId) => {
//     const teacher = student.teachers.find((teacher) => teacher.id === teacherId);
//     if (teacher) {
//       setSelectedTeachers((prevTeachers) => [...prevTeachers, teacher]);
//     }
//   };

//   const handleRemoveTeacher = async (teacherId) => {
//     try {
//       const response = await fetch(
//         `https://localhost:7185/api/Student/removeTeacher/${student.id}?teacherId=${teacherId}`,
//         {
//           method: "PUT",
//         }
//       );
  
//       if (response.ok) {
//         setSelectedTeachers((prevTeachers) =>
//           prevTeachers.filter((teacher) => teacher.id !== teacherId)
//         );
//         console.log("Teacher removed successfully");
//       } else {
//         throw new Error("Error removing teacher");
//       }
//     } catch (error) {
//       console.error("Error removing teacher:", error);
//     }
//   };

//   return (
//     <div className="container">
//       {student && (
//         <>
//           <h1>Approved Teachers</h1>
//           {student.teachers.map((teacher) => (
//             <div key={teacher.id} className="card mb-3">
//               <div className="card-body">
//                 <h3 className="card-title">{teacher.name}</h3>
//                 <p className="card-text">{teacher.description}</p>
//                 {/* Add more teacher details as needed */}
//                 <button className="btn btn-primary" onClick={() => handleAddTeacher(teacher.id)}>
//                   Add Teacher
//                 </button>
//               </div>
//             </div>
//           ))}

//           <SelectedTeachersComponent selectedTeachers={selectedTeachers} onRemoveTeacher={handleRemoveTeacher} />
//         </>
//       )}
//     </div>
//   );
// };

// export default StudentComponent;





// import React, { useEffect, useState } from "react";

// const SelectedTeachersComponent = ({ selectedTeachers, onRemoveTeacher }) => {
//   const handleRemoveTeacher = (teacherId) => {
//     onRemoveTeacher(teacherId);
//   };

//   return (
//     <div className="container">
//       <h1>Selected Teachers</h1>
//       {selectedTeachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//             <button className="btn btn-danger" onClick={() => handleRemoveTeacher(teacher.id)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const StudentComponent = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers?approved=true");
//         if (response.ok) {
//           const data = await response.json();
//           setTeachers(data);
//         } else {
//           throw new Error("Error fetching teachers");
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleAddTeacher = (teacherId) => {
//     const teacher = teachers.find((teacher) => teacher.id === teacherId);
//     if (teacher) {
//       setSelectedTeachers((prevTeachers) => [...prevTeachers, teacher]);
//     }
//   };

//   const handleRemoveTeacher = async (teacherId) => {
//     try {
//       const response = await fetch(
//         `https://localhost:7185/api/Student/removeTeacher/${sessionStorage.getItem("id")}?teacherId=${teacherId}`,
//         {
//           method: "PUT",
//         }
//       );

//       if (response.ok) {
//         setSelectedTeachers((prevTeachers) =>
//           prevTeachers.filter((teacher) => teacher.id !== teacherId)
//         );
//         console.log("Teacher removed successfully");
//       } else {
//         throw new Error("Error removing teacher");
//       }
//     } catch (error) {
//       console.error("Error removing teacher:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Approved Teachers</h1>
//       {teachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//             <button className="btn btn-primary" onClick={() => handleAddTeacher(teacher.id)}>
//               Add Teacher
//             </button>
//           </div>
//         </div>
//       ))}

//       <SelectedTeachersComponent selectedTeachers={selectedTeachers} onRemoveTeacher={handleRemoveTeacher} />
//     </div>
//   );
// };

// export default StudentComponent;





// import React, { useEffect, useState } from "react";

// const SelectedTeachersComponent = ({ selectedTeachers, onRemoveTeacher }) => {
//   const handleRemoveTeacher = (teacherId) => {
//     onRemoveTeacher(teacherId);
//   };

//   return (
//     <div className="container">
//       <h1>Selected Teachers</h1>
//       {selectedTeachers.map((teacher) => (
//         <div key={teacher.id} className="card mb-3">
//           <div className="card-body">
//             <h3 className="card-title">{teacher.name}</h3>
//             <p className="card-text">{teacher.description}</p>
//             {/* Add more teacher details as needed */}
//             <button className="btn btn-danger" onClick={() => handleRemoveTeacher(teacher.id)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const StudentComponent = () => {
//   const [selectedTeachers, setSelectedTeachers] = useState([]);
//   const [approvedTeachers, setApprovedTeachers] = useState([]);
//   const [sid,setSid] =useState();


//   const fetchSelectedTeachers = async () => {
//     try {
//       const response = await fetch(`https://localhost:7185/api/Student/${sessionStorage.getItem('id')}`);
//       if (response.ok) {
//         const data = await response.json();
//         const tdata = await data.teachers;
//         await setSelectedTeachers(tdata);
//       } else {
//         throw new Error("Error fetching selected teachers");
//       }
//     } catch (error) {
//       console.error("Error fetching selected teachers:", error);
//     }
//   };
  
  
//   useEffect(() => {

//     const setStuid = async () => {
//       await setSid(sessionStorage.getItem('id'));
//     }
    
//     const fetchSelectedTeachers = async () => {
//       try {
//         const response = await fetch(`https://localhost:7185/api/Student/${sessionStorage.getItem('id')}`);
//         if (response.ok) {
//           const data = await response.json();
//           const tdata = await data.teachers;
//           await setSelectedTeachers(tdata);
//         } else {
//           throw new Error("Error fetching selected teachers");
//         }
//       } catch (error) {
//         console.error("Error fetching selected teachers:", error);
//       }
//     };

//     const fetchApprovedTeachers = async () => {
//       try {
//         const response = await fetch("https://localhost:7185/api/Teachers?approved=true");
//         if (response.ok) {
//           const data = await response.json();
//           setApprovedTeachers(data);
//         } else {
//           throw new Error("Error fetching approved teachers");
//         }
//       } catch (error) {
//         console.error("Error fetching approved teachers:", error);
//       }
//     };
    
    
//     fetchApprovedTeachers();
//     fetchSelectedTeachers();
   
//   },[]);

  
//   const handleAddTeacher = async (teacherId) => {
//     if (teacherId) {
//       try {
//         const response = await fetch(
//           `https://localhost:7185/api/Student/addTeacher/${sessionStorage.getItem('id')}?teacherId=${teacherId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
  
//         if (response.ok) {
         
//           fetchSelectedTeachers();
//           console.log("Teacher added successfully");
//         } else {
//           throw new Error("Error adding teacher");
//         }
//       } catch (error) {
//         console.error("Error adding teacher:", error);
//       }
//     } else {
//       console.error("No teacher selected");
//     }
//   };

//   const handleRemoveTeacher = async (teacherId) => {
//     try {
//       const response = await fetch(
//         `https://localhost:7185/api/Student/removeTeacher/${sessionStorage.getItem('id')}?teacherId=${teacherId}`,
//         {
//           method: "PUT",
//         }
//       );

//       if (response.ok) {
//         setSelectedTeachers((prevTeachers) =>
//           prevTeachers.filter((teacher) => teacher.id !== teacherId)
//         );
//         console.log("Teacher removed successfully");
//       } else {
//         throw new Error("Error removing teacher");
//       }
//     } catch (error) {
//       console.error("Error removing teacher:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <>
//         <h1>Approved Teachers</h1>
//         {approvedTeachers.map((teacher) => (
//           <div key={teacher.id} className="card mb-3">
//             <div className="card-body">
//               <h3 className="card-title">{teacher.name}</h3>
//               <p className="card-text">{teacher.description}</p>
//               {/* Add more teacher details as needed */}
//               <button className="btn btn-primary" onClick={() => handleAddTeacher(teacher.id)}>
//                 Add Teacher
//               </button>
//             </div>
//           </div>
//         ))}

//         <SelectedTeachersComponent selectedTeachers={selectedTeachers} onRemoveTeacher={handleRemoveTeacher} />
//       </>
//     </div>
//   );
// };

// export default StudentComponent;




import React, { useEffect, useState } from "react";

const SelectedTeachersComponent = ({ selectedTeachers, onRemoveTeacher }) => {
  const handleRemoveTeacher = (teacherId) => {
    onRemoveTeacher(teacherId);
  };

  return (
    <div className="container">
      <h1>Selected Teachers</h1>
      {selectedTeachers.map((teacher) => (
        <div key={teacher.id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{teacher.name}</h3>
            <p className="card-text">{teacher.description}</p>
            {/* Add more teacher details as needed */}
            <button className="btn btn-danger" onClick={() => handleRemoveTeacher(teacher.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const StudentComponent = () => {
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [approvedTeachers, setApprovedTeachers] = useState([]);
  const [sid, setSid] = useState();

  const fetchSelectedTeachers = async () => {
    try {
      const response = await fetch(`https://localhost:7185/api/Student/${sessionStorage.getItem("id")}`);
      if (response.ok) {
        const data = await response.json();
        const tdata = await data.teachers;
        setSelectedTeachers(tdata);
      } else {
        throw new Error("Error fetching selected teachers");
      }
    } catch (error) {
      console.error("Error fetching selected teachers:", error);
    }
  };

  useEffect(() => {
    const setStuid = async () => {
      await setSid(sessionStorage.getItem("id"));
    };

    const fetchSelectedTeachers = async () => {
      try {
        const response = await fetch(`https://localhost:7185/api/Student/${sessionStorage.getItem("id")}`);
        if (response.ok) {
          const data = await response.json();
          const tdata = await data.teachers;
          setSelectedTeachers(tdata);
        } else {
          throw new Error("Error fetching selected teachers");
        }
      } catch (error) {
        console.error("Error fetching selected teachers:", error);
      }
    };

    const fetchApprovedTeachers = async () => {
      try {
        const response = await fetch("https://localhost:7185/api/Teachers?approved=true");
        if (response.ok) {
          const data = await response.json();
          setApprovedTeachers(data);
        } else {
          throw new Error("Error fetching approved teachers");
        }
      } catch (error) {
        console.error("Error fetching approved teachers:", error);
      }
    };

    fetchApprovedTeachers();
    fetchSelectedTeachers();
  }, []);

  const handleAddTeacher = async (teacherId) => {
    if (teacherId) {
      try {
        const response = await fetch(
          `https://localhost:7185/api/students/${sessionStorage.getItem("id")}/teachers/${teacherId}`,
          // `https://localhost:7185/api/Student/addTeacher/${sessionStorage.getItem("id")}?teacherId=${teacherId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          fetchSelectedTeachers();
          console.log("Teacher added successfully");
        } else {
          throw new Error("Error adding teacher");
        }
      } catch (error) {
        console.error("Error adding teacher:", error);
      }
    } else {
      console.error("No teacher selected");
    }
  };

  const handleRemoveTeacher = async (teacherId) => {
    try {
      const response = await fetch(
        `https://localhost:7185/api/students/${sessionStorage.getItem("id")}/teachers/${teacherId}`,
        // `https://localhost:7185/api/Student/removeTeacher/${sessionStorage.getItem("id")}?teacherId=${teacherId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSelectedTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== teacherId));
        console.log("Teacher removed successfully");
      } else {
        throw new Error("Error removing teacher");
      }
    } catch (error) {
      console.error("Error removing teacher:", error);
    }
  };

  const filteredApprovedTeachers = approvedTeachers.filter(
    (teacher) => !selectedTeachers.some((selectedTeacher) => selectedTeacher.id === teacher.id)
  );

  return (
    <div className="container">
      <>
        <h1>Approved Teachers</h1>
        {filteredApprovedTeachers.map((teacher) => (
          <div key={teacher.id} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{teacher.name}</h3>
              <p className="card-text">{teacher.description}</p>
              {/* Add more teacher details as needed */}
              <button className="btn btn-primary" onClick={() => handleAddTeacher(teacher.id)}>
                Add Teacher
              </button>
            </div>
          </div>
        ))}

        <SelectedTeachersComponent selectedTeachers={selectedTeachers} onRemoveTeacher={handleRemoveTeacher} />
      </>
    </div>
  );
};

export default StudentComponent;











