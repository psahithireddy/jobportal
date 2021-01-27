import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            name: '',
            email: '',
            emailErrorText:'',
            instname:'',
            startyear:'',
            endyear:'',
            skills:'',
            rating:'',
        }
        this.onChangeinstname=this.onChangeinstname.bind(this);
        this.onChangestartyear=this.onChangestartyear.bind(this);
        this.onChangeendyear=this.onChangeendyear.bind(this);
    this.onChangeskills=this.onChangeskills.bind(this);
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

    onChangeskills(e)
    {
        
        this.setState( {skills:e.target.value})
    }
    onChangeinstname(e)
    {
        this.setState( {instname:e.target.value})
    }
    onChangestartyear(e)
    {
        this.setState( {startyear:e.target.value})
    }
    onChangeendyear(e)
    {
        
        this.setState( {endyear:e.target.value})
    }
    onsub(e)
    {
        console.log(this.state.name)
        var x=false;
    
                
        const id=localStorage.getItem("user_id")
        const type=localStorage.getItem("user_type")
        const log=localStorage.getItem("isloggedin")
        axios.post('http://localhost:4000/user/updatedetails',{"id":localStorage.getItem("user_id"),
        "name":this.state.name,
        "email":this.state.email,
        "instname":this.state.instname,
        "startyear":this.state.startyear,
        "endyear":this.state.endyear,
        "skills":this.state.skills    })
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
            axios.post('http://localhost:4000/user/getuserbyid',{"app_id":localStorage.getItem("user_id")})
            .then(res => {this.setState({user:res.data})
            console.log(this.state.user)
            this.setState({name:this.state.user.name})
            this.setState({email:this.state.user.email})
            this.setState({instname:this.state.user.instname})
            this.setState({startyear:this.state.user.startyear})
            this.setState({endyear:this.state.user.endyear})
            this.setState({skills:this.state.user.skills})
            this.setState({rating:this.state.user.rating})
        });
            
        }
        render() {  
            return (<div>
                <Button  size="small" variant="contained" color="secondary" onClick={this.onsub}> Save Changes</Button>
                <h6>RATING: {this.state.rating}</h6>
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
                        <label>Institute Name: </label>
                        <input type="text" 
                               className="form-control" 
                               
                               value={this.state.instname}
                               onChange={this.onChangeinstname}
                            
                               />
                               </div>


                               <div className="form-group">
                        <label>Startyear: </label>
                        <input type="Number" 
                               className="form-control" 
                               
                               value={this.state.startyear}
                               onChange={this.onChangestartyear}
            
                               />
                               </div>  
                               <label>Endyear: </label>
                        <input type="Number" 
                               className="form-control" 
                               
                               value={this.state.endyear}
                               onChange={this.onChangeendyear}
            
                               />
                              
                               <label>Skills: </label>
                                <input type="text" 
                               className="form-control" 
                               
                               value={this.state.skills}
                               onChange={this.onChangeskills}
                               />
                        </div>
                        
                    
                
            )
            }






}

export default Profile;