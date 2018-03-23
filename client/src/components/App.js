import React, { Component } from 'react';
import '../styles/App.css';
import SquareList from './SquareList'

const data = [
  { id: 1, status: 'free' },
  { id: 2, status: 'reserved' },
  { id: 3, status: 'sold' },
]

class App extends Component {
  render() {
    return (
      <SquareList squares={data}/>
    );
  }
}

export default App;
