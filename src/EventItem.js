import React from 'react';

export const EventItem = props => {
  return(
    <div>
      <p>Topic: {props.topic}</p>
      <p>StarTime: {props.startTime}</p>
      <p>endTime: {props.endTime}</p>
    </div>
  )
};
