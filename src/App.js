import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiData: {},
      data: []
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
        { apiData: apiJSON }, () => {
          this.setState(
            { data: this.state.apiData.data }
          )
        }
      )
    });
  }

  render() {
    console.log(this.state.apiData)
    let data_list = this.state.data.map((datum, index) => {
      return (
        <tr key={index}>
        <td>{datum.description}</td>
        <td>{datum.important_information}</td>
        <td>{datum.tour_duration}</td>
        <td>{datum.available_day}</td>
        <td>{datum.meeting_time}</td>
        <td>{datum.meeting_point}</td>
        <td>{datum.variants.starts_on}</td>
        <td>{datum.variants.ends_on}</td>
        </tr>
      )
    });

    return (
      <div>
      <div className="App">
      <header className="App-header">
         <h1 className="App-title">The Asia</h1>
      </header>
      <thead>
      <tr>
        <th>Description</th>
        <th>Additional Information</th>
        <th>Duration</th>
        <th>Available Day</th>
        <th>Meeting Time</th>
        <th>Meeting Point</th>
        <th>Start Date</th>
        <th>End Date</th>
      </tr>
        {data_list}
        </thead>
        </div>
      </div>
    );
  }
}

export default App;
