import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Topbar from '@/modules/pages/show/top-bar';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const UpcomingItem = ({ event }) => {
  return (
    <Box>
      <RichText render={event.title} htmlSerializer={htmlSerializer} />
      <Text variant="date">{event.date}</Text>
    </Box>
  );
};

const UpcomingList = ({ heading, topBarIcon, events }) => {
  return (
    <Box>
      <Topbar heading={heading} icon={topBarIcon} />
      {events.length > 0 ? (
        events.map((event, index) => (
          <UpcomingItem key={`${event.date}-${index}`} event={event} />
        ))
      ) : (
        <Text fontSize="xl" color="white">
          No upcoming event
        </Text>
      )}
    </Box>
  );
};

export default UpcomingList;
