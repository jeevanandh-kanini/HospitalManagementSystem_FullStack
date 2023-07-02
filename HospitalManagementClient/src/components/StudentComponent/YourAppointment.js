import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
const YourAppointments = () => {
  const [appointments, setAppointments] = useState([]);




//   const [patientidfromtoken,setpatientidFromToken] = useState("");
  useEffect(() => {
    fetchAppointments();

   


  }, []);
 

  const fetchAppointments = async () => {
    try {
        let token = sessionStorage.getItem('token');
        let decodedtoken =jwt_decode(token);
        let patientid=decodedtoken['UserId']
      const response = await fetch(`https://localhost:7150/api/Booking/patient/${patientid}`);
      const jsonData = await response.json();
      setAppointments(jsonData);
    } catch (error) {
      console.log('Error fetching appointments:', error);
    }
  };
  const getStatusColor = (status) => {
    return status === 'Approved' ? 'green' : 'red';
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="container">
    <h1>Your Appointments</h1>
    <div className="row">
      {appointments.map(appointment => (
        <div key={appointment.bookingId} className="col-md-4">
          <div className="card mb-3" style={{backgroundColor:' #007bff'}}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={`https://localhost:7150/Images/${appointment.doctor.imageName}`}
                  alt="Doctor Profile"
                  className="card-img rounded-circle"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' ,marginTop:"50px",marginLeft:"8px"}}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{appointment.doctor.name}</h5>
                  <p className="card-text">{appointment.doctor.specialization}</p>
                  <p className="card-text">Booking Date and Time: {formatDateTime(appointment.bookingDateTime)}</p>
                  <div style={{ backgroundColor: getStatusColor(appointment.bookingStatus), color: 'white', padding: '5px' }}>
                    {appointment.bookingStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default YourAppointments;