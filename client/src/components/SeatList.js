import React, { Component } from 'react';
import Seat from './Seat'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_SEATS_QUERY = gql`
  query {
      allSeats {
          id,
          status
      }
  }
`

const SEAT_CHANGED_SUBSCRIPTION = gql`
    subscription {
        seatChanged {
            id
            status
        }
    }
`;

@graphql(ALL_SEATS_QUERY, {
  name: 'seats',
  props: props => {
    props.seats.subscribeToMore({
      document: SEAT_CHANGED_SUBSCRIPTION,
    })
    return props
  }
})
class SeatList extends Component {
  render() {
    if(this.props.seats.loading) {
      return <div>Loading</div>
    }
    if(this.props.seats.allSeats) {
      return (
        this.props.seats.allSeats.map(seat => {
          return (
            <Seat status={seat.status} key={seat.id} id={seat.id}/>
          )
        })
      );
    }
  }
}

export default SeatList;
