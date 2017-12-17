import React, { Component } from 'react';
import './App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      apiData: {},
      sched_details: [],
      variants: [],
    }
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
          <td width='25%'>{sched.time}</td>
          <td width='75%'>{sched.description}</td>
        </div>
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

   let price_list = this.state.variants.map((variant, index) => {
     return (
       <div key={"price"+index}>
         {variant.price.map(price => {
           return (
             <center>
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
                    <td>{0}</td>
                    <td>{price.child_price * 0}</td>
                  </tr>
                </tbody>
                </table>
                <h2>Total Cost <span>{price.adult_price * price.pax + price.child_price *price.pax}</span></h2>
                </center>

           )
         })}
         </div>
     )
   })


      return (
        <div className="container">
            <a href="#"><img alt="The Asia" id='asialogo' src="asialogo.png"/></a>
            <input className="fa-fa-search" type="text" placeholder="Search"/>
            <a href="#"><img alt="Profile" className="header" src="profile.png"/></a>
            <a href="#" className="header" title="USD">USD</a>
            <a href="#" className="header" title="English">English</a>
            <a href="#" className="header" title="Blogs">Blogs</a>
            <a href="#" className="header" title="Cities">Cities</a>
            <a href="#" className="header"  title="Home">Home</a>
            <div className="row">
                  <div className="col-md-2 desc">
                      <h1>Description</h1>
                  </div>
                  <div className="col-md-7 desc">
                      <p>{this.state.apiData.description}</p>
                  </div>
                  <div className="col-md-3 desc">
                      <h5>Select date</h5>
                      <center><DayPicker showOutsideDays /></center>
                            {variants_item}
                            {price_list}
                  </div>
              </div>

             <div className="row">
                      <div className="col-md-2">
                          <h2>Detail</h2>
                      </div>
                      <div className="col-md-7 duration">
                      <p>
                             <strong>Duration: </strong> {this.state.apiData.tour_duration}<br/>
                             <strong>Available Day: </strong> {this.state.apiData.available_day}<br/>
                             <strong>Meeting Time: </strong> {this.state.apiData.meeting_time}<br/>
                             <strong>Meeting Point: </strong> {this.state.apiData.meeting_point}<br/>
                      </p>
                      </div>
                    </div>

            <div className="row">
                     <div className="col-md-2">
                          <h3>Notice</h3>
                     </div>
                      <div className="col-md-7">
                            <p>{this.state.apiData.important_information}</p>
                      </div>
                    </div>

          <div className="row">
                <div className="col-md-2">
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
                <div className="col-md-2">
                </div>
                <div className="col-md-7 margin-table">
                   <table className="table table-striped">
                      <tbody>
                         <tr>
                            <td>{sched_display}</td>
                        </tr>
                    </tbody>
                   </table>
              </div>
          </div>
        </div>



      );
  }
}

export default App;
