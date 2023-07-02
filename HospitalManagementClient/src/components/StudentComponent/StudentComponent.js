



// import React, { useState, useEffect } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import jwt_decode from 'jwt-decode';
// import { toast } from "react-toastify";
// const DoctorsList = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [diseaseDescription, setDiseaseDescription] = useState('');
//   const [bookingDateTime, setBookingDateTime] = useState('');


//   const [rolefromtoken,setRoleFromToken] = useState("");

//   const [patientidfromtoken,setpatientidFromToken] = useState("");

//   const[doctorid1,setDoctorid] =useState("");
   
   


        

//   useEffect(() => {
//     fetchData();

//     let token1 = sessionStorage.getItem('token');
       
    
        
    
//         if (token1) {
//             const tokenPayload = jwt_decode(token1);
//             setRoleFromToken(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) // Assuming the role property is named 'Role'
//            setpatientidFromToken(tokenPayload['UserId'])
//           }

          
//   }, []);

//   console.log(rolefromtoken);
//   console.log(patientidfromtoken);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://localhost:7150/api/Doctors?approved=true');
//       const jsonData = await response.json();
//       setDoctors(jsonData);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   const handleAppointment = (doctorId) => {

//     setDoctorid(doctorId);
   
//     setShowModal(true);

    
    
    
    
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setDiseaseDescription('');
//     setBookingDateTime('');
//     setDoctorid('');
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

    

//     const formattedDateTime = new Date(bookingDateTime).toISOString();

//     const encodedDate = encodeURIComponent(bookingDateTime);
//     const apiUrl = `https://localhost:7150/api/Booking?patientId=${patientidfromtoken}&doctorId=${doctorid1}&bookingDateTime=${encodedDate}`;

//     fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         patientId: patientidfromtoken,
//         doctorId: doctorid1,
//         bookingDateTime: encodedDate,
//       }),
//     })
//       .then((response) => {
//         console.log('Raw response:', response);
//         toast.success("Appointment Booked Successfully", {
//           autoClose: 1000, // Duration in milliseconds (2 seconds)
//         });
//         handleCloseModal();
//         return response.json();
        
//       })
//       .then((data) => {
//         toast.error("Booking Failed :" + data);
//         handleCloseModal();
//       })
//       .catch((error) => {
//         console.log('Error:', error);
        
//         handleCloseModal();
//       });

//       handleCloseModal();
//     }
  

//   return (
//     <div className="container">
//       <h1>Approved Doctors</h1>
//       <div className="row">
//         {doctors.map((doctor) => (
//           <div key={doctor.id} className="col-md-4">
//             <div className="card mb-3">
//               <div className="row no-gutters">
//                 <div className="col-md-4">
//                   <img
//                     src={`https://localhost:7150/Images/${doctor.imageName}`}
//                     alt="Doctor Profile"
//                     className="card-img rounded-circle"
//                     style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '25px', marginLeft: '10px' }}
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <h5 className="card-title">{doctor.name}</h5>
//                     <p className="card-text">{doctor.specialization}</p>
//                     <div className="text-right">
//                       <button className="btn btn-primary" onClick={() => handleAppointment(doctor.id)}>
//                         Book Appointment
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Book Appointment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="diseaseDescription">
//               <Form.Label>Short Description of Disease</Form.Label>
              
//               <Form.Control
//                 type="text"
//                 value={diseaseDescription}
//                 onChange={(event) => setDiseaseDescription(event.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="bookingDateTime">
//               <Form.Label>Date and Time</Form.Label>
//               <Form.Control
//                 type="datetime-local"
//                 value={bookingDateTime}
//                 onChange={(event) => setBookingDateTime(event.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Book
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default DoctorsList;



// import React, { useState, useEffect } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import jwt_decode from 'jwt-decode';
// import { toast } from 'react-toastify';

