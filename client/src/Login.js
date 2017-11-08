import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    const userLogin = {
      username: this.state.username,
      password: this.state.password
    }
    
    axios.post('/api/Users/login', userLogin) 
        .then((res) => {
          console.log(res);
          this.setAccessToken(res.data.id);
        })
        .catch((error) => {
          console.log(error);
        })
  }

  setAccessToken(accessToken){
    axios.post('/api/Users/' + accessToken + '/accessTokens' )
      .then((res) => {
        console.log(res);
        // this.props.history.push('/') 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Username: 
            <input type="text" name="username" onChange={this.handleChange}/><br/>
          </label>
          <label>
            Password: 
            <input type="text" name="password" onChange={this.handleChange}/><br/>
          </label>
          <input type="submit" value="Submit" />
       </form>   
    );
  }
}


export default Login;