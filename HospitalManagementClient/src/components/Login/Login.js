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

import "./Login.css"; 
import { Modal } from "react-bootstrap"; 


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
// import '@fortawesome/fontawesome-svg-core/styles.css';




import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


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






  // Appointment

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('');
  const [service, setService] = useState('emergencyservice');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create the data object
    const data = {
      name: name,
      date: date,
      number: number,
      service: service
    };

    // Send a POST request to the API endpoint
    fetch('https://localhost:7150/api/Appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          // The request was successful
          toast.success("Appointment Booked Successfully You will Get A Call From Our Side Soon", {
            autoClose: 5000, // Duration in milliseconds (2 seconds)
          });
          // Reset the form
          setName('');
          setDate('');
          setNumber('');
          
          setService('emergencyservice'); // Set default value
        } else {
          // There was an error with the request
          alert('Failed to book appointment. Please try again later.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 












  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <Link className="navbar-brand" to="">
        <a href="https://ibb.co/6XfrSDB">
  <img
    src="https://i.ibb.co/6XfrSDB/134689637-padded-logo.png"
    alt="134689637-padded-logo"
    border={0}
    id="logo"
  />
</a>
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


      <div className="container1">
    <section>
      <em>WELCOME TO PRIME LIFE MEDICAL CENTER</em>
      <h1>Take the world's best quality Treatment</h1>
      <h4>
      Choose us for reliable and comprehensive healthcare, and embark on a journey towards improved well-being and a healthier life.




      </h4>
      
    </section>
  </div>
  {/*SECTION1*/}
  <section className="section1">
    <table>
      <tbody>
        <tr>
          <td>
          <div className="form">
  <h4>REQUEST FOR YOUR</h4>
  <h1>Consultation</h1>
  <form onSubmit={handleSubmit}>
    <input required
      type="text"
      name="fname"
      placeholder="Name"
      maxLength={60}
      
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
   
    <input required
      type="date"
      name="date"
      placeholder=""
      
      value={date}
      onChange={(event) => setDate(event.target.value)}
    />
    <input required
      type="number"
      name="number"
      placeholder="Phone Number"
      maxLength={10}
      
      value={number}
      
      onChange={(event) => setNumber(event.target.value)}
    />
    <select name="service" value={service} onChange={(event) => setService(event.target.value)}>
      <option value="emergencyservice">Emergency Service</option>
      <option value="certifiedservice">General Service</option>
    </select>
    <button type="submit" className="btn2" >
      BOOK APPOINTMENT
    </button>
  </form>
</div>

          </td>
          <td>
            <em>ABOUT US</em>
            <h1>Get better care for your health</h1>
            <p>
            Experience superior healthcare and get better care for your health with our exceptional medical services.
Trust our dedicated team of professionals to provide you with personalized and compassionate care, tailored to your unique needs.

            </p>
            <p>
            We prioritize your well-being and strive to deliver the highest quality of medical treatments and services.
With our expertise, advanced technology, and patient-centered approach, we are committed to helping you achieve optimal health outcomes.{" "}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  {/*SECTION2*/}
  <section className="section2">
    <div className="cards">
      <div className="card">
        <i className="fa fa-medkit" />
        <h1>Qualified Doctors</h1>
        <p>
        
        Trust our highly qualified doctors for exceptional care across specialties. Receive top-notch treatment from our competent professionals, ensuring your well-being.
        </p>
      </div>
      <div className="card">
        <i className="fa fa-certificate" />
        <h1>Certified Services</h1>
        <p>
        Choose our hospital for certified services that meet your healthcare needs. Experience high-quality care and reliable treatments backed by our commitment to excellence and industry standards.
        </p>
      </div>
      <div className="card">
        <i className="fa fa-stethoscope" />
        <h1>Advanced Equipment</h1>
        <p>
        Equipped with advanced technology, our hospital ensures cutting-edge care. Experience the benefits of state-of-the-art equipment for accurate diagnoses and effective treatments.
        </p>
      </div>
      <div className="card">
        <i className="fa fa-heartbeat" />
        <h1>Emergency Service</h1>
        <p>
        Our hospital's emergency service is available 24/7, providing immediate and compassionate care when you need it most.
        </p>
      </div>
    </div>
  </section>
  {/*SECTION3*/}
  <section className="section3">
    <div className="cards1">
      <div className="card1">
        <section>
          <h1>Laboratory Services</h1>
          <h4>Reliable diagnostics, advanced labs. Trust our accurate results for comprehensive testing.</h4>
        </section>
      </div>
      <div className="card1">
        <section>
          <h1>General Treatment</h1>
          <h4>Comprehensive care for all. Trust our expertise for effective treatments.</h4>
        </section>
      </div>
      <div className="card1">
        <section>
          <h1>Orthopedician</h1>
          <h4>Expert orthopedic care for your well-being.</h4>
        </section>
      </div>
    </div>
    <div className="content">
      <h1>We are well experienced doctors</h1>
      <p>
      With years of experience, our doctors deliver trusted expertise and quality care.{" "}
      </p>
    </div>
  </section>
  {/*SECTION4*/}
  <section className="section4">
    <div className="title_header">
      <h1>Our Gallery Portfolio</h1>
    </div>
    <div className="row">
      <div className="column">
        <img
          src="https://www.sriramachandra.edu.in/medical/images/superdelux1.jpg"
          style={{ width: "100%" ,height:"157px"}}
          onclick="openModal();currentSlide(1)"
          className="hover-shadow cursor"
          alt="doctor-img"
        />
      </div>
      <div className="column">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhJPzZQ_vYTpfs_rNLN-Z-4nl8-IRKgDF_Zw&usqp=CAU"
          style={{ width: "100%",height:"157px" }}
          onclick="openModal();currentSlide(2)"
          className="hover-shadow cursor"
          alt=""
        />
      </div>
      <div className="column">
        <img
          src="https://www.breachcandyhospital.org/sites/default/files/insideq1-compressed.jpg"
          style={{ width: "100%",height:"157px" }}
          onclick="openModal();currentSlide(3)"
          className="hover-shadow cursor"
          alt=""
        />
      </div>
      <div className="column">
        <img
          src="https://collectivemedical.com/wp-content/uploads/2019/10/patientwithnurse.jpeg"
          style={{ width: "100%" ,height:"157px"}}
          onclick="openModal();currentSlide(4)"
          className="hover-shadow cursor"
          alt=""
        />
      </div>
      <div className="column">
        <img
          src="https://www.criticarehospital.co.in/wp-content/uploads/2022/09/infra-1.jpg"
          style={{ width: "100%" ,height:"157px"}}
          onclick="openModal();currentSlide(5)"
          className="hover-shadow cursor"
          alt=""
        />
      </div>
      <div className="column">
        <img
          src="https://www.healthdesign.org/sites/default/files/styles/flexslider_full/public/resource-images/porcupine_resize.jpg?itok=BSgiqmvQ"
          style={{ width: "100%",height:"157px" }}
          onclick="openModal();currentSlide(6)"
          className="hover-shadow cursor"
          alt=""
        />
      </div>
      <div className="column">
        <img
          src="https://www.rajagirihospital.com/userfiles/services/ab660b7d99ee413aa785af055c0802ea.png"
          style={{ width: "100%" ,height:"157px"}}
          onclick="openModal();currentSlide(7)"
          className="hover-shadow cursor"
          alt=""
        />
      </div>
      <div className="column">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxAYDVsHl28Wrzq9aCNu_40_8n-vKPLAhEGw&usqp=CAU"
          style={{ width: "100%" ,height:"157px"}}
          onclick="openModal();currentSlide(8)"
          className="hover-shadow cursor"
          alt=""
        />
      </div>
    </div>
    <div id="myModal" className="modal">
      <span className="close cursor" onclick="closeModal()">
        ×
      </span>
      <div className="modal-content">
        <div className="mySlides">
          <div className="numbertext">1 / 7</div>
          <img
            src="https://i.ibb.co/Sft7gKp/bg2.webp"
            className="animate"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
        <div className="mySlides">
          <div className="numbertext">2 / 7</div>
          <img
            src="https://i.ibb.co/Sft7gKp/bg2.webp"
            className="animate"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
        <div className="mySlides">
          <div className="numbertext">3 / 7</div>
          <img
            src="https://i.ibb.co/Sft7gKp/bg2.webp"
            className="animate"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
        <div className="mySlides">
          <div className="numbertext">4 / 7</div>
          <img
            src="https://i.ibb.co/Sft7gKp/bg2.webp"
            className="animate"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
        <div className="mySlides">
          <div className="numbertext">5 / 7</div>
          <img
            src="https://i.ibb.co/Sft7gKp/bg2.webp"
            className="animate"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
        <div className="mySlides">
          <div className="numbertext">6 / 7</div>
          <img
            src="https://i.ibb.co/Sft7gKp/bg2.webp"
            className="animate"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
        <div className="mySlides">
          <div className="numbertext">7 / 7</div>
          <img
            src="https://i.ibb.co/Sft7gKp/bg2.webp"
            className="animate"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
        <a href="sv" className="prev" onclick="plusSlides(-1)"> 
          ❮
        </a>
        <a href="sd" className="next" onclick="plusSlides(1)">
          ❯
        </a>
        <div className="caption-container">
          <p id="caption" />
        </div>
      </div>
    </div>
  </section>
  {/*FOOTER*/}
  <img src="https://i.ibb.co/ZLHbWJz/footer.png" className="footer_image" alt=""/>
  <footer>
    <div className="column">
      <a href="fc" className="footer_title">PRIME_LIFE</a>
      <a href="ds">
      Choose our hospital for certified services that meet your healthcare needs. Experience high-quality care and reliable treatments backed by our commitment to excellence and industry standards.
      </a>
      <a href="sd" title="Facebook">
      {/* <FontAwesomeIcon icon={faFacebook} /> */}
      <svg
  style={{ color: "blue" }}
  xmlns="http://www.w3.org/2000/svg"
  width={25}
  height={30}
  fill="currentColor"
  className="bi bi-facebook"
  viewBox="0 0 16 16"
>
  {" "}
  <path
    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
    fill="blue"
  />{" "}
</svg>
      </a>
      <a href="sf" title="Instagram">
      <svg
  style={{ color: "red" }}
  xmlns="http://www.w3.org/2000/svg"
  width={25}
  height={30}
  fill="currentColor"
  className="bi bi-instagram"
  viewBox="0 0 16 16"
>
  {" "}
  <path
    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
    fill="red"
  />{" "}
</svg>
      </a>
      <a href="sf" title="Twitter">
      <svg
  style={{ color: "blue" , top:"100px"}}
  xmlns="http://www.w3.org/2000/svg"
  width={25}
  height={30}
  fill="currentColor"
  className="bi bi-twitter"
  viewBox="0 0 16 16"
>
  {" "}
  <path
    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
    fill="blue"
  />{" "}
</svg>
      </a>
    </div>
    {/* <div className="column">
      <a href="ds" className="footer_title">OTHER LINKS</a>
      <a href="sd">Privacy Policy</a>
      <a href="sd">Terms &amp; Conditions</a>
      <a href="sd">Ticket</a>
      <a href="sd">Contact Us</a>
    </div> */}
    {/* <div className="column">
      <a href="se" className="footer_title">SHORT CUT</a>
      <a href="e">Our Services</a>
      <a href="e">Our Blog</a>
      <a href="e">Our Projects</a>
      <a href="e">About Us</a>
    </div> */}
   
    <div className="column">
      <a href="s" className="footer_title">GET IN TOUCH</a>
      <a href="sd" title="Address">
        <i className="fa fa-map-marker" /> 12, Vanchinathan Street, Parvathi Nagar /TamilNadu, India
        - 600063
      </a>
      <a href="emailto:" title="Email">
        <i className="fa fa-envelope" />PrimeLifeSupport@primelife.com
      </a>
      <a href="tel:" title="Contact">
        <i className="fa fa-phone" /> +(91)8248360541
      </a>
    </div>
    <div className="sub-footer">
      © CopyRights 2021 PRIME_LIFE || All rights reserved
    </div>
  </footer>

   

      {/* <div
  id="carouselExampleSlidesOnly"
  className="carousel slide"
  data-ride="carousel"
>

 
  <div className="carousel-inner">
  
    <div className="carousel-item active">
      
      <img className="d-block w-100" src="https://www.imd-soft.co.uk/media/1785/imd_hospitalwide_banner1.jpg?width=1600&height=530&mode=crop" alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://img.freepik.com/premium-psd/medical-healthcare-facebook-timeline-cover-web-banner-template_169307-1230.jpg" alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="../assets/5915088.jpg" alt="Third slide" />
    </div>
  </div>

  
</div>




<div className="card" style={{ width: 500 }}>
  <div className="row no-gutters">
    <div className="col-sm-5">
      <img
        className="card-img"
        src="/images/defaultimg.png"
        alt="Suresh Dasari Card"
      />
    </div>
    <div className="col-sm-7">
      <div className="card-body">
        <h5 className="card-title">Suresh Dasari</h5>
        <p className="card-text">
          Suresh Dasari is a founder and technical lead developer in tutlane.
        </p>
        <a href="#" className="btn btn-primary">
          View Profile
        </a>
      </div>
    </div>
  </div>
</div>


      <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-primary text-white-50">
    <div class="container text-center">
      <small>Copyright &copy; Your Website</small>
    </div>
  </footer> */}


    </>
  );
};

export default Login;