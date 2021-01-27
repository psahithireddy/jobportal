import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import WorkIcon from '@material-ui/icons/Work';
import TocIcon from '@material-ui/icons/Toc';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';
import AttachMoneyTwoToneIcon from '@material-ui/icons/AttachMoneyTwoTone';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { event } from 'jquery';

import {Redirect} from 'react-router-dom';
import { ResponsiveEmbed } from 'react-bootstrap';

class Jobinfo extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            appliedjobs:[],
            userdetails:[],
            job:[],
            currentjobs:[],
            _idi:'',
            currappli:'',
            value:0,
            sop:'',
            redirectToReferrer: false,
        }
       this.onChangesop = this.onChangesop.bind(this);
        this.applyjob = this.applyjob.bind(this);
    }
    onChangesop(event)
    {
        this.setState({sop:event.target.value})
      

    }
    applyjob(e){
        console.log(this.state.userdetails.noofapp)
      //window.alert("shanti")
      //get no.ofjobs and tenure from applicant id
      if(this.state.userdetails.noofapp===10 )
      {
          window.alert("You have reached max applications")
          this.setState({redirectToReferrer:true})
      }
      else if( this.state.userdetails.tenure==="yes")
      {
          window.alert("You are currently working ,cant apply to new jobs")
          this.setState({redirectToReferrer:true})
      }
     else{
      var vr=true;
      if(this.state.sop.split(' ').length > 250) {
        window.alert("max length exceeded");
        vr=false
    }
      if(this.state.sop!="" && vr)
      {
      const newval={
          app_id:localStorage.getItem("user_id"),
          rec_id:this.state.job.recruiter_id,
          job_id:this.props.match.params.id, 
          name:localStorage.getItem("user_name"),
          jobtitle:this.state.job.title,
          jobtype:this.state.job.type_of_job,
          status:"applied",
          dap:Date.now(),
          rating:this.state.value,
          sop:this.state.sop

      }
      var ap=false
      //post application
      axios.post("http://localhost:4000/application/addapplication",newval)
      .then(response =>{
        ap=true
      })
      .catch(function(error) {
        window.alert("Couldn't apply")
    })
    //increment no of aplicants in backend
    axios.post("http://localhost:4000/job/incjobapp",{job_id:this.props.match.params.id, })
    .then(response =>{
        console.log(response.data.currentapplications)
      })
      .catch(function(error) {
        window.alert("Couldn't inc applicant")
    })

    //increment no.ofapplications in backend

    var jobs=this.state.userdetails.noofapp 
    jobs=jobs+1
    const variable={
        "app_id":localStorage.getItem("user_id"),
        "noofapp":jobs
    }
    axios.post("http://localhost:4000/user/changenoofjob",variable)
    .then(response =>{
        window.alert("Hurrah,Applied")
      })
      .catch(function(error) {
        window.alert("Couldn't apply")
    })
    this.state={sop:" "}
    //redirect to apply jobs
    this.setState({redirectToReferrer:true})
    }
    else if(this.state.sop==="")
    {
        window.alert("please include sop")
    }
  
    }}
    componentDidMount(){
       // console.log("mount")

       //disable apply button if he reached max applications or currently working 
       const newv={app_id:localStorage.getItem("user_id")}
      axios.post("http://localhost:4000/user/getuserbyid",newv)
      .then(response =>{
        this.setState({userdetails:response.data})
      })
      .catch(function(error) {
        window.alert("Couldn't get user")
    })
    
       console.log(this.props.match.params.id ) 
       this.setState({_idi:this.props.match.params.id})
       console.log(this.state._idi)
       //check appplied jobs and check all jobs , those who arent 
        axios.post('http://localhost:4000/job/showjob',{_id:this.props.match.params.id})
        .then(response => {
            this.setState({job:response.data});
            this.setState({value:this.state.job.rating})   
           
        })
        .catch(function(error) {
            window.alert("No such Job ,going back")
        })
        
       
    }

    render(){
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer) {
        return <Redirect to="/users" />
         }
        //console.log(this.props.location.job)
        const ind=this.props.location.index
        //const job=this.props.location.job
        //console.log(this.props.location}
        return(
            <Container>
            <div>
            <h2>{this.state.job.title}</h2>
            <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating name="rating" value={this.state.value}  />
        <h6>Current applications:{this.state.job.currentapplications}</h6>
      </Box>
      <div className="form-group">
                        <label>Statement of purpose: </label>
                        <textarea type="text" 
                               className="form-control" 
                               value={this.state.sop}
                               placeholder="Do not exceed more than 250 words"
                               onChange={this.onChangesop}/>  </div>
            <div style={{paddingLeft:800}}>
                {(this.state.job.max_applicants<=this.state.job.currentapplications ||this.state.job.max_positions<=this.state.job.currentpositions )? <Button  variant="contained" color="secondary"> "Full"</Button>:
                <Button variant="contained" color="primary" onClick={() => (this.applyjob())}>Submit</Button>}</div>
            <div style={{paddingLeft:740}}>
               
                <ListItem>
                <ListItemAvatar>
                <Avatar>
            <   WorkIcon />
            </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.job.type_of_job}/>
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                <Avatar>
            <QueryBuilderIcon/>
            </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.job.duration} secondary="months"/>
                
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                <Avatar>
            <   AttachMoneyTwoToneIcon />
            </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.job.salary }secondary="rupees"/>
                
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                <Avatar>
            < HourglassFullIcon />
            </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.job.deadline}secondary="ends on"/>
                
                </ListItem>
                </div>
            <PersonIcon></PersonIcon><h6>{ this.state.job.recruiter_name}</h6>
            <MailIcon/><h6>{this.state.job.recruiter_email}</h6>
            <br></br>
            <DescriptionIcon ></DescriptionIcon>
            <p>Description : {this.state.job.description}</p>
            <br></br>
            <InfoIcon/>
            <p><b>Required_skillsets :</b> {this.state.job.Required_skillsets}</p>
            <p>Posted on :{this.state.job.date_of_posting}</p>
            <p>MaxApplications : {this.state.job.max_applicants}</p>
            <p>MaxPositions : {this.state.job.max_positions}</p>
            
            </div>
            </Container>
        )
}}
export default Jobinfo;