// const DoctorsList = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [diseaseDescription, setDiseaseDescription] = useState('');
//   const [bookingDateTime, setBookingDateTime] = useState('');
//   const [filterName, setFilterName] = useState('');
//   const [filterSpecialization, setFilterSpecialization] = useState('');

//   const [rolefromtoken, setRoleFromToken] = useState('');
//   const [patientidfromtoken, setpatientidFromToken] = useState('');
//   const [doctorid1, setDoctorid] = useState('');

//   useEffect(() => {
//     fetchData();

//     let token1 = sessionStorage.getItem('token');

//     if (token1) {
//       const tokenPayload = jwt_decode(token1);
//       setRoleFromToken(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']); // Assuming the role property is named 'Role'
//       setpatientidFromToken(tokenPayload['UserId']);
//     }
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://localhost:7150/api/Doctors?approved=true');
//       const jsonData = await response.json();
//       setDoctors(jsonData);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   const handleAppointment = (doctorId) => {
//     setDoctorid(doctorId);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setDiseaseDescription('');
//     setBookingDateTime('');
//     setDoctorid('');
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formattedDateTime = new Date(bookingDateTime).toISOString();
//     const encodedDate = encodeURIComponent(bookingDateTime);
//     const apiUrl = `https://localhost:7150/api/Booking?patientId=${patientidfromtoken}&doctorId=${doctorid1}&bookingDateTime=${encodedDate}`;

//     fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         patientId: patientidfromtoken,
//         doctorId: doctorid1,
//         bookingDateTime: encodedDate,
//       }),
//     })
//       .then((response) => {
//         console.log('Raw response:', response);
//         toast.success('Appointment Booked Successfully', {
//           autoClose: 1000, // Duration in milliseconds (2 seconds)
//         });
//         handleCloseModal();
//         return response.json();
//       })
//       .then((data) => {
//         toast.error('Booking Failed :' + data);
//         handleCloseModal();
//       })
//       .catch((error) => {
//         console.log('Error:', error);
//         handleCloseModal();
//       });

//     handleCloseModal();
//   };

//   const handleFilterByName = (event) => {
//     setFilterName(event.target.value);
//   };

//   const handleFilterBySpecialization = (event) => {
//     setFilterSpecialization(event.target.value);
//   };

//   const filteredDoctors = doctors.filter((doctor) => {
//     const doctorName = doctor.name.toLowerCase();
//     const doctorSpecialization = doctor.specialization.toLowerCase();
//     const filterNameLowercase = filterName.toLowerCase();
//     const filterSpecializationLowercase = filterSpecialization.toLowerCase();

//     return (
//       doctorName.includes(filterNameLowercase) &&
//       doctorSpecialization.includes(filterSpecializationLowercase)
//     );
//   });

//   return (
//     <div className="container">
//       <h1>Approved Doctors</h1>
//       <div className="row">
//         <div className="col-md-12">
//           <div className="filter-form">
//             <div className="form-group">
//               <label htmlFor="filterName">Filter by Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="filterName"
//                 value={filterName}
//                 onChange={handleFilterByName}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="filterSpecialization">Filter by Specialization</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="filterSpecialization"
//                 value={filterSpecialization}
//                 onChange={handleFilterBySpecialization}
//               />
//             </div>
//           </div>
//         </div>
//         {filteredDoctors.map((doctor) => (
//           <div key={doctor.id} className="col-md-4">
//             <div className="card mb-3">
//               <div className="row no-gutters">
//                 <div className="col-md-4">
//                   <img
//                     src={`https://localhost:7150/Images/${doctor.imageName}`}
//                     alt="Doctor Profile"
//                     className="card-img rounded-circle"
//                     style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '25px', marginLeft: '10px' }}
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <h5 className="card-title">{doctor.name}</h5>
//                     <p className="card-text">{doctor.specialization}</p>
//                     <div className="text-right">
//                       <button className="btn btn-primary" onClick={() => handleAppointment(doctor.id)}>
//                         Book Appointment
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Book Appointment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="diseaseDescription">
//               <Form.Label>Short Description of Disease</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={diseaseDescription}
//                 onChange={(event) => setDiseaseDescription(event.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="bookingDateTime">
//               <Form.Label>Date and Time</Form.Label>
//               <Form.Control
//                 type="datetime-local"
//                 value={bookingDateTime}
//                 onChange={(event) => setBookingDateTime(event.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Book
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default DoctorsList;





