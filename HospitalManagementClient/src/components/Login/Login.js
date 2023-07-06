



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.css"; 
import { Modal } from "react-bootstrap"; 







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
          toast.error("Login Failed due to :" +"User Not Found Or Invalid Password");
          console.log(err)
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
            <li  className="nav-item">
              <Link className="nav-link" to="#" onClick={handleLoginClick}>
                <span style={{marginRight:'1px'}}>Login</span> <i id="sign-in" class="fa fa-sign-in" aria-hidden="true"></i> 
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
      <h1>Take the world's best Quality Treatment</h1>
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
 

 


  <div className="footer">
  <div className="container">
    <div className="row">
      <div className="col-lg-4 col-sm-4 col-xs-12">
        <div className="single_footer">
          <h4>Services</h4>
          <ul>
            <li>
              <a href="none">Book Appointment</a>
            </li>
            <li>
              <a href="none">View Our Doctor</a>
            </li>
            <li>
              <a href="none">Hassle Free Appointment</a>
            </li>
          
          </ul>
        </div>
      </div>
      {/*- END COL */}
      
      {/*- END COL */}
      <div className="col-md-4 col-sm-4 col-xs-12">
        <div className="single_footer single_footer_address">
          <h4>Subscribe today</h4>
          <div className="signup_form">
           
          </div>
        </div>
        <div className="social_profile">
          <ul>
            <li>
              <a href="none">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href="none">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a href="none">
                <i className="fab fa-google-plus-g" />
              </a>
            </li>
            <li>
              <a href="none">
                <i className="fab fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/*- END COL */}
    </div>
    {/*- END ROW */}
    <div className="row">
      <div className="col-lg-12 col-sm-12 col-xs-12">
        <p className="copyright">
          Copyright © 2019 <a href="none">PRIME LIFE</a>.
        </p>
      </div>
      {/*- END COL */}
    </div>
    {/*- END ROW */}
  </div>
  {/*- END CONTAINER */}
</div>

   

  

    </>
  );
};

export default Login;