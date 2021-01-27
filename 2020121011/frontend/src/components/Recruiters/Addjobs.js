import React, {Component} from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';

class Addjob extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            description:'',
            max_app:'',
            max_pos:'',
            dateposted:null,
            deadline:'',
            req_skillset:[],
            Typeofjob:'',
            Duration:'',
            Salary:''

        }
       
    }
    onChangetitle=(event)=>this.setState({title:event.target.value})
    onChangedescription=(event)=>this.setState({description:event.target.value})
    onChangemaxapp=(event)=>{if(event.target.value <=0){window.alert("Enter valid number")}else this.setState({max_app:event.target.value})}
    onChangemaxpos=(event)=>{if(event.target.value <=0){window.alert("Enter valid number")}else this.setState({max_pos:event.target.value})}
    onChangedeadline=(event)=>{
        
        this.setState({deadline:new Date(event.target.value).toISOString().slice(0,-1)})}
    onChangetypeofjob=(event)=>this.setState({Typeofjob:event.target.value})
    onChangeduration=(event)=>{
        if(event.target.value >7 || event.target.value<0)
        {window.alert("Enter duration in given range")}
        else
        this.setState({Duration:event.target.value})}
    onChangesalary=(event)=>{if(event.target.value <=0){window.alert("Enter valid number")}else this.setState({Salary:event.target.value})}
    onChangesreqskillset=(event)=>this.setState({req_skillset:event.target.value}) 

    onSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.deadline)
        var g1= new Date(Date.now())
        var g2 = new Date(this.state.deadline)
        if (g1.getTime() < g2.getTime()) 
        console.log("g1 is lesser than g2"); 
       else if (g1.getTime() > g2.getTime()) 
        console.log(" deadline passed"); 

       let Email=localStorage.getItem("user_email")
       let Name=localStorage.getItem("user_name")
        let id=localStorage.getItem("user_id")
        //post data to backend 
        const newJob = {
            title: this.state.title,
            description:this.state.description,
            recruiterid:id,
            recruiter_email: Email,
            recruiter_name:Name,
            max_applicants:this.state.max_app,
            max_positions:this.state.max_pos,
            date_of_posting:Date.now(),
            deadline:this.state.deadline,
            type_of_job:this.state.Typeofjob,
            Required_skillsets:this.state.req_skillset,
            duration:this.state.Duration,
            salary:this.state.Salary,
            rating:0

        }
        axios.post('http://localhost:4000/job/addjob', newJob)
             .then(res => {alert("Created\t" + res.data.title);console.log(res.data)})
             .catch(function(error) {
                //this.setState({found2:"notfound"})
                 console.log(error)});

        this.setState({
            title:'',
            description:'',
            max_app:'',
            max_pos:'',
            dateposted:Date.now(),
            deadline:'',
            req_skillset:[],
            Typeofjob:'',
            Duration:'',
            Salary:''

        })     
    }
    render(){
        return(
            <Container  component="main" maxWidth="xs">
            <div>
            <div style={{paddingLeft:160 }}> <h5>ADD JOB</h5></div>  
            </div>
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               //placeholder="name"
                               onChange={this.onChangetitle}
                               />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea type="text" 
                               className="form-control" 
                               value={this.state.description}
                               //placeholder="email"
                               onChange={this.onChangedescription}/>  
                               
                    </div>
                    <div className="form-group">
                        <label>Required Skillset: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.req_skillset}
                               placeholder="Java,Git,Angular,...."
                               onChange={this.onChangesreqskillset}
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum_Applicants: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.max_app}
                               //placeholder="email"
                               onChange={this.onChangemaxapp}/>      
                    </div>
                    <div className="form-group">
                        <label>Maximum_Positions: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.max_pos}
                               //placeholder="email"
                               onChange={this.onChangemaxpos}/>      
                    </div>
                    <div className="form-group">
                        <label>Type of Job: </label>
                        <select className="form-control" value={this.state.Typeofjob} onChange={this.onChangetypeofjob}> 
                        <option value="Fulltime">Full-Time</option> 
                        <option value="Parttime"> Part-Time</option> 
                        <option value="Workfromhome">Work from home</option> 
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="number" 
                               className="form-control"
                               value={this.state.Duration}
                               placeholder="0(undefined)- 7 months"
                               onChange={this.onChangeduration}/>      
                    </div>
                    <div className="form-group">
                        <label>Salary(per month): </label>
                        <input type="number" 
                               className="form-control"
                               value={this.state.Salary}
                               placeholder="In Rupees"
                               onChange={this.onChangesalary}/>      
                    </div>
                    <div className="form-group">
                        <label>Deadline: (Enter in GMT ,gets converted to IST)</label>
                        <input type="datetime-local" 
                               className="form-control"
                               value={this.state.deadline}
                               onChange={this.onChangedeadline}/>      
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="+add" className="btn btn-primary" style={{marginLeft:160}}/>
                    </div>
                    </form>    
            </div>
            </Container>
        )
    }
}
export default Addjob;