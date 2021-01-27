import React, {Component} from 'react';
import axios from 'axios';
import Addedu from "./addedu";
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

class Applicantregister extends Component{
    constructor(props) {
        super(props);
    this.state ={
        instname:'',
        startyear:'',
        endyear:''
    }
    this.onChange=this.onChange.bind(this);
    this.onChange1=this.onChange.bind(this);
    this.onChange2=this.onChange.bind(this);
    this.onChangeskills=this.onChangeskills.bind(this);
    }
    onChange(e)
    {
        this.setState({instname:e.target.value})
        console.log(e.target.value)
    }
    onChange1(event){this.setState({
        startyear:event.target.value
    })}
    onChange2(event){this.setState({
        endyear:event.target.value
        
    })}
    onChangeskills(event)
    {
       this.setState( {skills:event.target.value})
    }
    
        render() {  
           return(
            <Container  component="main" maxWidth="xs">
                  <div className="form-group">
                        
                        <label>Institute name: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="abc"
                               value={this.state.insttname}
                               onChange={this.onChange}
                               />
                        </div>
                    <div className="form-group">
                    <label>Startyear: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="abc"
                               value={this.state.startyear}
                               onChange={this.onChange1}
                               />
                    </div>
                    <div className="form-group">
                    <label>Endyear: </label>
                        <input type="text" 
                               className="form-control" 
                              // placeholder="abc"
                               value={this.state.endyear}
                               onChange={this.onChange2}
                               />
                               </div>
                    <div className="form-group">
                     <label>Skills: (eg:C,Git,MERN...) </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="enter your skills"
                               value={this.state.skills}
                               onChange={this.onChangeskills}
                               /></div>                 
            </Container>
           )

        } 
    
    }
    
    //Proptypes
   // Applicantregister.propTypes ={
    //    education: PropTypes.array.isRequired}      
export default Applicantregister;