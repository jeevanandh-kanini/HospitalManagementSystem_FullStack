// import { useState, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
// import './AppointmentList.css'

// const AppointmentsList = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [doctorId, setDoctorId] = useState('');

//   useEffect(() => {
//     let token1 = sessionStorage.getItem('token');

//     if (token1) {
//       const tokenPayload = jwt_decode(token1);
//       setDoctorId(tokenPayload['UserId']);
//     }

//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(`https://localhost:7150/api/Booking/doctor/${doctorId}`);
//         const jsonData = await response.json();
//         setAppointments(jsonData);
//       } catch (error) {
//         console.log('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId]);

//   const handleApproveAppointment = async (bookingId) => {
//     try {
//       const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
//         method: 'PUT',
//       });
//       if (response.ok) {
//         console.log(`Appointment ${bookingId} approved`);
//         // Refresh the list of appointments
//         const updatedAppointments = appointments.map((appointment) => {
//           if (appointment.bookingId === bookingId) {
//             return { ...appointment, approved: 'Approved' };
//           }
//           return appointment;
//         });
//         setAppointments(updatedAppointments);
//       } else {
//         console.log(`Failed to approve appointment ${bookingId}`);
//       }
//     } catch (error) {
//       console.log('Error approving appointment:', error);
//     }
//   };

//   const handleDeleteAppointment = async (bookingId) => {
//     try {
//       const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         console.log(`Appointment ${bookingId} deleted`);
//         // Remove the deleted appointment from the list
//         const updatedAppointments = appointments.filter(
//           (appointment) => appointment.bookingId !== bookingId
//         );
//         setAppointments(updatedAppointments);
//       } else {
//         console.log(`Failed to delete appointment ${bookingId}`);
//       }
//     } catch (error) {
//       console.log('Error deleting appointment:', error);
//     }
//   };

//   const formatDateTime = (dateTimeString) => {
//     const dateTime = new Date(dateTimeString);
//     const formattedDate = dateTime.toLocaleDateString('en-GB');
//     const formattedTime = dateTime.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });
//     return {
//       date: formattedDate,
//       time: formattedTime,
//     };
//   };

//   return (
//     <div>
//       <h2>Appointments</h2>
//       {appointments.map((appointment) => (
//         <div className="card" key={appointment.bookingId}>
//           <div className="card-body">
//             <h5 className="card-title">{appointment.patient.name}</h5>
//             <p className="card-text">Date: {formatDateTime(appointment.bookingDateTime).date}</p>
//             <p className="card-text">Time: {formatDateTime(appointment.bookingDateTime).time}</p>
//             <p className="card-text">Approved: {appointment.bookingStatus}</p>
            
//           </div>
//           {appointment.bookingStatus === 'Pending' && (
//               <>
//                 <button
//                   className="btn btn-primary mr-2"
//                   onClick={() => handleApproveAppointment(appointment.bookingId)}
//                 >
//                   Approve
//                 </button>
                
//               </>
//             )}
//           <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteAppointment(appointment.bookingId)}
//                 >
//                   Delete
//                 </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AppointmentsList;



// import { useState, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';

// import './AppointmentList.css'

// const AppointmentsList = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [doctorId, setDoctorId] = useState('');

//   useEffect(() => {
//     let token1 = sessionStorage.getItem('token');

//     if (token1) {
//       const tokenPayload = jwt_decode(token1);
//       setDoctorId(tokenPayload['UserId']);
//     }

//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(`https://localhost:7150/api/Booking/doctor/${doctorId}`);
//         const jsonData = await response.json();
//         setAppointments(jsonData);
//       } catch (error) {
//         console.log('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId]);

//   const handleApproveAppointment = async (bookingId) => {
//     try {
//       const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
//         method: 'PUT',
//       });
//       if (response.ok) {
//         console.log(`Appointment ${bookingId} approved`);
//         // Refresh the list of appointments
//         const updatedAppointments = appointments.map((appointment) => {
//           if (appointment.bookingId === bookingId) {
//             return { ...appointment, bookingStatus: 'Approved' };
//           }
//           return appointment;
//         });
//         setAppointments(updatedAppointments);
//       } else {
//         console.log(`Failed to approve appointment ${bookingId}`);
//       }
//     } catch (error) {
//       console.log('Error approving appointment:', error);
//     }
//   };

