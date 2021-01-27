import React, {Component} from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import {Redirect} from 'react-router-dom';
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
import Applicantregister from "./Applicantregister";
import Recruiterregister from "./Recruiterregister"

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            users:[],
            recruiters:[],
            name: '',
            email: '',
            contact:'',
            bio:'',
            emailErrorText:'',
            instname:'',
            startyear:'',
            endyear:'',
            skillsets:'',
            password:'',
            confirmpassword:'',
            confirmPasswordErrorText:'',
            type:'',
            redirectToReferrer: false,
            date:null
        }
       
       
    this.onChange=this.onChange.bind(this);
    this.onChange1=this.onChange1.bind(this);
    this.onChange2=this.onChange2.bind(this);
    this.onChangecontact=this.onChangecontact.bind(this);
    this.onChangebio=this.onChangebio.bind(this);
    this.onChangeskills=this.onChangeskills.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeType =this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeconfirmPassword=this.onChangeconfirmPassword.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
       // this.onChangeinstname=this.onChangeinstname.bind(this);
    }
    validateEmail(e) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
      }
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        var errortext=' '
        if(!this.validateEmail(event.target.value)){
            errortext="email format error"
        }
        this.setState({ email: event.target.value ,emailErrorText: errortext });
    }
    onChangePassword(event){
        this.setState({password:event.target.value});
    }
    onChangeconfirmPassword(event){
        var errortext =' '
        if(event.target.value!=this.state.password)
        {
            errortext='passwords are not matched'
        }
        this.setState({confirmpassword:event.target.value ,confirmPasswordErrorText:errortext})    
    }
    onChangeType(event){
        console.log(event.target.value)
        this.setState({type:event.target.value})
        console.log(this.state.type)
    }
    onChange(event){
        this.setState({instname:event.target.value})
    }
    onChange1(event){this.setState({
        startyear:event.target.value
    })}
    onChange2(event){this.setState({
        endyear:event.target.value
        
    })}
    onChangeskills(event)
    {
       this.setState( {skillsets:event.target.value})
    }
    onChangebio(e)
    {
        var vr=true;
        if(e.target.value.split(' ').length > 250) {
          window.alert("max length exceeded");
          vr=false
      }
        if(vr)
        this.setState( {bio:e.target.value})
    }
    onChangecontact(e)
    {
        this.setState( {contact:e.target.value})
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/recruiter')
             .then(response => {
                 this.setState({recruiters: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    addinst(instname){
        console.log(instname)
    }
    addsy(startyear){
        console.log(startyear)
    }
    addey(endyear){
        console.log(endyear)
    }

    onSubmit(e) {
        e.preventDefault();
        //hashing the password 
        const saltRounds=1;
        const hash =  bcrypt.hashSync(this.state.password, saltRounds);
        console.log(hash);    
      
        console.log(this.state.password); 
        //checking if user already exists in database
        var found=' ';
        var array1=this.state.users;
        var array2=this.state.recruiters;
        for (var i=0; i < array1.length; i++)
        {
            if(array1[i].email===this.state.email)
            found= "found";

        }
        for (var i=0; i < array2.length; i++)
        {
            if(array2[i].email===this.state.email)
            found= "found";
        }
        console.log(found)
        if(this.state.emailErrorText==' '&& this.state.confirmPasswordErrorText==' '&& this.state.type!="" && found==' '){
        if(this.state.type == 'Applicant'){   
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: hash,
            instname:this.state.instname,
            skills:this.state.skillsets,
            endyear:this.state.endyear,
            startyear:this.state.startyear,
            type:this.state.type,
            date: Date.now(),
            noofapp:0,
            tenure:"no"
        }
        axios.post('http://localhost:4000/user/register', newUser)
             .then(res => {alert("Created\t" + res.data.name);console.log(res.data)});
             
        }
        if (this.state.type == 'Recruiter'){

            const newRecruiter = {
                name: this.state.name,
                email: this.state.email,
                contact:this.state.contact,
                bio:this.state.bio,
                password: hash,
                type:this.state.type,
                date: Date.now()
            }    
            axios.post('http://localhost:4000/recruiter/register', newRecruiter)
             .then(res => {alert("Created\t" + res.data.name);console.log(res.data)});
             
        }


        this.setState({
            name: '',
            email: '',
            type:'',
            password:'',
            confirmpassword:'',
            redirectToReferrer:true,
            date:null
        });
       
    }
    else{
        var naam=this.state.name;
        var role=this.state.type;
        if(naam=='')
        {
            window.alert("Enter credentials")
        }
        else if(found!=' ')
        {
            window.alert("Existing user") 
        }
        else if(role=='norole')
        {
            window.alert("Choose who you are")
        }
        else if(this.state.emailErrorText!=' ')
        {
            window.alert("email format error")
        }
        else if(this.state.confirmPasswordErrorText!=' ')
        {
            window.alert("error password")
        }
        else{
        window.alert("has error , unable to sign you up, try again")
        }
    }
}
     
    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
                    if (redirectToReferrer) {
                    return <Redirect to="/" />
                     }
      
        return (
            <Container  component="main" maxWidth="xs">
            <CssBaseline /> 
                <div className="form-group">
                </div>               
                <div style={{paddingLeft:170}}>              
                <Avatar >                    
            </Avatar> 
            </div>
            <div style={{paddingLeft:160 }}> <h5>SignUp</h5></div>  
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="abc"
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="abc@gmail.com"
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="password"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="text" 
                               // placeholder="confirm-password"
                               className="form-control" 
                               value={this.state.confirmpassword}
                               onChange={this.onChangeconfirmPassword}
                               />  
                    </div>
                    <div className="form-group"> 
                    <label>Role:</label>
                    <select className="form-control" value={this.state.type} onChange={this.onChangeType}> 
                    <option value="norole">Choose...</option> 
                    <option value="Applicant"> Applicant</option> 
                    <option value="Recruiter">Recruiter</option> 
                    </select>
                   </div>
                   <div>
                    {
                        this.state.type==="Applicant" ? 
                         
                        <div className="form-group">
                        <label>Institute name: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="abc"
                               value={this.state.instname}
                               onChange={this.onChange}
                               />
                       
                    <label>Startyear: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="abc"
                               value={this.state.startyear}
                               onChange={this.onChange1}
                               />
                   
                   
                    <label>Endyear: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="abc"
                               value={this.state.endyear}
                               onChange={this.onChange2}
                               />
                   
                     <label>Skills: (eg:C,Git,MERN...) </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="enter your skills"
                               value={this.state.skillsets}
                               onChange={this.onChangeskills}
                               />
                    </div>  
                                   
                         :" " 
                        }
                        {this.state.type==="Recruiter" ? 
                        <div className="form-group">
                        <label>Contact No.: </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="10 digit"
                               value={this.state.contact}
                               onChange={this.onChangecontact}
                               maxLength="10"
                               />
                       
                    <label>Bio: </label>
                        <textarea type="text" 
                               className="form-control" 
                               placeholder="max 250 words"
                               value={this.state.bio}
                               onChange={this.onChangebio}
                               />
                        </div>
                        :" "}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" style={{marginLeft:160}}/>
                    </div>
                    
                </form>
            </div>
            </Container>
        )
    }
}

 