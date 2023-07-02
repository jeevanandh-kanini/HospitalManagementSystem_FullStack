
import './App.css';
import { BrowserRouter, Route, Routes ,Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './components/HeaderComponent/Appheader';


import StudentComponent from './components/StudentComponent/StudentComponent';

import AdminComponent from './components/AdminComponent/AdminComponent';
import TeacherListComponent from './components/TeacherComponent/TeacherListComponent';
import UserAppointmentList from './components/AdminComponent/UserAppointmentList';
import YourAppointments from './components/StudentComponent/YourAppointment';
import jwt_decode from 'jwt-decode';
import AppointmentsList from './components/TeacherComponent/AppointmentList';


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


// import './App.css';
// import { BrowserRouter, Route, Routes ,Navigate } from 'react-router-dom';
// import Home from './Home';
// import Login from './Login';
// import Register from './Register';
// import { ToastContainer } from 'react-toastify';
// import Appheader from './Appheader';
// import Dashboard from './Dashboard';
// import CustomerDetails from './CustomerDetails';
// import CustomerDetailsTable from './CustomerDetailsTable';
// import StudentComponent from './StudentComponent';
// import TeacherComponent from './TeacherComponent';
// import AdminComponent from './AdminComponent';
// import TeacherListComponent from './TeacherListComponent';
// import LandingPage from './LandingPage';

// function App() {
//   const USER_TYPES ={
//     student:'student',
//     teacher:'teacher',
//     admin:'admin'
//   }

//   const CURRENT_USER_TYPE = sessionStorage.getItem('role');

//   return (
//     <div className="App">
//       <ToastContainer theme='colored' position='top-center'></ToastContainer>
//       <BrowserRouter>
//         <Appheader></Appheader>
//         <Routes>
//           <Route path='/' element={<LandingPage />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/home' element={<Home />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/CustomerDetails' element={<TeacherElement><CustomerDetails/></TeacherElement>}></Route>
//           <Route path='/CustomerDetailsTable' element={<AdminElement><CustomerDetailsTable/></AdminElement>}></Route>
//           <Route path='/student' element={<StudentElement><StudentComponent/></StudentElement>}></Route>
//           <Route path='/teacher' element={<TeacherElement><TeacherComponent/></TeacherElement>}></Route>
//           <Route path='/admin' element={<AdminElement><AdminComponent/></AdminElement>}></Route>
//           <Route path='/teacherlist' element={<AdminElement><TeacherListComponent/></AdminElement>}></Route>
//           <Route path='*' element={<div>Page Not Found</div>}></Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );

//   function StudentElement({children}){
//     if (CURRENT_USER_TYPE === USER_TYPES.student){
//       return <>{children}</>
//     } else {
//       return <Navigate to={"/"} />;
//     }
//   }

//   function TeacherElement({children}){
//     if (CURRENT_USER_TYPE === USER_TYPES.teacher){
//       return <>{children}</>
//     } else {
//       return <Navigate to={"/"} />;
//     }
//   }

//   function AdminElement({children}){
//     if (CURRENT_USER_TYPE === USER_TYPES.admin){
//       return <>{children}</>
//     } else {
//       return <div>You don't have access</div>;
//     }
//   }
// }

// export default App;