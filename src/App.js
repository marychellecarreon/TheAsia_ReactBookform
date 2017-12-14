import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiData: {},
      variants: []
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
            { variants: this.state.apiData.variants }
          )
        }
      )
    });
  }

  render() {
    console.log(this.state.apiData)
    let data_list = this.state.variants.map((datum, index) => {
      return (
        <tr key={index}>
        <td>{datum.starts_on}</td>
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
        <th>Select Date</th>
      </tr>
        {data_list}
        </thead>
        </div>
      </div>
    );
  }
}

export default App;
