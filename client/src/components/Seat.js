import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Seat.css'

const UPDATE_SEAT_MUTATION = gql`
    mutation updateSeatMutation($id: Int!, $status: String!){
        updateSeat(id: $id, status: $status) {
            id,
            status
        }
    }
`

@graphql(UPDATE_SEAT_MUTATION, {
  name: 'updateSeatMutation'
})
class Seat extends Component {
  calculateNextState(status) {
    if (status === 'free')
      return 'reserved'
    if (status === 'reserved')
      return 'sold'
    if (status === 'sold')
      return 'free'
  }
  _handleClick = async () => {
    // ... you'll implement this in chapter 6
    const id = this.props.id
    const status = this.calculateNextState(this.props.status)
    await this.props.updateSeatMutation({
      variables: {
        id,
        status
      },
    })
  }
  render() {
    return (
      <div className={`${this.props.status} seat`} onClick={this._handleClick}></div>
    );
  }
}

Seat.propTypes = {
  status: PropTypes.string.isRequired,
}


export default Seat;
