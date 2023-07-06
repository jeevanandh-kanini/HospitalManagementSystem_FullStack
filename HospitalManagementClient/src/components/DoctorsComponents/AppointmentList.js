







import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './AppointmentList.css';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import backgroundImg from '../assets/26807.jpg';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctorApproved, setDoctorApproved] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

   

    if (token) {
      const tokenPayload = jwt_decode(token);
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
  }, [doctorId,appointments]);

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
      const filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.bookingDateTime).toISOString().split('T')[0];
        return appointmentDate === selectedDate;
      });
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
    <div className="appointments-list" style={{ position:'absolute', height:'100%', width:'100%',backgroundImage: `url(${backgroundImg})` }}>
      {filteredAppointments.length === 0 ? (
        <h4>You don't have any appointments till now.</h4>
      ) : (
        <div>
         
          <div className="card-container row" style={{ marginLeft: "25px" }}>
            {filteredAppointments.map((appointment) => (
              <div className="card col-md-4" key={appointment.bookingId} style={{ margin: "25px 10", marginLeft: '6px', marginTop: "10px" }}>
                <div className="card-body" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <img
                      src={"https://localhost:7150/Images/" + appointment.patient.imageName}
                      alt="Patient Profile"
                      className="rounded-circle"
                      style={{ width: '100px', height: '100px', marginRight: "10px", marginTop: '50px' }}
                    />
                    <div>
                      <h5 className="card-title">Name: {appointment.patient.name}</h5>
                      <p className="card-text">Age: {appointment.patient.age}</p>
                      <p className="card-text">Symptoms: {appointment.diseaseDescription}</p>
                      <p className="card-text">Date: {formatDateTime(appointment.bookingDateTime).date}</p>
                      <p className="card-text">Time: {formatDateTime(appointment.bookingDateTime).time}</p>
                      <p className="card-text">Status: {appointment.bookingStatus}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: "auto", marginLeft: '70px' }}>
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
      )}
    </div>
  );
};

export default AppointmentsList;
