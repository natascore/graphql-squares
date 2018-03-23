import React, { Component } from 'react';
import Square from './Square'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_SQUARES_QUERY = gql`
  query {
      allSquares {
          id,
          status
      }
  }
`

const SQUARE_CHANGED_SUBSCRIPTION = gql`
    subscription {
        squareChanged {
            id
            status
        }
    }
`;

const SQUARE_ADDED_SUBSCRIPTION = gql`
  subscription {
      squareAdded {
          id
          status
      }
  }
`

@graphql(ALL_SQUARES_QUERY, {
  name: 'squares',
  props: props => {
    return {
      ...props,
      subscribeToChangedSquares: () => {
        return props.squares.subscribeToMore({
          document: SQUARE_CHANGED_SUBSCRIPTION,
        })
      },
      subscribeToSquareAdded: () => {
        return props.squares.subscribeToMore({
          document: SQUARE_ADDED_SUBSCRIPTION,
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) {
              return prev;
            }

            const newSquare = subscriptionData.data.squareAdded

            return Object.assign({}, prev, {
                allSquares: [...prev.allSquares, newSquare]
            })
          }
        })
      }
    }
  }
})
class SquareList extends Component {
  componentDidMount() {
    this.props.subscribeToChangedSquares()
    this.props.subscribeToSquareAdded()
  }
  render() {
    if(this.props.squares.loading) {
      return <div>Loading</div>
    }
    if(this.props.squares.allSquares) {
      return (
        this.props.squares.allSquares.map(square => {
          return (
            <Square status={square.status} key={square.id} id={square.id}/>
          )
        })
      );
    }
  }
}

export default SquareList;
