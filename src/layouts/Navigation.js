import React from 'react';
import { Link } from "react-router-dom"; 
import"bootstrap/dist/css/bootstrap.min.css";
//Use Sign out button here
import SignOutButton from '../components/SignOut'; 


const Navigation = ({authUser}) => (
  <div>{authUser ? <NavigationAuth/>: <NavigationNonAuth/>}</div>
)
const NavigationAuth = props => (
   //Boosstrap
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
   <Link className="navbar-brand" to="/">HomePage</Link>


<button className="navbar-toggler" type="button" 
data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" 
aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id ="navbarSupportedContent">
<ul className="navbar-nav mr-auto">

 <li className="nav-item">
   <Link className="nav-link" to="/customers">Customers</Link>
 </li>

 <li className="nav-item">
   <Link className="nav-link" to="/training/">Trainings</Link>
 </li>
 <li className="nav-item">
   <Link className="nav-link" to="/calendar/">Calendar</Link>
 </li>
 <li className="nav-item">
   <Link className="nav-link" to="/signin/">SignIn</Link>
 </li>
 <li className="nav-item">
   <Link className="nav-link" to="/signup/">SignUp</Link>
 </li>
</ul>
</div>
</nav>
);
       
const NavigationNonAuth = () => (
       //Boosstrap
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <Link className="navbar-brand" to="/">HomePage</Link>
    

   <button className="navbar-toggler" type="button" 
   data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" 
   aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
   </button>

   <div className="collapse navbar-collapse" id ="navbarSupportedContent">
   <ul className="navbar-nav mr-auto">
     <li className="nav-item">
       <Link className="nav-link" to="/signin/">SignIn</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" to="/signup/">SignUp</Link>
     </li>
</ul>
</div>
</nav>

);


export default Navigation; 

