import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
        this.state={
        
        }
    }
    

    render() {
        let isloggedin="false"
        if(localStorage.getItem("isloggedin")==="true")
        isloggedin="true";
        let applicant=false;
        if(localStorage.getItem("user_type")==="Applicant")
        applicant=true;
        let recruiter=false;
        if(localStorage.getItem("user_type")==="Recruiter")
        recruiter=true;
        console.log(isloggedin)
        console.log(applicant)
        console.log(recruiter)
        return (
            
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                { isloggedin==="true" ? " ": <Link to="/" className="navbar-brand">Login</Link>}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            {  (isloggedin==="true" && applicant)?  <Link to="/users" className="nav-link">ApplyNow</Link>:""}
                            </li>
                            <li className="navbar-item">
                            {  (isloggedin=="true" && recruiter)?  <Link to="/users2" className="nav-link">Dashboard</Link>:""}
                            </li>
                            <li className="navbar-item">
                            {  isloggedin==="true"?  " ": <Link to="/register" className="nav-link">Register</Link>}
                            </li>
                            <li className="navbar-item">
                            {  (isloggedin==="true" &&applicant)? <Link to="/profile" className="nav-link">MyProfile</Link>:""}
                            </li>
                            <li className="navbar-item">
                            {  (isloggedin==="true" && recruiter)?<Link to="/profile2" className="nav-link">MyProfile</Link>:""}
                            </li>
                            <li className="navbar-item">
                            {  (isloggedin==="true" &&applicant)? <Link to="/seestatus" className="nav-link">MyApplications</Link>:""}
                            </li>
                            <li className="navbar-item">
                            {  (isloggedin==="true" && recruiter)?<Link to="/addjob" className="nav-link">PostJob</Link>:""}
                            </li>
                            <li className="navbar-item">
                            {  (isloggedin==="true" && recruiter)?<Link to="/myemp" className="nav-link">AllEmployees</Link>:""}
                            </li>
                            <li className="navbar-item">
                            <div style={{paddingLeft:500}}>
                            {isloggedin==="true" ?  <Link to="/" className="nav-link" onClick={() => {localStorage.clear();
                                window.location.href="/";}}>Logout</Link> : ""}
                            {console.log(isloggedin)} 
                            </div>
                            </li>
                            <li className="navbar-item">
                             <div  style={{paddingLeft:50}}> Hi! { (isloggedin==="true" ?   localStorage.getItem("user_name"):"")}</div>
                            </li>                           
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}