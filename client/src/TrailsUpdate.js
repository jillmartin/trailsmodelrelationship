import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class TrailsUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
        name: "",
        length: "",
        elevation: "",
        description: "",
        challenge: ""
      
    };
    this.handleChange = this.handleChange.bind(this);
    }
  componentWillMount() {
    axios.get('/api/trails/' + this.props.match.params.id)
    .then((response) => {
      this.setState({
        name: response.data.name, 
        length: response.data.length, 
        elevation: response.data.elevation, 
        description: response.data.description, 
        challenge: response.data.challenge 
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleChange(event) {
    console.log(event.target);
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    const newTrail = {
      name: this.state.name,
      length: this.state.length, 
      elevation: this.state.elevation,
      description: this.state.description,
      challenge: this.state.challenge
    }
    
    axios.put('/api/trails/' + this.props.match.params.id, newTrail) 
        .then((res) => {
          var newTrails = this.state.trails;
          newTrails.push(res.data);
          this.setState({trails: newTrails})
          this.props.history.push('/')  
    }); 

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Update Trail Details</h1>
        </header>
        <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Trail Name: 
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/><br/>
          </label>
          <label>
            Length: 
            <input type="text" name="length" value={this.state.length} onChange={this.handleChange}/><br/>
          </label>
          <label>
            Elevation: 
            <input type="text" name="elevation" value={this.state.elevation} onChange={this.handleChange}/><br/>
          </label>
          <label>
            Description: 
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/><br/>
          </label>
          <label>
            Challenge: 
            <input type="text" name="challenge" value={this.state.challenge} onChange={this.handleChange}/><br/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
  
      </div>
    );
  }
}

export default TrailsUpdate;
