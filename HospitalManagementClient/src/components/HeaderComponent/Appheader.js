import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './Appheader.css'

import { Modal, Button } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
const Appheader = () => {
  const USER_TYPES = {
    patient: 'patient',
    doctor: 'doctor',
    admin: 'admin'
  };

  const [role, setRole] = useState('');
  const [displayUsername, setDisplayUsername] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [doctorImage, setDoctorImage] = useState('');


  const [patientImage ,setPatientImage]=useState('');



  const [rolefromtoken, setRoleFromToken] = useState('');


  const [idfromtoken, setIdFromToken] = useState('');





  const [showModal, setShowModal] = useState(false);
const [name, setName] = useState('');
const [specialization, setSpecialization] = useState('');
const [imageFile, setImageFile] = useState(null);





const handleOpenModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};

const handleUpdateDoctor = async () => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('specialization', specialization);
  formData.append('imageFile', imageFile);

  try {
    const response = await fetch(`https://localhost:7150/api/Doctors/${idfromtoken}`, {
      method: 'PUT',
      body: formData,
    });
    if (response.ok) {
      console.log('Doctor details updated');

      setName('');
      setSpecialization('');
      setImageFile(null);
      setShowModal(false);
      window.location.reload();
    } else {
      console.log('Failed to update doctor details');
    }
  } catch (error) {
    console.log('Error updating doctor details:', error);
  }
};

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      setShowMenu(false);
    } else {
      setShowMenu(true);
      let username = sessionStorage.getItem('username');
      let trole = sessionStorage.getItem('role');

      if (username === '' || username === null) {
        navigate('/login');
      } else {
        let token1 = sessionStorage.getItem('token');
        let tokenPayload = jwt_decode(token1);
        setDisplayUsername(username);
        setRole(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

        if (trole === USER_TYPES.doctor || trole=== USER_TYPES.patient) {
          let token1 = sessionStorage.getItem('token');

          if (token1) {
            const tokenPayload = jwt_decode(token1);
            setRoleFromToken(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
            setIdFromToken(tokenPayload['UserId']);
          }
          let tokenPayload = jwt_decode(token1);
            setRoleFromToken(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
          setIdFromToken(tokenPayload['UserId']);
          fetchDoctorData(idfromtoken);
          fetchPatientData(idfromtoken);
        }
      }
    }
  }, [location,doctorImage,patientImage]);

  const fetchDoctorData = async (doctorId) => {
    try {
      const response = await fetch(`https://localhost:7150/api/Doctors/${doctorId}`);
      const jsonData = await response.json();
      setDoctorImage(jsonData.imageName);

      console.log(doctorImage);
    } catch (error) {
      console.log('Error fetching doctor data:', error);
    }
  };



  const fetchPatientData = async (doctorId) => {
    try {
      console.log('sddsds  '+doctorId)
      const response = await fetch(`https://localhost:7150/api/Patient/${doctorId}`);
      const jsonData = await response.json();
      setPatientImage(jsonData.imageName);

      console.log(patientImage);
    } catch (error) {
      console.log('Error fetching doctor data:', error);
    }
  };



  return (
    <div>
    {showMenu && (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <a href="https://ibb.co/6XfrSDB">
              <img
                src="https://i.ibb.co/6XfrSDB/134689637-padded-logo.png"
                alt="134689637-padded-logo"
                border={0}
                id="logo"
              />
            </a>
          </NavLink>
  
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
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/" activeClassName="active">
                  <i className="fa fa-home" aria-hidden="true"></i> Home
                </NavLink>
              </li>
  
              {role === USER_TYPES.patient && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/student" activeClassName="active">
                      <i className="fa fa-user-md" aria-hidden="true"></i> Our Doctors
                    </NavLink>
                  </li>
  
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/yourappointment" activeClassName="active">
                      Appointment Status
                    </NavLink>
                  </li>
                </>
              )}
  
              {role === USER_TYPES.doctor && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/appointmentlist" activeClassName="active">
                    Appointment List
                  </NavLink>
                </li>
              )}
  
              {role === USER_TYPES.admin && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin" activeClassName="active">
                      Pending Approval
                    </NavLink>
                  </li>
  
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/teacherlist" activeClassName="active">
                      Doctor List
                    </NavLink>
                  </li>
  
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/userappointmentlist" activeClassName="active">
                      Consultation Requests
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
  
            <span className="navbar-text" style={{display:'flex' ,flexDirection:'row'}}>
             <p style={{marginTop:'10px'}}>Welcome  </p>  <b style={{marginTop:'10px',marginLeft:'7px'}}>{displayUsername}</b>
              {role === USER_TYPES.patient && (
                <>
                <img
                  src={`https://localhost:7150/Images/${patientImage}`}
                  alt="Patient Profile"
                  className="rounded-circle ml-2"
                  style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                />
              </>
              )}
              {role === USER_TYPES.doctor  && (
                <>
                  <img
                    src={`https://localhost:7150/Images/${doctorImage}`}
                    alt="Doctor Profile"
                    className="rounded-circle ml-2"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                    onClick={handleOpenModal}
                  />
                  
  
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Doctor Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <div className="form-group">
                          <label>Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Specialization:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Image:</label>
                          <input
                            type="file"
                            className="form-control-file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                          />
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleUpdateDoctor}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
  
              <NavLink className="nav-link" to="/login" activeClassName="active">
                Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
              </NavLink>
            </span>
          </div>
        </div>
      </nav>
    )}
  </div>
  
  );
}

export default Appheader;
