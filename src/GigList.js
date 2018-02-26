import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import Gig from './Gig';

class GigList extends Component {
  render() {
    let gigs = this.props.data ? this.props.data.map((gig, i) => {
      return (
        <Gig
          loc_venue={ gig.loc_venue }
          date={gig.gig_date}
          uniqueID={ gig.id}
          onGigDelete={ this.props.onGigDelete }
          onGigUpdate={ this.props.onGigUpdate }
          key={ gig.id }>
        </Gig>
      )
    }) : []
    return (
      
        <Item.Group divided>
          { gigs }
        </Item.Group>
      
    )
  }
}

export default GigList;
