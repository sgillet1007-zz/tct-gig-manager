import React, { Component } from 'react';
import axios from 'axios';
import 'react-infinite-calendar/styles.css';
import { Container, Grid, Image, Rail, Segment, Button } from 'semantic-ui-react';
import GigList from './GigList';
import GigForm from './GigForm';
import GigCalendar from './GigCalendar';
import tctLogo from './images/tct_logo.png';

class GigManager extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [], showCalendar: false, addingGig: false };
    this.loadGigsFromServer = this.loadGigsFromServer.bind(this);
    this.handleGigSubmit = this.handleGigSubmit.bind(this);
    this.handleGigDelete = this.handleGigDelete.bind(this);
    this.handleGigUpdate = this.handleGigUpdate.bind(this);
    this.handleAddGigFormShow = this.handleAddGigFormShow.bind(this);
    this.handleShowCalendar = this.handleShowCalendar.bind(this);
  }

  loadGigsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      }).catch(err => {
        console.error(err);
      })
  }

  handleGigSubmit(gig) {
    let gigs = this.state.data;

    let new_gig = {
      gig_date: gig.gig_date ,
      start_time: gig.start_time ,
      end_time: gig.end_time ,
      loc_venue: gig.loc_venue ,
      loc_city: gig.loc_city ,
      loc_streetaddr: gig.loc_streetaddr ,
      loc_state: gig.loc_state ,
      loc_zipcode: gig.loc_zipcode ,
      loc_lat: gig.loc_lat ,
      loc_long : gig.loc_long  ,
      venue_website: gig.venue_website ,
      nate_confirmed: gig.nate_confirmed ,
      cass_confirmed: gig.cass_confirmed ,
      sam_confirmed: gig.sam_confirmed ,
      mike_confirmed: gig.mike_confirmed ,
      setlist_id: gig.setlist_id ,
      instruction: gig.instruction ,
    };

    let newGigs = gigs.concat([new_gig]);
    
    this.setState({ data: newGigs }); // update component state --> change this to update redux store

    axios.post(this.props.url, new_gig)
      .then(function(res){
        this.setState({ data: gigs });
      }).then(function(res){
        this.setState({ addingGig: false });
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  handleGigDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(function(res) {
        console.log('Gig deleted');
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  handleGigUpdate(id, gig) {
    axios.put(`${this.props.url}/${id}`, gig)
      .catch(function(err) {
        console.log(err);
      })
  }

  componentDidUpdate() {
    this.loadGigsFromServer();
  }

  componentDidMount() {
    this.loadGigsFromServer();
  }

  handleDateChange(date) {
    this.setState({ date })
  }

  handleDayClick(date) {
    this.setState({ date })
  }

  handleAddGigFormShow() {
    this.setState({addingGig: !this.state.addingGig});
  }

  handleShowCalendar() {
    this.setState({showCalendar: !this.state.showCalendar});
  }
  
  render() {
    return (
      <Container>
        <Grid centered columns={3}>
          <Grid.Column>
            <Segment>
              <Image size="small" centered src={tctLogo} />
              <Rail attached position='left'>
                <Segment>
                  <Button onClick={this.handleShowCalendar} fluid>View Calendar</Button>
                </Segment>
              </Rail>
              <Rail attached position='right'>
                <Segment>
                  <Button onClick={this.handleAddGigFormShow}fluid>Add a Gig</Button>
                </Segment>
              </Rail>
            </Segment>
          </Grid.Column>
        </Grid>
        {this.state.addingGig && <GigForm onGigSubmit={this.handleGigSubmit}/>}
        {this.state.showCalendar && <GigCalendar />}
        <GigList
          onGigDelete={ this.handleGigDelete }
          onGigUpdate={ this.handleGigUpdate }
          data={ this.state.data }/>
      </Container>
    )
  }
}

export default GigManager;
