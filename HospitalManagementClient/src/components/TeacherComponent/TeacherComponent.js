// import React, { useState } from "react";

// const TeacherComponent = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Send teacher details to the API for approval
//     try {
//       const response = await fetch("https://localhost:7185/api/Teachers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           description,
//           approved: false,
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Teacher details submitted:", data);

//         setName("");
//         setDescription("");
//         // Display a success message or redirect to a confirmation page
//       } else {
//         throw new Error("Error submitting teacher details");
//       }
//     } catch (error) {
//       console.error("Error submitting teacher details:", error);
//       // Display an error message
//     }
//   };

//   return (
//     <div>
//       <h1>Teacher Details</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <input
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default TeacherComponent;


// import React, { useState } from "react";

// const TeacherComponent = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const [tid, setTid] = useState(sessionStorage.getItem('id'));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Send teacher details to the API for updating
//     try {
//       const response = await fetch(`https://localhost:7185/api/Teachers/${tid}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           description,
//           approved: false,
//         }),
//       });
//       if (response.ok) {
//         console.log("Teacher details updated");
  
//         setName("");
//         setDescription("");
//         // Display a success message or perform additional actions
//       } else {
//         throw new Error("Error updating teacher details");
//       }
//     } catch (error) {
//       console.error("Error updating teacher details:", error);
//       // Display an error message
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Update Teacher Details</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default TeacherComponent;




// import React, { useState } from "react";

// const TeacherComponent = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const [tid, setTid] = useState(sessionStorage.getItem('id'));

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a FormData object
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('imageFile', imageFile);

//     // Send teacher details to the API for updating
//     try {
//       const response = await fetch(`https://localhost:7185/api/Teachers/${tid}`, {
//         method: "PUT",
//         body: formData,
//       });
//       if (response.ok) {
//         console.log("Teacher details updated");

//         setName("");
//         setDescription("");
//         setImageFile(null);

//         document.getElementById('imageFile').value = null;
//         // Display a success message or perform additional actions
//       } else {
//         throw new Error("Error updating teacher details");
//       }
//     } catch (error) {
//       console.error("Error updating teacher details:", error);
//       // Display an error message
//     }
//   };


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   // Create a FormData object
//   //   const formData = new FormData();
//   //   formData.append('name', name);
//   //   formData.append('description', description);
//   //   formData.append('imageFile', imageFile);
  
//   //   // Send teacher details to the API for updating
//   //   try {
//   //     const response = await fetch(`https://localhost:7185/api/Teachers/${tid}`, {
//   //       method: "PUT",
//   //       body: formData,
//   //     });
//   //     if (response.ok) {
//   //       console.log("Teacher details updated");
  
//   //       setName("");
//   //       setDescription("");
//   //       setImageFile(null);
  
//   //       // Reset the file input to clear the selected file
//   //       document.getElementById('imageFile').value = null;
  
//   //       // Fetch teacher details by ID
//   //       const teacherResponse = await fetch(`https://localhost:7185/api/Teachers/${tid}`);
//   //       if (teacherResponse.ok) {
//   //         const teacherData = await teacherResponse.json();
  
//   //         // Display the image using the received imageName
//   //         const imageSrc = `https://localhost:7185/Images/${teacherData.imageName}`;
//   //         const imageElement = document.createElement('img');
//   //         imageElement.src = imageSrc;
//   //         document.body.appendChild(imageElement);
//   //       } else {
//   //         throw new Error("Error fetching teacher details");
//   //       }
//   //     } else {
//   //       throw new Error("Error updating teacher details");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating teacher details:", error);
//   //     // Display an error message
//   //   }
//   // };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//   };

//   return (
//     <div className="container">
//       <h1>Update Teacher Details</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="imageFile">Image:</label>
//           <input
//             type="file"
//             className="form-control-file"
//             id="imageFile"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default TeacherComponent;





// import React, { useState } from "react";

// import './TeacherComponent.css'

// const TeacherComponent = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");

//   const [tid, setTid] = useState(sessionStorage.getItem("id"));


//   const imgRender = async ()=>{
//     const teacherResponse = await fetch(`https://localhost:7185/api/Teachers/${tid}`);
//         if (teacherResponse.ok) {
//           const teacherData = await teacherResponse.json();

//           // Set the image URL to display the image
//           const imageSrc = `https://localhost:7185/Images/${teacherData.imageName}`;
//           setImageUrl(imageSrc);
//         } else {
//           throw new Error("Error fetching teacher details");
//         }

//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a FormData object
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("imageFile", imageFile);

//     // Send teacher details to the API for updating
//     try {
//       const response = await fetch(`https://localhost:7185/api/Teachers/${tid}`, {
//         method: "PUT",
//         body: formData,
//       });
//       if (response.ok) {
//         console.log("Teacher details updated");

//         setName("");
//         setDescription("");
//         setImageFile(null);

//         // Reset the file input to clear the selected file
//         document.getElementById("imageFile").value = null;

//         // imgRender();

//         // Fetch teacher details by ID
        
//       } else {
//         throw new Error("Error updating teacher details");
//       }
//     } catch (error) {
//       console.error("Error updating teacher details:", error);
//       // Display an error message
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//   };
//   imgRender();

//   return (
   
//     <div className="container">
//       <h1>Update Teacher Details</h1>
//       {imageUrl !=="https://localhost:7185/Images/" && ( // Check if imageUrl is not an empty string
//       <div className="image-container">
//         <img src={imageUrl} alt="" />
//       </div>
//     )}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="imageFile">Image:</label>
//           <input
//             type="file"
//             className="form-control-file"
//             id="imageFile"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
      
//     </div>
 
//   );
// };

// export default TeacherComponent;