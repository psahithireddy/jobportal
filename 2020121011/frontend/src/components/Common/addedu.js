import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Addedu extends Component {
    getStyle =() =>{

    }


    render() {

        return (
            <div className="form-group">
                <label>Instname: </label>
                        <input type="text" 
                               className="form-control"
                               onChange={this.props.addinstname}
                               />{''}{this.props.edu.instname}
            </div>
        )


    }
}

Addedu.propTypes ={
    edu: PropTypes.array.isRequired
}
export default Addedu;