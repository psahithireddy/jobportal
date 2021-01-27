import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';

class jobedit extends Component{
    constructor(props) {
        super(props);
        this.state={
            jobdetails:[],
            deadline:'',
            maxapp:'',
            maxpos:''
        }
        this.onChangedeadline=this.onChangedeadline.bind(this);
        this.onChangeapp=this.onChangeapp.bind(this);
        this.onChangepos=this.onChangepos.bind(this);
        this.onChangeedit=this.onChangeedit.bind(this);
        this.ondelete=this.ondelete.bind(this);
    }

    onChangedeadline(e){this.setState({deadline:e.target.value})}
    onChangeapp(e){this.setState({maxapp:e.target.value})}
    onChangepos(e){this.setState({maxpos:e.target.value})}
    onChangeedit(e)
    {
        axios.post('http://localhost:4000/job/editjob',{
            "id":this.props.match.params.id,
            "maxapp":this.state.maxapp,
            "maxpos":this.state.maxpos,
            "deadline":this.state.deadline

        }).then(res => {window.alert("changes saved")})
    }
    
    ondelete(e)
    {
        var v1=false; var v2=false
        axios.post('http://localhost:4000/job/jobstatus',{"job_id":this.props.match.params.id,"status":"deleted"})
        .then(res => {v1=true})
        //update in all applications
        axios.post('http://localhost:4000/application/jobdelete',{"job_id":this.props.match.params.id})
        .then(res => {v2=true})
        
        {
            window.alert("deleted");
            return <Redirect to="/users2" />}
    }

    componentDidMount(){

        axios.post('http://localhost:4000/job/showjob',{_id:this.props.match.params.id})
        .then(res => {this.setState({jobdetails:res.data})
        this.setState({deadline:this.state.jobdetails.deadline})
            this.setState({maxpos:this.state.jobdetails.max_applicants})
            this.setState({maxapp:this.state.jobdetails.max_positions}) });
    }
        render()
        {
            return(<div>
                <div style={{paddingLeft:900}}>
                <Button  size="small" variant="contained" color="secondary" onClick={this.ondelete}>Delete job</Button>
                </div>
                <Button  size="small" variant="contained" color="primary" onClick={this.onChangeedit}>Save changes</Button>
               <div className="form-group">
                        
                        <label>Max Applicants: </label>
                        <input type="Number" 
                               className="form-control" 
                               value={this.state.maxapp}
                               onChange={this.onChangeapp}
                               />
                    </div>
                    <div className="form-group">
                        <label>Max_Positions: </label>
                        <input type="Number" 
                               className="form-control" 
                               placeholder="user-email"
                               value={this.state.maxpos}
                               onChange={this.onChangepos}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline:{this.state.deadline} </label>
                        
                        <input type="datetime-local" 
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChangedeadline}
                            
                               />
                               </div>












            </div>)
        }


}
export default jobedit;