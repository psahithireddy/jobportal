import React, {Component} from 'react';
import axios from 'axios';
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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
class appliinfo extends Component{
 
    constructor(props){
        super(props);
        this.state = {applicants:[],appdetails:[],jobdetails:[],sortNames:true ,sortNamer:true,sortNamed:true,names:[]}
        this.onchangestatus=this.onchangestatus.bind(this);
       // this.getapplicant=this.getapplicant.bind(this)
       this.renderIcon3 = this.renderIcon3.bind(this);
       this.renderIcon1 = this.renderIcon1.bind(this);
       this.renderIcon2 = this.renderIcon2.bind(this);
       this.sortChange = this.sortChange.bind(this);
       this.sortChangerating = this.sortChangerating.bind(this);
       this.sortChangedap = this.sortChangedap.bind(this);

    }
    //sorting
    sortChange(){
        /*
         *      Note that this is sorting only at front-end.
         */
               var array = this.state.applicants;
               console.log(array)
                var flag = this.state.sortNames;
                array.sort(function(a, b) {
                    if(a.name != undefined && b.name!= undefined){
                        console.log("ok");
                        return ((1 - flag*2) * (a.name- b.name));
                        //console.log("abe ok")
                    }
                    else{
                        return 1;
                        console.log("kuch gadbad")
                    }
                  });
                this.setState({
                    applicants:array,
                    sortNames:!this.state.sortNames,
                })
            }
            sortChangerating(){
                /**
                 *      Note that this is sorting only at front-end.
                */
                        var array = this.state.applicants;
                        var flag = this.state.sortNamer;
                        array.sort(function(a, b) {
                            if(a.ratingapp!= undefined && b.ratingapp != undefined){
                               // console.log("abe ok")
                                return ((1 - flag*2) * (a.ratingapp - b.ratingapp));
                                
                            }
                            else{
                                console.log("kuch gadbad")
                                return 1;  
                            }
                          });
                        this.setState({
                            applicants:array,
                            sortNamer:!this.state.sortNamer,
                        })
                    }
                    sortChangedap(){
                        /**
                         *      Note that this is sorting only at front-end.
                         */
                               var array = this.state.applicants;
                                var flag = this.state.sortNamed;
                                array.sort(function(a, b) {
                                    if(a.date_of_application!= undefined && b.date_of_application != undefined){
                                        //console.log("abe ok")
                                        var g1=new Date(a.date_of_application)
                                        var g2=new Date(b.date_of_application)
                                        //console.log((1 - flag*2) * ((g1) - (g2)))
                                        return ((1 - flag*2) * (g1 - g2));
                                        
                                    }
                                    else{
                                        console.log("kuch gadbad")
                                        return 1;  
                                    }
                                  });
                                this.setState({
                                    applicants:array,
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
   //need to make edit pages from dashboardrec to edit job and all status are pending 
    //this page is to accept applicants
    //we need to change all status and max applicants 
    onchangestatus(newv)
    {
        //update date and check many user permissions,increase no.of positions
       console.log(newv.status)
     
        axios.post('http://localhost:4000/application/updatestatus',{"status":newv.status,"job_id":newv.job_id,"app_id":newv.app_id})
        .then(response => {
            window.alert("updates status")})
        .catch(function(error) {window.alert("error")}) 
       
        if(newv.status==="accepted")
        {
            if(this.state.jobdetails.max_positions - this.state.jobdetails.currentpositions ===0)
            {window.alert("Positions filled ,You can't take more people")
            //need to change job status
            axios.post('http://localhost:4000/job/jobstatus',{"job_id":this.props.match.params.id,"status":"inactive"})
            .then(response => {console.log(" made job inactive")})
            .catch(function(error) {window.alert("error")}) 
            }
            else{
        axios.post('http://localhost:4000/job/incpos',{"job_id":this.props.match.params.id})
        .then(response => {console.log("inc positions successs")})
        .catch(function(error) {window.alert("error")}) 
        //update date of joining and make tenure yes(by making post to get duration)

        axios.post('http://localhost:4000/user/onacceptance',{"app_id":newv.app_id,"job_id":newv.job_id,"duration":this.state.jobdetails.duration}) 
        .then(response => {console.log("Applicant accepted")})
        .catch(function(error) {window.alert("error")}) 
        //please update date of joining in application db too and reject all applications(user m karthe h)
        axios.post("http://localhost:4000/application/joined",{"app_id":newv.app_id,"job_id":newv.job_id})
        .then(response => {window.alert("Applicant joined")})
        .catch(function(error) {window.alert("error")}) 
       }}

        else if(newv.status==="rejected")
        {
           console.log("yes");
           //dec current applications so that others can apply
        axios.post('http://localhost:4000/job/decapp',{"job_id":this.props.match.params.id})
        .then(response => {console.log("dec positions successs")})
        .catch(function(error) {window.alert("error")}) 
            //decrease his max applications
            axios.post('http://localhost:4000/user/decnoofjob',{"app_id":newv.app_id})
            .then(response => {console.log("dec max appli successs")})
            .catch(function(error) {window.alert("error")}) 

    
    }

       window.location.reload();
    }

    
    
    componentDidMount()
    {
        axios.post("http://localhost:4000/application/reclist",{job_id:this.props.match.params.id})
        .then(response => {
            this.setState({applicants: response.data});
           // console.log(this.state.applicants)
        })
        .catch(function(error) {
            console.log(error);
        })

        axios.get('http://localhost:4000/user')
        .then(response => {
            this.setState({appdetails: response.data});
            
        })
        .catch(function(error) {
            console.log(error);
        })

        axios.post('http://localhost:4000/job/showjob',{"_id":this.props.match.params.id})
        .then(response => {
            this.setState({jobdetails: response.data});
        })
        .catch(function(error) {
            console.log(error);
        })
    }

render(){
    return(
        <Container>
                <div style={{paddingLeft:300}}>
                <h5 >APPLICANTS FOR THIS JOB</h5>
                <br></br>
                <h6>JOB NAME   : {this.state.jobdetails.title}</h6>
                <h6>Remaining positions  :  {this.state.jobdetails.max_positions - this.state.jobdetails.currentpositions}</h6>
                </div>
            <div>

                  <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                            
                                            <TableCell><Button onClick={this.sortChange}>{this.renderIcon1()}</Button>Applicant Name</TableCell>
                                            <TableCell>Skills</TableCell>
                                            <TableCell><Button onClick={this.sortChangedap}>{this.renderIcon3()}</Button>Date of application</TableCell>
                                            <TableCell>education</TableCell>
                                            <TableCell>statement of purpose</TableCell>
                                            <TableCell><Button onClick={this.sortChangerating}>{this.renderIcon2()}</Button>rating</TableCell>
                                            <TableCell>status</TableCell>
                                            <TableCell></TableCell>
                                            
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   
                                    {this.state.applicants.map((app,ind) =>{

                                        //console.log(ind)
                                        //this part state variables are update a lot do infinte post requests,maybe nee to do aggregation on both tables and get details
                                        
                                        var array=this.state.appdetails
                                        var j=0;
                                        for(var i=0;i<array.length;i++)
                                        {
                                            if(array[i]._id==app.app_id && (app.status!="accepted" && app.status!="rejected") && array[i].tenure==="no")
            
                                        {return(
                                        // console.log("mind ur business");
                                       
                                         <TableRow key={ind}>
                                           <TableCell>{app.name}</TableCell>
                                            <TableCell>{this.state.appdetails[i].skills}</TableCell>
                                            <TableCell>{app.date_of_application}</TableCell>
                                            <TableCell>{this.state.appdetails[i].instname},{this.state.appdetails[i].startyear}-{this.state.appdetails[i].endyear}</TableCell>
                                            <TableCell>{app.sop}</TableCell>
                                            <TableCell>{this.state.appdetails[i].rating}</TableCell>
                                            <TableCell>{app.status=="applied" ? <Button size="small" variant="contained" color="primary" onClick={()=>{
                                                 const newv={
                                                    "status":"shortlisted",
                                                    "app_id":app.app_id,
                                                    "job_id":this.props.match.params.id

                                                    }
                                                    return (this.onchangestatus(newv))
                                                
                                              }}>shortlist</Button> : <Button size="small" variant="contained" color="primary"  onClick={()=>{
                                                  const newv={
                                                      "status":"accepted",
                                                      "app_id":app.app_id,
                                                      "job_id":this.props.match.params.id
                                                  }
                                                  return (this.onchangestatus(newv))
                                            }}> accept </Button> } </TableCell>

                                            <TableCell><Button  size="small" variant="contained" color="secondary" onClick={()=>{console.log("hi");

                                                    const newv={
                                                    "status":"rejected",
                                                    "app_id":app.app_id,
                                                    "job_id":this.props.match.params.id
                                                    }
                                                    return (this.onchangestatus(newv))   
                                               
                                                
                                                
                                            }}  >reject</Button></TableCell>
                                               
                                        </TableRow>
                                    )}}} )}
                                                                
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                           
              
                        
            </div>
            </Container>
)
}
}
export default appliinfo;