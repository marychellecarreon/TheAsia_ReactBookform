import React, { Component } from 'react';
import './App.css';
import FontAwesome from 'react-fontawesome';

var Datetime = require('react-datetime');


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiData: {},
      sched_details: [],
      variants: [],
      selectedDay: new Date(),
    };
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(selectedDay) {
    this.setState({
      selectedDay: selectedDay
    });
  }

  componentWillMount(){
    let url = "https://api-development.theasia.com/Products/findBySlug/captain-explorer-dukw-tour-singapore-duck-tour-to-merlion-park-and-more-91"
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
              variants: this.state.apiData.variants,
            }
          )
        }
      )
    });
  }

  render() {
    console.log(this.state.apiData)

    let sched_display = this.state.sched_details.map((sched, index) => {
      return (
        < tr key={index}>
          <td width='25%'>{sched.time}</td>
          <td width='75%'>{sched.description}</td>
        </tr>
      )
    })

   let variants_item = this.state.variants.map((variant, index) => {
      return (
        <div key={index}>
          <p> {variant.starts_on}</p>
          <p> {variant.ends_on} </p>
        </div>
      )
   })

   let selectedDay = this.state.selectedDay;
   let yesterday = Datetime.moment().subtract(1, 'day');
   let valid = function( current ){
     return current.isAfter( yesterday );
   };

   let price_list = this.state.variants.map((variant, index) => {
     console.log(this.state.selectedDay)
     let start = new Date(`${variant.starts_on}`);
     let end = new Date(`${variant.ends_on}`);
     console.log(start)
     console.log(end)

     if (this.state.selectedDay >= start && this.state.selectedDay <= end) {
       return (
         <div key={"price"+index}>
           {variant.price.map(price => {
             return (
               <div>
                 <table className="table">
                   <thead>
                     <tr>
                       <th></th>
                       <th>Price</th>
                       <th>Pax</th>
                       <th>Total</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td>Adult</td>
                       <td>{price.adult_price}</td>
                       <td>{price.pax}</td>
                       <td>{price.adult_price * price.pax}</td>
                     </tr>
                     <tr>
                       <td>Children</td>
                       <td>{price.child_price}</td>
                       <td>{price.pax}</td>
                       <td>{price.child_price * price.pax}</td>
                     </tr>
                   </tbody>
                 </table>
                 <center><h6>Total Cost {price.adult_price * price.pax + price.child_price * price.pax} USD</h6></center>
               </div>
             )}
           )}
         </div>
       )}
   })

   let info_text = `${this.state.apiData.important_information}`.replace( /",|\[|\]|\{|\}|\\|\":|\"|head|body|Notice/g, '\n');
   console.log(info_text)

   let description_text = `${this.state.apiData.description}`.replace(/","|\["|\"]|"/g, '\n');

      return (
        <div className="container">
            <a href="#"><img alt="The Asia" id='asialogo' src="asialogo.png"/></a>
            <input className="fa-fa-search" type="text" placeholder="Search"/>

            <a href="#" className="header" title="Profile">Profile</a>
            <a href="#" className="header" title="USD">USD</a>
            <a href="#" className="header" title="English">English</a>
            <a href="#" className="header" title="Blog">Blog</a>
            <a href="#" className="header" title="Cities">Cities</a>
            <a href="#" className="header"  title="Home">Home</a>

            <div className="row">
                  <div className="col-md-2 lg-2 desc">
                      <h1>Description</h1>
                  </div>
                  <div className="col-md-7 desc margin-table">
                    <table className="table table-striped">
                    <tbody>
                     <td>
                       {description_text}
                      </td>
                    </tbody>
                    </table>
                  </div>
                  <div className="col-md-3 desc">
                    <h5>Select date</h5>
                    <Datetime
                      value={selectedDay}
                      onChange={this.handleDayChange}
                      input ={false}
                      isValidDate={ valid }
                    />
                    {price_list}
                  </div>
              </div>

             <div className="row">
                      <div className="col-md-2 lg-2">
                          <h2>Detail</h2>
                      </div>
                      <div className="col-md-7 duration margin-table">
                        <table className="table table-striped">
                      <tbody>
                         <td>
                             <strong>Duration: </strong> {this.state.apiData.tour_duration}<br/>
                             <strong>Available Day: </strong> {this.state.apiData.available_day}<br/>
                             <strong>Meeting Time: </strong> {this.state.apiData.meeting_time}<br/>
                             <strong>Meeting Point: </strong> {this.state.apiData.meeting_point}<br/>
                         </td>
                      </tbody>
                       </table>
                      </div>
                    </div>


            <div className="row">
                     <div className="col-md-2 lg-2">
                          <h3>Notice</h3>
                     </div>
                      <div className="col-md-7 margin-table">
                        <table className="table table-striped">
                          <tbody>
                            <td>{info_text}</td>
                          </tbody>
                        </table>
                      </div>
                    </div>

          <div className="row">
                <div className="col-md-2 lg-2 sm-4 xs-4">
                     <h4>Schedule</h4>
                </div>
                <div className="col-md-7 margin-table">
                    <table className='table table-striped'>
                       <thead>
                          <tr>
                             <th width='25%'>Time</th>
                             <th width='75%'>Place</th>
                         </tr>
                      </thead>
                    </table>
                  </div>
            </div>
            <div className="row">
                <div className="col-md-2 lg-2 sm-4 xs-4">
                </div>
                <div className="col-md-7 margin-table">
                   <table className="table table-striped">
                      <tbody>
                            {sched_display}
                    </tbody>
                   </table>
              </div>
          </div>
        </div>
      );
  }
}

export default App;
