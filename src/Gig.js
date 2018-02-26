import React, { Component } from 'react';
import moment from 'moment';
import { Item, Image, Button, Modal, Dropdown, Divider, Icon } from 'semantic-ui-react'; // eslint-disable-line no-unused-vars
import  Setlist from './Setlist';
import  Map from './Map';
//images
import defaultImg from './images/default.png';
import clancysImg from './images/clancys.png';
import dplImg from './images/dpl.png';
import fleamarketImg from './images/fleamarket.png';
import littletonmuseumImg from './images/littletonmuseum.png';
import railsendImg from './images/railsend.png';
import nateImg from './images/nate.jpg';
import cassImg from './images/cass.jpg';
import mikeImg from './images/mike.jpg';
import samImg from './images/sam.jpg';

class Gig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingGig: false,
    };
    this.deleteGig = this.deleteGig.bind(this);
    this.updateGig = this.updateGig.bind(this);
    this.handleVenueChange = this.handleVenueChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleGigUpdate = this.handleGigUpdate.bind(this);
  }

  updateGig(e) {
    e.preventDefault();
    this.setState({ editingGig: !this.state.editingGig });
  }

  handleGigUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    console.log('handleGigUpdate id: ', id)
    let loc_venue = (this.state.loc_venue) ? this.state.loc_venue : null;
    let gig_date = (this.state.gig_date) ? this.state.gig_date : null;
    let gig = { loc_venue: loc_venue, gig_date: gig_date};
    this.props.onGigUpdate(id, gig);
    this.setState({
      editingGig: !this.state.editingGig,
      loc_venue: '',
      gig_date: ''
    })
  }

  deleteGig(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onGigDelete(id);
  }

  handleDateChange(e) {
    this.setState({ gig_date: e.target.value });
  }

  handleVenueChange(e) {
    this.setState({ loc_venue: e.target.value });
  }

  renderEditButton() {
    return  (
      <Modal size="fullscreen" style={{ marginTop: '5vh' }} trigger={<Button floated="right" size="tiny" onClick={this.updateGig} color="blue">edit</Button>}>
        <Modal.Header>Edit Gig Form</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            ADD GIG EDIT FORM HERE
            <form onSubmit={ this.handleGigUpdate }>
            <input
              type='text'
              placeholder='Update venue...'
              value={ this.props.loc_venue }
              onChange={ this.handleVenueChange } />
            <input
              type='date'
              placeholder='Update gig date...'
              value={ this.props.gig_date }
              onChange={ this.handleDateChange } />
            <input
              type='submit'
              value='Update' />
          </form>            
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }

  renderUserAvatar(name) {
    const userConfProp = `${name}_confirmed`;
    const imageSource = tourist => {
      switch(tourist) {
        case 'nate':
          return nateImg;
        case 'cass':
          return cassImg;
        case 'mike':
          return mikeImg;
        case 'sam':
          return samImg;
        default:
          return null;
      }
    }
    return (
      this.props[userConfProp] ? 
      (<span>
        <Image avatar={true} src={imageSource(name)} />
        <Icon name="checkmark" />
      </span>) :
      (<span>
        <Image avatar={true} src={imageSource(name)} />
        <Icon name="question" />
      </span>)
    )
  }

  getVenueImage(venueName) {
    switch(venueName) {
      case 'Clancy\'s Irish Pub':
        return (<Image src={clancysImg} style={{ height: '150px', width: '150px' }} />);
      case 'Denver Central Library':
        return (<Image src={dplImg} style={{ height: '150px', width: '150px' }} />)
      case 'Rails End Beer Company':
        return (<Image src={railsendImg} style={{ height: '150px', width: '150px' }} />)
      case 'Mile High Flea Market':
        return (<Image src={fleamarketImg} style={{ height: '150px', width: '150px' }} />)
      case 'Littleton Museum':
        return (<Image src={littletonmuseumImg} style={{ height: '150px', width: '150px' }} />)
      default:
        return (<Image src={defaultImg} style={{ height: '150px', width: '150px' }} />)
    }
  }

  render() {
    return (
     <Item style={{ padding: '5px' }}>
      {this.getVenueImage(this.props.loc_venue)}
      <Item.Content>
        <Button floated="right" size="tiny" onClick={this.deleteGig} color="red">delete</Button>
        {this.renderEditButton()}
        <Item.Header as='a'>
        {this.props.loc_venue}
        </Item.Header>
        <Item.Description>{`${moment(this.props.date).format('LL')}`}</Item.Description>
        <Item.Meta>{`10pm - 12am`}</Item.Meta>
        <Item.Description>{`7000 Wadsworth Blvd, Wheatridge, CO 88888`}</Item.Description>
        <Item.Extra>
        <div>Load in 1 hour before gig, bring PA, park in employee lot</div>
        </Item.Extra>
        {this.renderUserAvatar('nate')}
        {this.renderUserAvatar('cass')}
        {this.renderUserAvatar('mike')}
        {this.renderUserAvatar('sam')}
        <Modal size="fullscreen" style={{ marginTop: '5vh' }} trigger={<Button circular={true} size="tiny" floated="right">Directions</Button>}>
          <Modal.Header>Directions</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Map />
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Modal size="fullscreen" style={{ marginTop: '5vh' }} trigger={<Button circular={true} size="tiny" floated="right">View Setlist</Button>}>
          <Modal.Header className="ui centered header">Setlist</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Setlist />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Item.Content>
      <Divider />
     </Item>
    )
  }
}

export default Gig;
