import React, { Component } from 'react';
import '../styles/App.css';
import SeatList from './SeatList'

const data = [
  { id: 1, status: 'free' },
  { id: 2, status: 'reserved' },
  { id: 3, status: 'sold' },
]

class App extends Component {
  render() {
    return (
      <SeatList seats={data}/>
    );
  }
}

export default App;
