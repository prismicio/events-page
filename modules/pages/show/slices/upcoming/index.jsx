import React from 'react';
import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import Topbar from '@/modules/pages/show/components/top-bar';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const UpcomingItem = ({ event }) => {
  return (
    <Box mb="4">
      <RichText render={event.title} htmlSerializer={htmlSerializer} />
      <Text mt={4} variant="date">
        {event.date}
      </Text>
    </Box>
  );
};

const UpcomingList = ({ heading, topBarIcon, events }) => {
  return (
    <Box mt={20}>
      <Topbar heading={heading} icon={topBarIcon} />
      <VStack
        py={8}
        spacing={8}
        align="start"
        divider={<Divider opacity="10%" />}
      >
        {events.length > 0 ? (
          events.map((event, index) => (
            <UpcomingItem key={`${event.date}-${index}`} event={event} />
          ))
        ) : (
          <Box>
            <Text fontSize="xl" color="white">
              No upcoming event
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default UpcomingList;
