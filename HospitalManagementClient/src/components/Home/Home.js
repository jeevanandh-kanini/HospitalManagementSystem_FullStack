import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import Landing from "../LandingComponent/Landing";

const Home = () => {
    const usenavigate = useNavigate();
    const [customerlist, listupdate] = useState(null);

    const [user,setUser] =useState("");
    const [role,setRole] =useState("");

    const [rolefromtoken,setRoleFromToken] = useState("");
   
    useEffect(() => {
       

        // let jwttoken = sessionStorage.getItem('jwttoken');
        // fetch("https://localhost:44308/Customer", {
        //     headers: {
        //         'Authorization': 'bearer ' + jwttoken
        //     }
        // }).then((res) => {
        //     return res.json();
        // }).then((resp) => {
        //     listupdate(resp);
        // }).catch((err) => {
        //     console.log(err.messsage)
        // });




        let token1 = sessionStorage.getItem('token');
       
    
        
    
        if (token1) {
            const tokenPayload = jwt_decode(token1);
            setRoleFromToken(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) // Assuming the role property is named 'Role'
            // Use the role in your React component logic
          }
    

        let user =sessionStorage.getItem('username');
    let role =sessionStorage.getItem('role');

    setRole(role);
    setUser(user);

    }, []);

   

      
    // const getRoleFromToken = ()=> {
    //     const token = localStorage.getItem('jwtUserToken');
    //     if (token) {
    //       const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    //       return tokenPayload.Role;//Admin
    //     }
    //     return ''
    //   };
    
     

    return (
        // <div>
            
        //     <h1 className="text-center">Welcome to School Management Application {user} </h1>

        //     <h1 className="text-center">You Are Logged In As {role}</h1>

        //     <h1 className="text-center">Hello  {rolefromtoken}</h1>
           
        // </div>
        <Landing></Landing>
    );
}

export default Home;