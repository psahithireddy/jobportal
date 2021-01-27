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
class Allemp extends Component{
    constructor(props){
        super(props);
        this.state={
            allmyemp:[],
            sortNames:true ,sortNamer:true,sortNamed:true,sortNamej:true
        }
        this.renderIcon3 = this.renderIcon3.bind(this);
       this.renderIcon1 = this.renderIcon1.bind(this);
       this.renderIcon2 = this.renderIcon2.bind(this);
       this.renderIcon4 = this.renderIcon4.bind(this);
       this.sortChange = this.sortChange.bind(this);//NAMES
       this.sortChangerating = this.sortChangerating.bind(this);//date of joining
       this.sortChangedap = this.sortChangedap.bind(this);//rating
       this.sortChangeJob=this.sortChangeJob.bind(this);//for jobtitles
    }

    //sorting
    sortChange(){
        /*
         *      Note that this is sorting only at front-end.
         */
               var array = this.state.allmyemp;
               //console.log(array)
                var flag = this.state.sortNames;
                array.sort(function(a, b) {
                    if(a.name != undefined && b.name!= undefined ){
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
                    allmyemp:array,
                    sortNames:!this.state.sortNames,
                })
            }
            //working
            sortChangerating(){
                /**
                 *      Note that this is sorting only at front-end.
                */
                        var array = this.state.allmyemp;
                        var flag = this.state.sortNamer;
                        array.sort(function(a, b) {
                            if(a.ratingapp!= undefined && b.ratingapp != undefined){
                               // console.log("abe ok")
                                return ((1 - flag*2) * (a.ratingapp - b.ratingapp));
                                
                            }
                            else{
                                console.log("kuch gadbad")
                               // console.log(a.ratingapp,b.ratingapp)
                                return 1;  
                            }
                          });
                        this.setState({
                            allmyemp:array,
                            sortNamer:!this.state.sortNamer,
                        })
                    }
                    sortChangedap(){
                        /**
                         *      Note that this is sorting only at front-end.
                         */
                               var array = this.state.allmyemp;
                               //console.log(array)
                                var flag = this.state.sortNamed;
                                array.sort(function(a, b) {
                                    if(a.date_of_joining!= undefined && b.date_of_joining != undefined ){
                                        //console.log("abe ok")
                                        var g1=new Date(a.date_of_joining)
                                        var g2=new Date(b.date_of_joining)
                                        //console.log((1 - flag*2) * ((g1) - (g2)))
                                        return ((1 - flag*2) * (g1 - g2));
                                        
                                    }
                                    else{
                                        console.log("kuch gadbad")
                                       // console.log(a.date_of_joining,b.date_of_joining)
                                        return 1;  
                                    }
                                  });
                                this.setState({
                                    allmyemp:array,
                                    sortNamed:!this.state.sortNamed,
                                })
                            }
                            sortChangeJob(){
                                /**
                                 *      Note that this is sorting only at front-end.
                                 */
                                var array = this.state.allmyemp;
                                //console.log(array)
                                 var flag = this.state.sortNamej;
                                 array.sort(function(a, b) {
                                     if(a.jobtitle != undefined && b.jobtitle!= undefined ){
                                       //  console.log("ok");
                                         return ((1 - flag*2) * (a.jobtitle- b.jobtitle));
                                         //console.log("abe ok")
                                     }
                                     else{
                                         return 1;
                                         console.log("kuch gadbad")
                                     }
                                   });
                                 this.setState({
                                     allmyemp:array,
                                     sortNamej:!this.state.sortNamej,
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
                            renderIcon4(){
                                if(this.state.sortNamej){
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




    //

    componentDidMount()
    {
        axios.post('http://localhost:4000/application/getmyemp',{rec_id:localStorage.getItem("user_id")})
        .then(response => {
            
            this.setState({allmyemp:response.data})})
        .catch(function(error) {window.alert("error")}) 

    }
        render(){
            return(
            <Container>
            <div>
            <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Button onClick={this.sortChange}>{this.renderIcon1()}</Button>Employeename</TableCell>
                                        <TableCell><Button onClick={this.sortChangeJob}>{this.renderIcon4()}</Button>Job Name</TableCell>
                                        <TableCell>Job type</TableCell>
                                        <TableCell><Button onClick={this.sortChangedap}>{this.renderIcon3()}</Button>Date_of_joining</TableCell>
                                        <TableCell><Button onClick={this.sortChangerating}>{this.renderIcon2()}</Button>Employee rating</TableCell>
                                        <TableCell>Rate him now</TableCell>
                                                 
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.allmyemp.map((emp,ind) =>{
                                        if(emp.status==="accepted")
                                        {
                                        return(
                                        <TableRow key={ind}>
                                        <TableCell>{emp.name}</TableCell>
                                        <TableCell>{emp.jobtitle}</TableCell>
                                        <TableCell>{emp.jobtype}</TableCell>    
                                        <TableCell>{emp.date_of_joining}</TableCell>
                                        <TableCell>{emp.ratingapp}</TableCell>
                                        <TableCell>TBD</TableCell>
                                        </TableRow>
                                        )}
                                    })}
                                    </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                                            
                                            

            </div>
            </Container>)
        }

}
export default Allemp;