import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [diseaseDescription, setDiseaseDescription] = useState('');
  const [bookingDateTime, setBookingDateTime] = useState('');
  const [filterText, setFilterText] = useState('');

  const [rolefromtoken, setRoleFromToken] = useState('');
  const [patientidfromtoken, setPatientIdFromToken] = useState('');
  const [doctorid, setDoctorId] = useState('');

  useEffect(() => {
    fetchData();

    let token1 = sessionStorage.getItem('token');

    if (token1) {
      const tokenPayload = jwt_decode(token1);
      setRoleFromToken(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      setPatientIdFromToken(tokenPayload['UserId']);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7150/api/Doctors?approved=true');
      const jsonData = await response.json();
      setDoctors(jsonData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleAppointment = (doctorId) => {
    setDoctorId(doctorId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDiseaseDescription('');
    setBookingDateTime('');
    setDoctorId('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const date = new Date('2023-07-05T00:51');
const formattedDateTime = date.toISOString();
const encodedDate = encodeURIComponent(formattedDateTime);

    console.log(bookingDateTime)
    console.log("encd "+encodedDate)
    console.log("format "+formattedDateTime)
    const apiUrl = `https://localhost:7150/api/Booking?patientId=${patientidfromtoken}&doctorId=${doctorid}&bookingDateTime=${encodedDate}`;
    const apiUrl1 = `https://localhost:7150/api/Booking?patientId=${patientidfromtoken}&doctorId=${doctorid}&bookingDateTime=${formattedDateTime}&disesasedescription=${diseaseDescription}`;
    fetch(apiUrl1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientId: patientidfromtoken,
        doctorId: doctorid,
        bookingDateTime: encodedDate,
        diseasedescription:diseaseDescription
      }),
    })
      .then((response) => {
        console.log('Raw response:', response);
        toast.success('Appointment Booked Successfully', {
          autoClose: 1000, // Duration in milliseconds (2 seconds)
        });
        handleCloseModal();
        return response.json();
      })
      .then((data) => {
        toast.error('Booking Failed: ' + data);
        handleCloseModal();
      })
      .catch((error) => {
        console.log('Error:', error);
        handleCloseModal();
      });

    handleCloseModal();
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const filterTextLowercase = filterText.toLowerCase();
    const doctorNameLowercase = doctor.name.toLowerCase();
    const doctorSpecializationLowercase = doctor.specialization.toLowerCase();

    return (
      doctorNameLowercase.includes(filterTextLowercase) || doctorSpecializationLowercase.includes(filterTextLowercase)
    );
  });

  return (
    <div className="container">
      <h1>Approved Doctors</h1>

      <div className="mb-3">
        <label htmlFor="filterText" className="form-label">
          Filter by Name or Specialization:
        </label>
        <input
          type="text"
          id="filterText"
          className="form-control"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>

      <div className="row">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="col-md-4">
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={`https://localhost:7150/Images/${doctor.imageName}`}
                    alt="Doctor Profile"
                    className="card-img rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '25px', marginLeft: '10px' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {doctor.name} ({doctor.specialization})
                    </h5>
                    <div className="text-right">
                      <button className="btn btn-primary" onClick={() => handleAppointment(doctor.id)}>
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="diseaseDescription">
              <Form.Label>Short Description of Disease</Form.Label>

              <Form.Control
                type="text"
                value={diseaseDescription}
                onChange={(event) => setDiseaseDescription(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="bookingDateTime">
              <Form.Label>Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={bookingDateTime}
                onChange={(event) => setBookingDateTime(event.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorsList;





