import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Topbar from '@/modules/pages/show/top-bar';
import { RichText } from 'prismic-reactjs';

const UpcomingItem = () => {
  return null;
};

const UpcomingList = ({ heading, topBarIcon, events }) => {
  return (
    <Box>
      <Topbar heading={heading} icon={topBarIcon} />
      {events &&
        events.map((event) => (
          <Box>
            <RichText render={event.title} />
          </Box>
        ))}
    </Box>
  );
};

export default UpcomingList;