//   const handleDeleteAppointment = async (bookingId) => {
//     try {
//       const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         console.log(`Appointment ${bookingId} deleted`);
//         // Remove the deleted appointment from the list
//         const updatedAppointments = appointments.filter(
//           (appointment) => appointment.bookingId !== bookingId
//         );
//         setAppointments(updatedAppointments);
//       } else {
//         console.log(`Failed to delete appointment ${bookingId}`);
//       }
//     } catch (error) {
//       console.log('Error deleting appointment:', error);
//     }
//   };

//   const formatDateTime = (dateTimeString) => {
//     const dateTime = new Date(dateTimeString);
//     const formattedDate = dateTime.toLocaleDateString('en-GB');
//     const formattedTime = dateTime.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });
//     return {
//       date: formattedDate,
//       time: formattedTime,
//     };
//   };

//   return (
//     <div className="appointments-list">
//       <h2>Appointments</h2>
//       <div className="card-container">
//         {appointments.map((appointment) => (
//           <div className="card" key={appointment.bookingId}>
//             <div className="card-body">
//               <h5 className="card-title">{appointment.patient.name}</h5>
//               <p className="card-text">Date: {formatDateTime(appointment.bookingDateTime).date}</p>
//               <p className="card-text">Time: {formatDateTime(appointment.bookingDateTime).time}</p>
//               <p className="card-text">Status: {appointment.bookingStatus}</p>
//               <div className="card-buttons">
//                 {appointment.bookingStatus === 'Pending' && (
//                   <button
//                     className="btn btn-primary mr-2"
//                     onClick={() => handleApproveAppointment(appointment.bookingId)}
//                   >
//                     Approve
//                   </button>
//                 )}
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteAppointment(appointment.bookingId)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppointmentsList;


// import { useState, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
// import './AppointmentList.css'


// const AppointmentsList = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [doctorId, setDoctorId] = useState('');

//   useEffect(() => {
//     let token1 = sessionStorage.getItem('token');

//     if (token1) {
//       const tokenPayload = jwt_decode(token1);
//       setDoctorId(tokenPayload['UserId']);
//     }

//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(`https://localhost:7150/api/Booking/doctor/${doctorId}`);
//         const jsonData = await response.json();
//         setAppointments(jsonData);
//       } catch (error) {
//         console.log('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId]);

//   const handleApproveAppointment = async (bookingId) => {
//     try {
//       const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
//         method: 'PUT',
//       });
//       if (response.ok) {
//         console.log(`Appointment ${bookingId} approved`);
//         // Refresh the list of appointments
//         const updatedAppointments = appointments.map((appointment) => {
//           if (appointment.bookingId === bookingId) {
//             return { ...appointment, bookingStatus: 'Approved' };
//           }
//           return appointment;
//         });
//         setAppointments(updatedAppointments);
//       } else {
//         console.log(`Failed to approve appointment ${bookingId}`);
//       }
//     } catch (error) {
//       console.log('Error approving appointment:', error);
//     }
//   };

//   const handleDeleteAppointment = async (bookingId) => {
//     try {
//       const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         console.log(`Appointment ${bookingId} deleted`);
//         // Remove the deleted appointment from the list
//         const updatedAppointments = appointments.filter(
//           (appointment) => appointment.bookingId !== bookingId
//         );
//         setAppointments(updatedAppointments);
//       } else {
//         console.log(`Failed to delete appointment ${bookingId}`);
//       }
//     } catch (error) {
//       console.log('Error deleting appointment:', error);
//     }
//   };

//   const formatDateTime = (dateTimeString) => {
//     const dateTime = new Date(dateTimeString);
//     const formattedDate = dateTime.toLocaleDateString('en-GB');
//     const formattedTime = dateTime.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });
//     return {
//       date: formattedDate,
//       time: formattedTime,
//     };
//   };

//   return (
//     <div className="appointments-list">
//       <h2>Appointments</h2>
//       <div className="card-container row">
//         {appointments.map((appointment) => (
//           <div className="card col-md-4" key={appointment.bookingId}>
//             <div className="card-body">
//               <h5 className="card-title">{appointment.patient.name}</h5>
//               <p className="card-text">Date: {formatDateTime(appointment.bookingDateTime).date}</p>
//               <p className="card-text">Time: {formatDateTime(appointment.bookingDateTime).time}</p>
//               <p className="card-text">Status: {appointment.bookingStatus}</p>
//               <div className="card-buttons">
//                 {appointment.bookingStatus === 'Pending' && (
//                   <button
//                     className="btn btn-primary mr-2"
//                     onClick={() => handleApproveAppointment(appointment.bookingId)}
//                   >
//                     Approve
//                   </button>
//                 )}
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteAppointment(appointment.bookingId)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppointmentsList;

