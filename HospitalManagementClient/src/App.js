import './App.css';
import { BrowserRouter, Route, Routes ,Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './components/HeaderComponent/Appheader';


import StudentComponent from './components/PatientComponent/PatientComponent';

import AdminComponent from './components/AdminComponent/AdminComponent';
import TeacherListComponent from './components/AdminComponent/DoctorListComponent';
import UserAppointmentList from './components/AdminComponent/UserAppointmentList';
import YourAppointments from './components/PatientComponent/YourAppointment';
import jwt_decode from 'jwt-decode';
import AppointmentsList from './components/DoctorsComponents/AppointmentList';


function App() {


  
const USER_TYPES ={
  patient:'patient',
  doctor:'doctor',
  admin:'admin'
}



let token1 = sessionStorage.getItem('role');




const CURRENT_USER_TYPE = token1;

















  return (

    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home/>}></Route>


        
        <Route path='/register' element={<Register/>}></Route>



        <Route path='/student' element={<StudentElement><StudentComponent/></StudentElement>}></Route>
        <Route path='/yourappointment' element={<StudentElement><YourAppointments></YourAppointments></StudentElement>}></Route>
        
        <Route path='/appointmentlist' element={<TeacherElement><AppointmentsList></AppointmentsList></TeacherElement>}></Route>
        <Route path='/admin' element={<AdminElement><AdminComponent/></AdminElement>}></Route>
        <Route path='/teacherlist' element={<AdminElement><TeacherListComponent/></AdminElement>}></Route>

        <Route path='/userappointmentlist' element={<AdminElement><UserAppointmentList></UserAppointmentList></AdminElement>}></Route>
        <Route path='*' element={<div>Page Not Found</div>}></Route>
        <Route path='none' element={<div>Page Under Contruction</div>}></Route>
      
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );

  function StudentElement({children}){
    if(
      CURRENT_USER_TYPE===USER_TYPES.patient
    ){
      return <>{children}</>
    }
    else{
      return <Navigate to={"/"}/>;
    }
  }
  
  function TeacherElement({children}){
    if(
      CURRENT_USER_TYPE===USER_TYPES.doctor
    ){
      return <>{children}</>
    }
    else{
      return <Navigate to={"/"}/>;
    }
  }


    function AdminElement({children}){
      if(
        CURRENT_USER_TYPE=== USER_TYPES.admin
      ){
        return <>{children}</>
      }
      else{
        return <div>You dont Have Access</div>;
      }
      
    }
    
  }


  






export default App;
