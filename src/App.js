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
        <td>
          <ol>
             <li>{datum.notice.tour_duration}</li>
             <li>{datum.notice.available_day}</li>
             <li>{datum.notice.meeting_time}</li>
             <li>{datum.notice.meeting_point}</li>
             <li>{datum.notice.minimum_adult_age}</li>
          </ol>
        </td>
        <td>{datum.schedule_details}</td>
        <td>{datum.image_url}</td>
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
        <th>Detail</th>
        <th>Notice</th>
        <th>Schedule</th>
        </tr>
        {data_list}
        </thead>
        </div>
      </div>
    );
  }
}

export default App;
