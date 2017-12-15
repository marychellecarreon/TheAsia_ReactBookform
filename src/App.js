import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiData: {},
      sched_details: [],
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
            {
              sched_details: this.state.apiData.schedule_details,
              variants: this.state.apiData.variants
            }
          )
        }
      )
    });
  }

  render() {
    console.log(this.state.apiData)
    console.log(this.state.sched_details)
    console.log(this.state.variants)
    let sched_display = this.state.sched_details.map((sched, index) => {
      return (
        <div key={index}>
          <p>{sched.time} {sched.description}</p>
        </div>
      )
    })
   let variants_item = this.state.variants.map((variant, index) => {
      return (
        <div key={index}>
          <p> {variant.starts_on} {variant.ends_on} </p>
        </div>
      )
   })


      return (
        <div className="container">
            <div className="row">
                  <div className="col-md-3">
                      <h1>Description</h1>
                  </div>
                  <div className="col-md-5">
                      <p>{this.state.apiData.description}</p>
                  </div>
                  <div className="col-md-4">
                      <h5>Select a Date</h5>
                           {variants_item}
                  </div>
              </div>

             <div className="row">
                      <div className="col-md-3">
                          <h2>Detail</h2>
                      </div>
                      <div className="col-md-5">
                             <ol>Duration: {this.state.apiData.tour_duration}</ol>
                             <ol>Available Day: {this.state.apiData.available_day}</ol>
                             <ol>Meeting Time: {this.state.apiData.meeting_time}</ol>
                             <ol>Meeting Point: {this.state.apiData.meeting_point}</ol>
                      </div>
                    </div>

            <div className="row">
                     <div className="col-md-3">
                          <h3>Notice</h3>
                     </div>
                      <div className="col-md-5">
                            <p>{this.state.apiData.important_information}</p>
                      </div>
                    </div>

          <div className="row">
                <div className="col-md-3">
                     <h4>Schedule</h4>
                </div>
                <div className="col-md-5">
                    {sched_display}
                </div>
          </div>
        </div>


      );
  }
}

export default App;
