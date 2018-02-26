import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

const emptyGig = {
        gig_date: '',
        start_time: '',
        end_time: '',
        loc_venue: '',
        loc_city: '',
        loc_streetaddr: '',
        loc_state: '',
        loc_zipcode: '',
        loc_lat: '',
        loc_long : '',
        venue_website: '',
        nate_confirmed: '',
        cass_confirmed: '',
        sam_confirmed: '',
        mike_confirmed: '',
        setlist_id: '',
        instruction: ''
      };

class GigForm extends Component {
  constructor(props) {
    super(props);
    this.state = emptyGig;
    this.handleVenueChange = this.handleVenueChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleVenueChange(e) {
    this.setState({ loc_venue: e.target.value });
  }
  handleDateChange(e) {
    this.setState({ gig_date: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let loc_venue = this.state.loc_venue.trim();
    let gig_date = this.state.gig_date.trim();
    if (!gig_date || !loc_venue) {
      return;
    }
    this.props.onGigSubmit(this.state);
    this.setState( emptyGig );
  }
  render() {
    return (
      <div>
        <Form onSubmit={ this.handleSubmit }>
            <Form.Group>
              <Form.Input type="text" placeholder="Venue Name" value={ this.state.loc_venue } onChange={ this.handleVenueChange } />
              <Form.Input type="date" placeholder="Date" value={ this.state.gig_date } onChange={ this.handleDateChange } />
            </Form.Group>
          <Button type="submit">Add</Button>
        </Form>
      </div>
    )
  }
}

export default GigForm;
