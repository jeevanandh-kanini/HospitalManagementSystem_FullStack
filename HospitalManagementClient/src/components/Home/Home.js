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
       





        let token1 = sessionStorage.getItem('token');
       
    
        
    
        if (token1) {
            const tokenPayload = jwt_decode(token1);
            setRoleFromToken(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) // Assuming the role property is named 'Role'
        
          }
    

        let user =sessionStorage.getItem('username');
    let role =sessionStorage.getItem('role');

    setRole(role);
    setUser(user);

    }, []);



    return (
        
        <Landing></Landing>
    );
}

export default Home;