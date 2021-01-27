import React, {Component} from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//here we can see who all applied and edit the job
class Dashboardrec extends Component{
    constructor(props){
        super(props);
        this.state = {postedjobs:[]}

    }
    componentDidMount() {
        axios.post('http://localhost:4000/job/whatalljobs',{_id:localStorage.getItem("user_id")})
             .then(response => {
                 this.setState({postedjobs: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
         

            
    }
    render() {
        return (
            <Container>
                <div style={{paddingLeft:300}}>
                <h5 >ALL JOBS YOU POSTED</h5>
                </div>
            <div>

                  <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                            
                                            <TableCell>Title</TableCell>
                                            <TableCell>Posted on</TableCell>
                                            <TableCell>Ends on</TableCell>
                                            <TableCell>Max applications</TableCell>
                                            <TableCell>#Currentapplications</TableCell>
                                            <TableCell>Max positions</TableCell>
                                            <TableCell>Remaining positions</TableCell>
                                            <TableCell>Jobstatus</TableCell>
                                            <TableCell>Select</TableCell>
                                            <TableCell>EditJob</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   
                                    {this.state.postedjobs.map((job,ind) =>{
                                         const where ={
                                            pathname:"/appliinfo/"+job._id,
                                            test:"test"  
                                            };
                                         const where2={
                                             pathname:"/jobedit/"+job._id
                                         }  
                                        var mark=false
                                        const g1= new Date(Date.now())
                                        const g2 = new Date(job.deadline)
                                        if (g1.getTime() < g2.getTime())
                                        mark=true
                                        if(job.jobstatus!="deleted")
                                        {
                                        return(
                                        // console.log("mind ur business");
                                       
                                         <TableRow key={ind}>
                                             <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.date_of_posting}</TableCell>
                                            <TableCell>{job.deadline}</TableCell>
                                            <TableCell>{job.max_applicants}</TableCell>
                                            <TableCell>{job.currentapplications}</TableCell>
                                            <TableCell>{job.max_positions}</TableCell>
                                            <TableCell>{job.max_positions-job.currentpositions}</TableCell>
                                            <TableCell>{job.max_positions-job.currentpositions<=0 ? "Inactive": mark? job.jobstatus :"deadlinepassed"}</TableCell>
                                           <TableCell>{job.max_positions-job.currentpositions<=0 ? " ":<Link to={where}> <Button variant="contained" onClick={()=>{
                                           console.log(ind)                                           
                                           }}>Recruit</Button></Link>}</TableCell>
                                           <TableCell><Link to={where2}><Button size="small" variant="contained" color="secondary">Edit</Button></Link></TableCell>
                                        </TableRow>
                                    )}} )}
                                                                
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                           
              
                        
            </div>
            </Container>
        )
    }
}

export default Dashboardrec;