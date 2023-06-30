


import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './Appheader.css'

const Appheader = () => {
  const USER_TYPES = {
    patient: 'patient',
    doctor: 'doctor',
    admin: 'admin'
  };

  const [role, setRole] = useState('');
  const [displayUsername, setDisplayUsername] = useState('');
  const [showMenu, setShowMenu] = useState(false);

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
        setDisplayUsername(username);
        setRole(trole);
      }
    }
  }, [location]);




  


  return (
    <div>
      {showMenu && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/" activeClassName="active">
              Home
            </NavLink>

            {(role === USER_TYPES.student) && (
              <NavLink className="nav-link" to="/student" activeClassName="active">
                Student
              </NavLink>
            )}

            {(role === USER_TYPES.doctor) && (
              <NavLink className="nav-link" to="/teacher" activeClassName="active">
                Teacher
              </NavLink>
            )}

            {(role === USER_TYPES.admin) && (
              <>
                <NavLink className="nav-link" to="/admin" activeClassName="active">
                  Admin
                </NavLink>
                <NavLink className="nav-link" to="/teacherlist" activeClassName="active">
                  Teacher List
                </NavLink>
              </>
            )}

            <span className="navbar-text ml-auto">
              Welcome <b>{displayUsername}</b> <p>You are logged in as {sessionStorage.getItem('role')}</p>
            </span>

            <NavLink className="nav-link" to="/login" activeClassName="active">
              Logout
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Appheader;