// import { useState, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
// import './AppointmentList.css';

// const AppointmentsList = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [doctorId, setDoctorId] = useState('');
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [selectedDate, setSelectedDate] = useState('');

//   useEffect(() => {
//     let token1 = sessionStorage.getItem('token');

//     if (token1) {
//       const tokenPayload = jwt_decode(token1);
//       setDoctorId(tokenPayload['UserId']);
//     }

//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(`https://localhost:7150/api/Booking/doctor/${doctorId}`);
//         const jsonData = await response.json();
//         setAppointments(jsonData);
//         setFilteredAppointments(jsonData);
//       } catch (error) {
//         console.log('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId]);

//   const handleApproveAppointment = async (bookingId) => {
//     try {
//       const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
//         method: 'PUT',
//       });
//       if (response.ok) {
//         console.log(`Appointment ${bookingId} approved`);
//         // Refresh the list of appointments
//         const updatedAppointments = appointments.map((appointment) => {
//           if (appointment.bookingId === bookingId) {
//             return { ...appointment, bookingStatus: 'Approved' };
//           }
//           return appointment;
//         });
//         setAppointments(updatedAppointments);
//         setFilteredAppointments(updatedAppointments);
//       } else {
//         console.log(`Failed to approve appointment ${bookingId}`);
//       }
//     } catch (error) {
//       console.log('Error approving appointment:', error);
//     }
//   };

//   const handleDeleteAppointment = async (bookingId) => {
//     try {
//       const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         console.log(`Appointment ${bookingId} deleted`);
//         // Remove the deleted appointment from the list
//         const updatedAppointments = appointments.filter(
//           (appointment) => appointment.bookingId !== bookingId
//         );
//         setAppointments(updatedAppointments);
//         setFilteredAppointments(updatedAppointments);
//       } else {
//         console.log(`Failed to delete appointment ${bookingId}`);
//       }
//     } catch (error) {
//       console.log('Error deleting appointment:', error);
//     }
//   };

//   const formatDateTime = (dateTimeString) => {
//     const dateTime = new Date(dateTimeString);
//     const formattedDate = dateTime.toLocaleDateString('en-GB');
//     const formattedTime = dateTime.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });
//     return {
//       date: formattedDate,
//       time: formattedTime,
//     };
//   };

//   const handleDateFilter = (event) => {
//     const selectedDate = event.target.value;
//     setSelectedDate(selectedDate);
//     if (selectedDate) {
//       const filteredAppointments = appointments.filter(
//         (appointment) => {
//           const appointmentDate = new Date(appointment.bookingDateTime).toISOString().split('T')[0];
//           return appointmentDate === selectedDate;
//         }
//       );
//       setFilteredAppointments(filteredAppointments);
//     } else {
//       setFilteredAppointments(appointments);
//     }
//   };

//   return (
//     <div className="appointments-list">
//       <h2>Appointments</h2>
//       <div className="filter-container">
//         <label htmlFor="date-filter">Filter by Date:</label>
//         <input
//           id="date-filter"
//           type="date"
//           value={selectedDate}
//           onChange={handleDateFilter}
//         />
//       </div>
//       <div className="card-container row">
//         {filteredAppointments.map((appointment) => (
//           <div className="card col-md-4" key={appointment.bookingId}>
//             <div className="card-body">
//               <h5 className="card-title">{appointment.patient.name}</h5>
//               <p className="card-text">Date: {formatDateTime(appointment.bookingDateTime).date}</p>
//               <p className="card-text">Time: {formatDateTime(appointment.bookingDateTime).time}</p>
//               <p className="card-text">Status: {appointment.bookingStatus}</p>
//               <div className="card-buttons">
//                 {appointment.bookingStatus === 'Pending' && (
//                   <button
//                     className="btn btn-primary mr-2"
//                     onClick={() => handleApproveAppointment(appointment.bookingId)}
//                   >
//                     Approve
//                   </button>
//                 )}
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteAppointment(appointment.bookingId)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppointmentsList;




