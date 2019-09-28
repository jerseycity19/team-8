import React from 'react';
import './App.css';

const buttonTwo = {
  backgroundColor: '#514684',
  background: 'groove',
  fontColor: 'black',
};


export const EventItem = props => {
  return(
      <div>
      <button style={buttonTwo}>
      <p>Topic: {props.topic}</p>
      <p>StarTime: {props.startTime}</p>
      <p>endTime: {props.endTime}</p>
      </button>
    </div>
  )
};
