import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
class Profilerec extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            name: '',
            email: '',
            emailErrorText:'',
            contact:'',
            bio:''
        }
        this.onChangecontact=this.onChangecontact.bind(this);
    this.onChangebio=this.onChangebio.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onsub= this.onsub.bind(this);
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
    onsub(e)
    {
        console.log(this.state.name)
        var x=false;
    
                
        const id=localStorage.getItem("user_id")
        const type=localStorage.getItem("user_type")
        const log=localStorage.getItem("isloggedin")
        axios.post('http://localhost:4000/recruiter/updatedetails',{"id":localStorage.getItem("user_id"),
        "name":this.state.name,
        "email":this.state.email,
        "contact":this.state.contact,
        "bio":this.state.bio    })
        .then(res=>{
        window.alert("updated details");
         
        })
         if(!x)
         {
            console.log("yes")
            localStorage.clear();
             localStorage.setItem("user_name",this.state.name)
             localStorage.setItem("user_email",this.state.email)
             
             localStorage.setItem('user_type', type);
             localStorage.setItem('user_id',id);
             localStorage.setItem('isloggedin',"true");
            
             window.location.reload();
         }

    }

    
        componentDidMount()
        {
            axios.post('http://localhost:4000/recruiter/getrecbyid',{"rec_id":localStorage.getItem("user_id")})
            .then(res => {this.setState({user:res.data})
            console.log(this.state.user)
            this.setState({name:this.state.user.name})
            this.setState({email:this.state.user.email})
            this.setState({contact:this.state.user.contact})
            this.setState({bio:this.state.user.bio})
        });
            
        }
        render() {  
            return (<div>
                <Button  size="small" variant="contained" color="secondary" onClick={this.onsub}> Save Changes</Button>
                
               <div className="form-group">
                        
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="user name"
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="user-email"
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Contact No.: </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="10 digits"
                               value={this.state.contact}
                               onChange={this.onChangecontact}
                               maxLength="10"
                               />
                               </div>
                        <div className="form-group">
                               <label>Bio: </label>
                        <textarea type="text" 
                               className="form-control" 
                               placeholder="max 250 words"
                               value={this.state.bio}
                               onChange={this.onChangebio}
                               />
                        </div>
                        
                    
                
            </div>)
            }

        }       
        export default Profilerec;