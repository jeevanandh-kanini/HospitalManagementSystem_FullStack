// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Appheader from "../HeaderComponent/Appheader";
// import './Login.css'

// const Login = () => {
//     const [username, usernameupdate] = useState('');
//     const [password, passwordupdate] = useState('');

//     const usenavigate=useNavigate();

//     useEffect(()=>{
// sessionStorage.clear();
//     },[]);

                                                                                                      

//     const ProceedLoginusingAPI = (e) => {
//         e.preventDefault();
//         if (validate()) {
           
//             let inputobj={"username": username,
//             "password": password};
//             fetch("https://localhost:7150/api/Auth/Login",{
//                 method:'POST',
//                 headers:{'content-type':'application/json'},
//                 body:JSON.stringify(inputobj)
//             }).then((res) => {
//                 return res.json();
//             }).then((resp) => {
//                 console.log(resp)
//                 if (Object.keys(resp).length === 0) {
//                     toast.error('Login failed, invalid credentials');
//                 }else{
//                     toast.success('Success', {
//                         autoClose: 2000, // Duration in milliseconds (2 seconds)
//                       });
//                      sessionStorage.setItem('username',username);
//                      sessionStorage.setItem('token',resp.token);
//                      sessionStorage.setItem('role',resp.user.role);
//                      sessionStorage.setItem('id',resp.user.id);
//                    usenavigate('/');
//                    setTimeout(function() {
//                     window.location.reload();
//                   }, 3000);
//                 }
             
//             }).catch((err) => {
//                 toast.error('Login Failed due to :' + err.message);
//             });
//         }
//     }
//     const validate = () => {
//         let result = true;
//         if (username === '' || username === null) {
//             result = false;
//             toast.warning('Please Enter Username');
//         }
//         if (password === '' || password === null) {
//             result = false;
//             toast.warning('Please Enter Password');
//         }
//         return result;
//     }
//     return (

        
//         <div className="row">
           
//             <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
//                 <form onSubmit={ProceedLoginusingAPI} className="container">
//                     <div className="card">
//                         <div className="card-header">
//                             <h2>User Login</h2>
//                         </div>
//                         <div className="card-body">
//                             <div className="form-group">
//                                 <label>User Name <span className="errmsg">*</span></label>
//                                 <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
//                             </div>
//                             <div className="form-group">
//                                 <label>Password <span className="errmsg">*</span></label>
//                                 <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
//                             </div>
//                         </div>
//                         <div className="card-footer">
//                             <button type="submit" className="btn btn-primary">Login</button> |
//                             <Link className="btn btn-success" to={'/register'}>New User</Link>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Appheader from "../HeaderComponent/Appheader";
import "./Login.css"; 
import { Modal } from "react-bootstrap"; 



const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control the login popup

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = { username: username, password: password };
      fetch("https://localhost:7150/api/Auth/Login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("Login failed, invalid credentials");
          } else {
            toast.success("Success", {
              autoClose: 2000, // Duration in milliseconds (2 seconds)
            });
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("token", resp.token);
            sessionStorage.setItem("role", resp.user.role);
            sessionStorage.setItem("id", resp.user.id);
            usenavigate("/");
            setTimeout(function () {
              window.location.reload();
            }, 3000);
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLoginClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
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
              <Link className="nav-link" to="#" onClick={handleLoginClick}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                New User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header  >
          <Modal.Title>User Login <span style={{ float: 'right', cursor: 'pointer', fontSize: '20px' ,marginLeft:'328px',marginTop:'-10px',position:'absolute'}}onClick={handleModalClose} >
              &#x2716;
            </span> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ProceedLoginusingAPI}>
            <div className="form-group">
              <label>User Name</label>
              <input
                value={username}
                onChange={(e) => usernameupdate(e.target.value)}
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => passwordupdate(e.target.value)}
                className="form-control"
              ></input>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>



      {/* Slider */}

      <div className="slider">
  <div className="slider-h3">
    Lorem Ipsum is simply dummy text of the <br />
    printing and typesetting industry.
    <div style={{ paddingTop: 30 }}>
      <a href="#" className="btn">
        Click Here!
      </a>
    </div>
  </div>
</div>


      

      {/* Footer */}


      <div className="footer">
  <div className="footer-parts">
    <div className="footer-parts-h4">Get In Touch</div>
    <ul>
      <li>
        <a href="#">
          <i className="fa fa-phone" />
          &nbsp; +91-9963XXXX68
        </a>
      </li>
      <li>
        <a href="mailto:info@freetimelearning.com">
          <i className="fa fa-envelope" />
          &nbsp; info@freetimelearning.com
        </a>
      </li>
    </ul>
  </div>
  <div className="footer-parts">
    <div className="footer-parts-h4">Extra Links</div>
    <ul>
      <li>
        <a href="#">Blog</a>
      </li>
      <li>
        <a href="#">Careers</a>
      </li>
      <li>
        <a href="#">Terms &amp; Conditions</a>
      </li>
    </ul>
  </div>
  <div className="footer-parts">
    <div className="footer-parts-h4">Extra Links</div>
    <ul>
      <li>
        <a href="#">Appointments</a>
      </li>
      <li>
        <a href="#">Find a Doctor</a>
      </li>
      <li>
        <a href="#">Insurance</a>
      </li>
    </ul>
  </div>
  <div className="footer-parts">
    <div className="footer-parts-h4">Social Links</div>
    <br />
    <div style={{ paddingLeft: 20, fontSize: 22 }}>
      <a href="https://www.facebook.com/freetimelearn/" target="_blank">
        <i className="fa fa-facebook" />
      </a>{" "}
      &nbsp; &nbsp;
      <a
        href="https://www.linkedin.com/in/free-time-learn-07598b143/"
        target="_blank"
      >
        <i className="fa fa-linkedin" />
      </a>{" "}
      &nbsp; &nbsp;
      <a href="https://twitter.com/freetimelearn" target="_blank">
        <i className="fa fa-twitter" />
      </a>{" "}
      &nbsp; &nbsp;
      <a href="https://plus.google.com/101612697119159092378" target="_blank">
        <i className="fa fa-google-plus" />
      </a>
    </div>
  </div>
  <div className="clearfix" />
  <div className="copyrights">
    <div className="copyrights-left">
      © 2018. All rights reserved by{" "}
      <a href="http://www.freetimelearning.com" target="_blank">
        Free Time Learn
      </a>
      .
    </div>
    <div className="copyrights-right">
      Designed by{" "}
      <a href="http://www.freetimelearning.com" target="_blank">
        F T L
      </a>
    </div>
  </div>
</div>

    </>
  );
};

export default Login;