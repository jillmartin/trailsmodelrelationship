import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class TrailsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
        name: "",
        length: "",
        elevation: "",
        description: "",
        challenge: "",
        hikers: []
      
    };
    this.handleChange = this.handleChange.bind(this);
    }
  componentDidMount() {
    axios.get('/api/trails')
      .then((response) => {
        this.setState({
          trails: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get('/api/hikers')
      .then((response) => {
        this.setState({
          hikers: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
    }
  


  delete(trail){
    const newState = this.state.trails;
       newState.splice(newState.indexOf(trail), 1);
      axios.delete('/api/trails/' + trail)
        .then((res) => {
          this.setState({trails: newState})
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
      challenge: this.state.challenge,
      hikerId: this.state.hikerId
    }
    
    axios.post('/api/trails/', newTrail) 
        .then((res) => {
          var newTrails = this.state.trails;
          newTrails.push(res.data);
          this.setState({trails: newTrails})
    }); 
  }

  render() {
    const trailItems = this.state.trails.map((trail)=>{
      return <li key={trail.id}>
        <Link to={"/trails/" + trail.id}>{trail.name}</Link>&nbsp;
        <button onClick={this.delete.bind(this, trail.id)}>Delete</button>
      </li> 
    })
console.log(this.state.hikers);
    const hikerItems = this.state.hikers.map((hiker)=>{
      return <option key={hiker.id} value={hiker.id}>{hiker.name}</option>
     
    })

    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          { trailItems }
        </ul>
        <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Trail Name: 
            <input type="text" name="name" onChange={this.handleChange}/><br/>
          </label>
          <label>
            Length: 
            <input type="text" name="length" onChange={this.handleChange}/><br/>
          </label>
          <label>
            Elevation: 
            <input type="text" name="elevation" onChange={this.handleChange}/><br/>
          </label>
          <label>
            Description: 
            <input type="text" name="description" onChange={this.handleChange}/><br/>
          </label>
          <label>
            Challenge: 
            <input type="text" name="challenge" onChange={this.handleChange}/><br/>
          </label>
          <label>
            Hiker: 
            <select name="hikerId" onChange={this.handleChange}>
           
          { hikerItems }
           
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
  
      </div>
    );
  }
}

export default TrailsList;
