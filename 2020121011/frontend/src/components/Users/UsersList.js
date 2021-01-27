import React, {Component} from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Jobinfo from "./jobinfo";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
//need to implement if can apply based on duration or max applicants (let this two vraibles be in userschema, then applicants part is completed,unless a job is deleted facccc)

class JobsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: [],sortedJobs: [], appliedjobs:[], sortNames:true ,sortNamer:true,sortNamed:true,search:null,minsal:0 , maxsal:null,duration:8,typejob:null};
        this.renderIcon3 = this.renderIcon3.bind(this);
        this.renderIcon1 = this.renderIcon1.bind(this);
        this.renderIcon2 = this.renderIcon2.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.onchangesearch=this.onchangesearch.bind(this);
        this.sortChangerating = this.sortChangerating.bind(this);
        this.sortChangeduration = this.sortChangeduration.bind(this);
        this.onchangeminsal=this.onchangeminsal.bind(this);
        this.changemaxsal=this.changemaxsal.bind(this);
        this.changeduration=this.changeduration.bind(this);
        this.changetypejob=this.changetypejob.bind(this);

    }
    onchangeminsal(e){ this.setState({minsal:e.target.value}, console.log(this.state.minsal))}
    changemaxsal(e){this.setState({maxsal:e.target.value}, console.log(this.state.maxsal))}
    changeduration(e){this.setState({duration:e.target.value})}
    changetypejob(e){this.setState({typejob:e.target.value})}
    onchangesearch(e)
    {
        this.setState({search:e.target.value})
    }

    componentDidMount() {
        axios.get('http://localhost:4000/job')
             .then(response => {
                 this.setState({jobs: response.data, sortedJobs:response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
             const newval={
                 app_id:localStorage.getItem("user_id")
             }
             axios.post("http://localhost:4000/application/applist",newval)
             .then(response =>{
                this.setState({appliedjobs: response.data});
             })
             .catch(function(error) {
               window.alert("post error")
           })
    }

    sortChange(){
/*
 *      Note that this is sorting only at front-end.
 */
        var array = this.state.jobs;
        var flag = this.state.sortNames;
        array.sort(function(a, b) {
            if(a.salary != undefined && b.salary != undefined){
                return ((1 - flag*2) * (a.salary - b.salary));
                //console.log("abe ok")
            }
            else{
                return 1;
                console.log("kuch gadbad")
            }
          });
        this.setState({
            jobs:array,
            sortNames:!this.state.sortNames,
        })
    }
    sortChangerating(){
        /**
         *      Note that this is sorting only at front-end.
         */
                var array = this.state.jobs;
                var flag = this.state.sortNamer;
                array.sort(function(a, b) {
                    if(a.rating!= undefined && b.rating != undefined){
                       // console.log("abe ok")
                        return ((1 - flag*2) * (a.rating - b.rating));
                        
                    }
                    else{
                        console.log("kuch gadbad")
                        return 1;  
                    }
                  });
                this.setState({
                    jobs:array,
                    sortNamer:!this.state.sortNamer,
                })
            }
            sortChangeduration(){
                /**
                 *      Note that this is sorting only at front-end.
                 */
                        var array = this.state.jobs;
                        var flag = this.state.sortNamed;
                        array.sort(function(a, b) {
                            if(a.duration!= undefined && b.duration != undefined){
                               // console.log("abe ok")
                                return ((1 - flag*2) * (a.duration - b.duration));
                                
                            }
                            else{
                                console.log("kuch gadbad")
                                return 1;  
                            }
                          });
                        this.setState({
                            jobs:array,
                            sortNamed:!this.state.sortNamed,
                        })
                    }

    renderIcon1(){
        if(this.state.sortNames){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    renderIcon2(){
        if(this.state.sortNamer){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    renderIcon3(){
        if(this.state.sortNamed){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    render() {
        return (
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true} 
                        value={this.state.search}
                        onChange={this.onchangesearch}  
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        />
                    </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} value={this.state.minsal} onChange={this.onchangeminsal} />
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true} value={this.state.maxsal} onChange={this.changemaxsal}/>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                            <div className="form-group"> 
                            <label>Duration:</label>
                            <select className="form-control" value={this.state.duration} onChange={this.changeduration}> 
                            <option type="Number" value="1">1</option> 
                            <option value="2">2</option> 
                            <option value="3">3</option> 
                            <option value="4">4</option> 
                            <option value="5">5</option> 
                            <option value="6">6</option> 
                            <option value="7">7</option> 
                            <option value="8">8</option> 
                            </select>
                            </div>
                            </ListItem>
                            <Divider/>
                            <ListItem button divider>
                            <div className="form-group"> 
                            <label>Job Type:</label>
                            <select className="form-control" value={this.state.typejob} onChange={this.changetypejob}> 
                            <option value="Fulltime">Full-time</option> 
                            <option value="Parttime">Part-time</option> 
                            <option value="Workfromhome">Work-from-home</option>  
                            </select>
                            </div>
                            </ListItem>
                            
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            
                                            <TableCell>Title</TableCell>
                                            <TableCell><Button onClick={this.sortChange}>{this.renderIcon1()}</Button>Salary</TableCell>
                                            <TableCell><Button onClick={this.sortChangerating}>{this.renderIcon2()}</Button>Rating</TableCell>
                                            <TableCell><Button onClick={this.sortChangeduration}>{this.renderIcon3()}</Button>Duration</TableCell>
                                            <TableCell>TypeofJob</TableCell>
                                            <TableCell>Click to view and apply</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   
                                    {this.state.jobs.map((job,ind) =>{
                                         const where ={
                                            pathname:"/jobinfo/"+job._id,
                                            test:"test",
                                            index:ind,
                                            job:job
                                            };
                                            //console.log(ind)
                                        var array=this.state.appliedjobs
                                        let mark=false;
                                        for(var i=0;i<array.length;i++)
                                        {
                                            if(array[i].job_id===job._id)
                                            mark=true
                                        }
                                       
                                        const g1= new Date(Date.now())
                                        const g2 = new Date(job.deadline)
                                        //all the filters
                                   
                                        
                                        if (g1.getTime() < g2.getTime() && (this.state.search==null || job.title.includes(this.state.search)) && (job.salary>=this.state.minsal) && (job.salary<=this.state.maxsal || this.state.maxsal==null || this.state.maxsal.length==0) && (job.type_of_job==this.state.typejob || this.state.typejob==null) && (job.duration<this.state.duration) && job.jobstatus!="deleted")
                                        return(
                                      
                                         <TableRow key={ind}>
                                             <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.salary}</TableCell>
                                            <TableCell>{job.rating}</TableCell>
                                            <TableCell>{job.duration}</TableCell>
                                            <TableCell>{job.type_of_job}</TableCell>
                                            <TableCell>
                                            { mark ?  <Button color="primary" disabled>Applied</Button>:<Link to={where}> 
                                            {(job.max_applicants<=job.currentapplications ||job.max_positions<=job.currentpositions )?
                                           <Button variant="contained" color="secondary" onClick={()=>{
                                            console.log(ind)
                                            //localStorage.setitem("index",ind)    
                                            
                                             
                                         }}>Full</Button>
                                           
                                           
                                           : <Button variant="contained"color="primary" onClick={()=>{
                                           console.log(ind)
                                           //localStorage.setitem("index",ind)    
                                           
                                            
                                        }}>Apply</Button>}</Link> }</TableCell>
                                        </TableRow>
                                        )
                                    }
                                    )}
                                
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
        )
    }
}

export default JobsList;