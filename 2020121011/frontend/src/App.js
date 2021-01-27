import React,{Component,useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
//dashboards who all applied  and what all i applied&status
import Dashboardrec from './components/Recruiters/Dashboardrec'
import Dashboard from './components/Users/Dashboard'
import Allemp from './components/Recruiters/allemp'
//  add and apply
import Addjob from './components/Recruiters/Addjobs.js'
import UsersList from './components/Users/UsersList' //userlist==applyjob
//common
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
//profiles
import Profile from './components/Users/Profile'
import Profilerec from './components/Recruiters/Profilerec'
//view job and applicants
import Jobinfo from './components/Users/jobinfo';
import appliinfo from './components/Recruiters/appliinfo.js';
import jobedit from './components/Recruiters/jobedit';

//we are making userlists as to search and apply for new jobs ,since it has some inbuilt filters already and onclick takes to job description page.lets see

function App(){
  let user_type = localStorage.getItem('user_type');
 
 // console.log(this.state.isloggedin)
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route exact path="/" render={()=>{
          if(user_type === "Applicant"){
            return <Profile/>
          }
          else if(user_type === "Recruiter"){
            return <Profilerec/>
          }
          else{
            return <Home/>
          }
        }} />
        <Route path="/register" component={Register}/>
       

       <Route path="/users" exact component={UsersList}/>
        <Route path="/addjob" exact component={Addjob}/>

        <Route path="/users2" exact component={Dashboardrec}/>
        <Route path="/seestatus" exact component={Dashboard}/>
        <Route path="/myemp" exact component={Allemp}/>
        <Route path="/jobinfo/:id" exact component={Jobinfo}/>
        <Route path="/appliinfo/:id" exact component={appliinfo}/>
        <Route path="/jobedit/:id" exact component={jobedit}/>
        <Route path="/profile" component={()=><Profile  test="test" />}/>
        <Route path="/profile2" component={()=><Profilerec  test="test"/>}/>
      </div>
    </Router>
  );
}

export default App;
//<Route path="/" exact component={Home}/>

//{ isloggedin ? "": <Home test="test" isloggedin={isloggedin} setlogin={setlogin} />}
//<Route path="/" exact component={()=><Home test="test" />}  />