import React from 'react';
import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import Topbar from '@/modules/pages/show/components/top-bar';
import UpcomingItem from './upcoming-item';

const UpcomingList = ({ heading, topBarIcon, events, eventIcon }) => {
  return (
    <Box mt={24}>
      <Topbar heading={heading} icon={topBarIcon} />
      <VStack
        py={8}
        spacing={8}
        align="space-between"
        divider={<Divider opacity="10%" />}
      >
        {events.length > 0 ? (
          events.map((event, index) => (
            <UpcomingItem
              key={`${event.date}-${index}`}
              event={event}
              icon={eventIcon}
            />
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
