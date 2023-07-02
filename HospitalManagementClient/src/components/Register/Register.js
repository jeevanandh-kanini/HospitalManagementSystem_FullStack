

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [userName, setUsername] = useState("");
//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const navigate = useNavigate();

//   const IsValidate = () => {
//     let isProceed = true;
//     let errorMessage = "Please enter a value in ";
//     if (userName === null || userName === "") {
//       isProceed = false;
//       errorMessage += "Username";
//     }
//     if (role === null || role === "") {
//       isProceed = false;
//       errorMessage += "Role";
//     }
//     if (password === null || password === "") {
//       isProceed = false;
//       errorMessage += "Password";
//     }
//     if (email === null || email === "") {
//       isProceed = false;
//       errorMessage += "Email";
//     }

//     if (!isProceed) {
//       toast.warning(errorMessage);
//     } else {
//       if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
//         isProceed = false;
//         toast.warning("Please enter a valid email");
//       }
//     }
//     return isProceed;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let regObj = { userName, email, password, role };
//     if (IsValidate()) {
//       fetch("https://localhost:7150/api/Auth/Register", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(regObj),
//       })
//         .then((res) => {
//           if (res.ok) {
//             toast.success("Registered successfully.");
//             navigate("/login");
//           } else {
//             throw new Error("Registration failed."+ "User Already Exist");
//           }
//         })
//         .catch((err) => {
//           toast.error("Failed: " + err.message);
//         });
//     }
//   };

//   return (
//     <div>
//       <div className="offset-lg-3 col-lg-6">
//         <form className="container" onSubmit={handleSubmit}>
//           <div className="card">
//             <div className="card-header">
//               <h1>User Registration</h1>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-lg-6">
//                   <div className="form-group">
//                     <label>User Name <span className="errmsg">*</span></label>
//                     <input
//                       value={userName}
//                       onChange={(e) => setUsername(e.target.value)}
//                       className="form-control"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-lg-6">
//                   <div className="form-group">
//                     <label>Password <span className="errmsg">*</span></label>
//                     <input
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       type="password"
//                       className="form-control"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-lg-6">
//                   <div className="form-group">
//                     <label>Role <span className="errmsg">*</span></label>
//                     <select
//                       value={role}
//                       onChange={(e) => setRole(e.target.value)}
//                       className="form-control"
//                     >
//                       <option value="">Select a role</option>
//                       <option value="admin">Admin</option>
//                       <option value="patient">Patient</option>
//                       <option value="doctor">Doctor</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-lg-6">
//                   <div className="form-group">
//                     <label>Email <span className="errmsg">*</span></label>
//                     <input
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="form-control"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card-footer">
//               <button type="submit" className="btn btn-primary">
//                 Register
//               </button>{" "}
//               |
//               <Link to={"/login"} className="btn btn-danger">
//                 Close
//               </Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './Register.css'

const Register = () => {
  const [userName, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [photo, setPhoto] = useState(null);
  const [specialization,setSpecialization] =useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isProceed = true;
    let errorMessage = "Please enter a value in ";
    if (userName === null || userName === "") {
      isProceed = false;
      errorMessage += "Username";
    }
    if (role === null || role === "") {
      isProceed = false;
      errorMessage += "Role";
    }
    if (password === null || password === "") {
      isProceed = false;
      errorMessage += "Password";
    }
    if (email === null || email === "") {
      isProceed = false;
      errorMessage += "Email";
    }

    if (!isProceed) {
      toast.warning(errorMessage);
    } else {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        isProceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append("UserName", userName);
    formData.append("Email", email);
    formData.append("Password",password);
    formData.append("Role", role);
    formData.append("Experience", experience);
    formData.append("Specialization", specialization);
    formData.append("ImageFile", photo);
    formData.append("Age", age);


console.log(formData);
    // let regObj = { userName, email, password, role, experience,specialization, photo };
    if (IsValidate()) {
      fetch("https://localhost:7150/api/Auth/Register", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Registered successfully.");
            navigate("/login");
          } else {
            throw new Error("Registration failed. User Already Exist");
          }
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  const handlePhotoUpload = (e) => {
    // Logic to handle photo upload
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <Link className="navbar-brand" to="/">
          Your Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Back To Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>User Name <span className="errmsg">*</span></label>
                    <input
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password <span className="errmsg">*</span></label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Role <span className="errmsg">*</span></label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select a role</option>
                      <option value="admin">Admin</option>
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email <span className="errmsg">*</span></label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                {role === "doctor" && (
                  <>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Year of Experience</label>
                        <input
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          type="number"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Specialization</label>
                        <input
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Upload Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="form-control-file"
                        />
                      </div>
                    </div>
                  </>
                )}

{role === "patient" && (
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>{" "}
              |
              <Link to={"/login"} className="btn btn-danger">
                Close
              </Link>
            </div>
          </div>
        </form>
      </div>
      
      
    </div>
    
  </>
  );
};

export default Register;