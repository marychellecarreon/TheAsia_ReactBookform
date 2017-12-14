import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiData: {}
    }
  }

  componentWillMount(){
    let url = "http://api.development.theasia.com/Products/findBySlug/captain-explorer-dukw-tour-singapore-duck-tour-to-merlion-park-and-more-91"
    fetch(url, {
      method: 'get'
    })
    .then(api => api.json())
    .then(apiJSON => {
      this.setState(
        { apiData: apiJSON }
      )
    });
  }

  render() {
    console.log(this.state.apiData)
      return (
      <div>
        <h1>Description</h1>
           <p>{this.state.apiData.description}</p>
        <h2>Detail</h2>
              <ol>Duration: {this.state.apiData.tour_duration}</ol>
              <ol>Available Day: {this.state.apiData.available_day}</ol>
              <ol>Meeting Time: {this.state.apiData.meeting_time}</ol>
              <ol>Meeting Point: {this.state.apiData.meeting_point}</ol>
        <h3>Notice</h3>
          <p>{this.state.apiData.important_information}</p>
        <h4>Schedule</h4>
            
      </div>
      );

    return (
      <div>
      <div className="App">
      <header className="App-header">
      </header>
        </div>
      </div>
    );
  }
}

export default App;
