import React from 'react';
import LiveItem from './live';
import UpcomingItem from './upcoming';

const CardUpcoming = ({ event, icon }) => {
  console.log(event);
  switch (event.islive) {
    case true:
      return <LiveItem event={event} icon={icon} />;
    case false:
      return <UpcomingItem event={event} icon={icon} />;
    default:
      return null;
  }
};

export default CardUpcoming;
