import React, {Component} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles'
import NotInterestedIcon from '@material-ui/icons/NotInterested';


class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          appliedjobs:[],
          jobdetails:[],
          len:0,
          rat:null

        }
        this.onchangerating=this.onchangerating.bind(this)
      //this.getjobdetailsplease=this.getjobdetailsplease.bind(this)
      //this.ondelete=this.ondelete.bind(this)
    }
    
    onchangerating(newval)
    {
      //post job id in job schema and get details
      const par={
        "app_id":localStorage.getItem("user_id"),
        "job_id":newval.id,
        "rating":newval.rating
      }
      console.log(newval.rating)
      axios.post('http://localhost:4000/application/updaterating',{newval})
      .then(response=>{window.alert("Thanks!,rated succesfully")})

     

    
    
      
    }
    componentDidMount(){
      const app_id=localStorage.getItem("user_id")
      axios.post('http://localhost:4000/application/applist',{app_id})
      .then(response => {this.setState({appliedjobs: response.data});
      this.setState({len:this.state.appliedjobs.length})
    console.log(this.state.appliedjobs)}
   )
   axios.get('http://localhost:4000/job')
   .then(response => 
     {this.setState({jobdetails:response.data}) 
      });
   
    
    }  

    
    render(){
      
   
        const useStyles = makeStyles((theme) => ({
            root: {
              flexGrow: 1,
            },
            paper: {
              padding: theme.spacing(2),
              textAlign: 'center',
              color: theme.palette.text.secondary,
            },
          }))
          return(
            this.state.appliedjobs.length===0 ? "YOU HAVENT APPLIED TO ANYJOBS":
            this.state.appliedjobs.map((job,ind) =>{
              console.log(ind)
              console.log(this.state.appliedjobs.length)
              console.log(this.state.len)
              console.log(job.status)
              if(job.status==="deleted")
              {
                //update ur variables 
                axios.post('http://localhost:4000/user/deletedjob',{"app_id":localStorage.getItem("user_id")})
                .then(response=>{console.log("sucess")})
                axios.post('http://localhost:4000/application/permadelete',{"app_id":localStorage.getItem("user_id"),"job_id":job.job_id})
                .then(response => {window.alert("the prev job you were working was deleted by recruiter, you can now apply to other jobs")});
              }
              for(var i=0 ;i<this.state.jobdetails.length;i++)
              {
                if(job.job_id==this.state.jobdetails[i]._id)
              {console.log(this.state.jobdetails[i].title)
               
                
                
             return(
            <div className={useStyles.root} >
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <Paper className={useStyles.paper}>
                  <h5>{ind+1}  <br></br>JOB NAME : {this.state.jobdetails[i].title}</h5>
                  <br></br>
                  Job Status : {this.state.jobdetails[i].max_positions===this.state.jobdetails[i].currentpositions ? "Inactive":this.state.jobdetails.jobstatus}
                  <br></br>
                  Date of joining : {job.date_of_joining}
                  <br></br>
                  Salary per month : {this.state.jobdetails[i].salary}
                  <br></br>
                  Recruiter Name : {this.state.jobdetails[i].recruiter_name}
                  <br></br>
                  Application Status :{this.state.jobdetails[i].max_positions===this.state.jobdetails[i].currentpositions ? "Rejected":job.status}
                  <br></br>
                  Rate Job: {job.status=="accepted" ? 
                  <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend"></Typography>
                  <Rating
                    name="simple-controlled"
                    value={this.state.rat}
                    onChange={(event)=>{
                    const newval={
                        "id":job.job_id,
                         "rating":event.target.value}
                      this.onchangerating(newval)}}
                  />
                </Box>:"NA"}
                  </Paper>
                </Grid>
              </Grid>
            </div>)}}
            }))
        }
       
            
    
    }
export default Dashboard;
