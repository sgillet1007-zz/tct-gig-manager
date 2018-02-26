import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css';

const today = new Date()

class GigCalendar extends Component {
	render() {
		return(
			<Container style={{ marginTop: '10px'}} textAlign="center">
				<Grid centered columns={1}>
					<InfiniteCalendar
			          selected={new Date(today.getFullYear(), today.getMonth(), today.getDate())}
			          rowHeight={54}
			          width={'70vw'}
			          minDate={new Date(today.getFullYear(), (today.getMonth() - 1), 1)}
			          displayOptions={{layout: 'landscape'}}
			        />
		        </Grid>
	        </Container>
	        )
	}
}

export default GigCalendar