import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './AppointmentList.css';
import Form from 'react-bootstrap/Form';

import Alert from 'react-bootstrap/Alert';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [doctorApproved, setDoctorApproved] = useState(false);
  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7150/api/Doctors/${doctorId}`);
      const doctorData = await response.json();
      setDoctorApproved(doctorData.approved);
    } catch (error) {
      console.log('Error fetching doctor details:', error);
    }
  };
  useEffect(() => {
    let token1 = sessionStorage.getItem('token');

    if (token1) {
      const tokenPayload = jwt_decode(token1);
      setDoctorId(tokenPayload['UserId']);
    }



    const fetchDoctorDetails = async () => {
        try {
          const response = await fetch(`https://localhost:7150/api/Doctors/${doctorId}`);
          const doctorData = await response.json();
          setDoctorApproved(doctorData.approved);
        } catch (error) {
          console.log('Error fetching doctor details:', error);
        }
      };

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`https://localhost:7150/api/Booking/doctor/${doctorId}`);
        const jsonData = await response.json();
        setAppointments(jsonData);
        setFilteredAppointments(jsonData);
      } catch (error) {
        console.log('Error fetching appointments:', error);
      }
    };
    fetchDoctorDetails();
    fetchAppointments();
  }, [doctorId]);

  fetchDoctorDetails();
  const handleApproveAppointment = async (bookingId) => {
    try {
      const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
        method: 'PUT',
      });
      if (response.ok) {
        console.log(`Appointment ${bookingId} approved`);
        // Refresh the list of appointments
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.bookingId === bookingId) {
            return { ...appointment, bookingStatus: 'Approved' };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
        setFilteredAppointments(updatedAppointments);
      } else {
        console.log(`Failed to approve appointment ${bookingId}`);
      }
    } catch (error) {
      console.log('Error approving appointment:', error);
    }
  };

  const handleDeleteAppointment = async (bookingId) => {
    try {
      const response = await fetch(`https://localhost:7150/api/Booking/${bookingId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log(`Appointment ${bookingId} deleted`);
        // Remove the deleted appointment from the list
        const updatedAppointments = appointments.filter(
          (appointment) => appointment.bookingId !== bookingId
        );
        setAppointments(updatedAppointments);
        setFilteredAppointments(updatedAppointments);
      } else {
        console.log(`Failed to delete appointment ${bookingId}`);
      }
    } catch (error) {
      console.log('Error deleting appointment:', error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString('en-GB');
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  const handleDateFilter = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    if (selectedDate) {
      const filteredAppointments = appointments.filter(
        (appointment) => {
          const appointmentDate = new Date(appointment.bookingDateTime).toISOString().split('T')[0];
          return appointmentDate === selectedDate;
        }
      );
      setFilteredAppointments(filteredAppointments);
    } else {
      setFilteredAppointments(appointments);
    }
  };



  if (!doctorApproved) {
    return (
      <Alert variant="warning">
        You need to be approved by admin.
      </Alert>
    );
  }

  return (
    <div className="appointments-list">
      <h2>Appointments</h2>
      <div className="date-filter" style={{width:"500px" ,marginBottom:"30px"}}>
        <Form.Group controlId="dateFilter">
          <Form.Label>Date Filter:</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={handleDateFilter}
            className="form-control"
          />
        </Form.Group>
      </div>
      <div className="card-container row">
        {filteredAppointments.map((appointment) => (
          <div className="card col-md-4" key={appointment.bookingId} style={{marginLeft:"25px"}}>
            <div className="card-body">
              <h5 className="card-title">{appointment.patient.name}</h5>
              <p className="card-text">Age: {appointment.patient.age}</p>
              <p className="card-text">Symptoms: {appointment.diseaseDescription}</p>
              <p className="card-text">Date: {formatDateTime(appointment.bookingDateTime).date}</p>
              <p className="card-text">Time: {formatDateTime(appointment.bookingDateTime).time}</p>
              <p className="card-text">Status: {appointment.bookingStatus}</p>
              <div className="card-buttons">
                {appointment.bookingStatus === 'Pending' && (
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleApproveAppointment(appointment.bookingId)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteAppointment(appointment.bookingId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;