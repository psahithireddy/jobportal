import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from 'bootstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ReactEncrypt from 'react-encrypt';
import Profile from '../Users/Profile';
import App from '../../App';
import { LocalActivity } from '@material-ui/icons';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users:'',
            users1:'',
            recruiters:'',
            islogged:false,
            email:'',
            found:'',
            found2:'',
            password:'',
            date:null
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
    }
    onChangeEmail(event) {
     
        this.setState({ email: event.target.value });
        
    }
    onChangePassword(event){
       
        this.setState({password:event.target.value});
        
       
    }
    onSubmit(e) {
        
        e.preventDefault();
       // this whole is just to check if he is crct user, mp needs to shift to backens :(
        var role=' ';
        this.setState({found1:"found"})
        localStorage.setItem('isloggedin',"false");
        const array1=this.state.password;
        axios.post('http://localhost:4000/user/login',{email:this.state.email})
        .then(response => {
            this.setState({users:response.data});
            console.log(response.data.name)
            const ismatch=bcrypt.compareSync(array1,this.state.users.password)
            console.log(this.state.password)
            if(this.state.users.type=="Applicant" && ismatch)
            {
                window.alert("found")
                localStorage.clear();
                localStorage.setItem('user_type', this.state.users.type);
                localStorage.setItem('user_id',this.state.users._id);
                localStorage.setItem('user_name', this.state.users.name);
                localStorage.setItem('isloggedin',"true");
                localStorage.setItem('user_email', this.state.users.email);
               // this.props.history.push("/");
                window.location.reload();
            }
            else
            {
             window.alert("not applicant")
            }
        }) 
        .catch(function(error) {
            localStorage.setItem("found1","notfound");
            console.log(error);

        })
        
         axios.post('http://localhost:4000/recruiter/login',{email:this.state.email})
        .then(response => {
            this.setState({recruiters: response.data});
            console.log(response.data)
            const ismatch1=bcrypt.compareSync(array1,this.state.recruiters.password)
            console.log(this.state.password)
            if(this.state.recruiters.type=="Recruiter" && ismatch1)
            {
                window.alert("found")
                localStorage.clear();
                localStorage.setItem('user_type', this.state.recruiters.type);
                localStorage.setItem('user_id',this.state.recruiters._id);
                localStorage.setItem('user_name', this.state.recruiters.name);
                localStorage.setItem('isloggedin',"true");
                localStorage.setItem('user_email', this.state.recruiters.email);
                //this.props.history.push("/");
               window.location.reload();
            }
            else
            {
                window.alert("not recruiter")
            }}
            )
        .catch(function(error) {
          // localStorage.setItem("found2","notfound");
           //this.setState({found2:"notfound"})
            console.log(error);
          
        }
       
        )   
     
      console.log(localStorage)
      this.setState({
          email:'',
          password:''
      })
    }
    componentDidUpdate(){
        if(this.state.found1=="found")
        {
            if(this.state.users=="" && this.state.recruiters=="")
            {window.alert("invalid credentials")
             console.log("update m")}
             this.setState({found1:"notf"})
        }
       
        
    }

 /*   componentDidUpdate() {
  
        if(this.state.recruiters !="") 
        {
            console.log("yes please")
            const ismatch1=bcrypt.compareSync(this.state.password,this.state.recruiters.password)
            if(this.state.recruiters.type=="Recruiter" && ismatch1)
            {
            
                localStorage.setItem('user_type', this.state.recruiters.type);
                localStorage.setItem('user_name', this.state.recruiters.name);
                localStorage.setItem('isloggedin',true);
                localStorage.setItem('user_email', this.state.recruiters.email);
                this.props.history.push("/");
                window.location.reload();
            }
            else
            {
                window.alert("invalid credentials")
            }

        }
        else if(this.state.users != "")
        {
            console.log("yes please")
            const ismatch=bcrypt.compareSync(this.state.password,this.state.users.password)
            if(this.state.users.type=="Applicant" && ismatch)
            {
                localStorage.setItem('user_type', this.state.users.type);
                localStorage.setItem('user_name', this.state.users.name);
                localStorage.setItem('isloggedin',true);
                localStorage.setItem('user_email', this.state.users.email);
            }
            else
            {
                window.alert("invalid credentials")
            }
        }
    }*/

    render() {
        return (
            <Container  component="main" maxWidth="xs">
            <CssBaseline /> 
                <div className="form-group">
                </div>               
                <div style={{paddingLeft:170}}>              
                <Avatar >                    
            </Avatar> 
            </div>
            <div style={{paddingLeft:160 }}> <h5>LogIn</h5></div>  
            <div>
            <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        
                        <input type="submit" value="Login" className="btn btn-primary" style={{marginLeft:160}}/>
                
                    </div>  
                    <div style={{paddingLeft:100}}>
                        <a href="http://localhost:3000/register">Don't have a account? SignUp</a>
                    </div>
                   
                    
                </form>          
           </div>
           </Container>
        )
        
    }
}