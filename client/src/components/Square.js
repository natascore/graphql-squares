import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Square.css'

const UPDATE_SQUARE_MUTATION = gql`
    mutation updateSquareMutation($id: Int!, $status: String!){
        updateSquare(id: $id, status: $status) {
            id,
            status
        }
    }
`

@graphql(UPDATE_SQUARE_MUTATION, {
  name: 'updateSquareMutation'
})
class Square extends Component {
  static calculateNextState(status) {
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
    const status = Square.calculateNextState(this.props.status)
    await this.props.updateSquareMutation({
      variables: {
        id,
        status
      },
    })
  }
  render() {
    return (
      <div className={`${this.props.status} square`} onClick={this._handleClick}>{this.props.id}</div>
    );
  }
}

Square.propTypes = {
  status: PropTypes.string.isRequired,
}


export default Square;
