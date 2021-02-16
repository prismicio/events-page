import React from 'react';
import { Box, Divider, Text, VStack, Image, Flex } from '@chakra-ui/react';
import Topbar from '@/modules/pages/show/components/top-bar';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const UpcomingItem = ({ event, icon }) => {
  return (
    <Box mb="4">
      <RichText render={event.title} htmlSerializer={htmlSerializer} />
      <Flex justifyContent="space-between" alignItems="baseline">
        <Text mt={4} variant="date">
          {event.date}
        </Text>
        <Image
          src={icon?.url}
          alt={icon?.alt}
          htmlWidth={`${icon?.dimensions?.width}px`}
          htmlHeight={`${icon?.dimensions?.height}px`}
          w={`${icon?.dimensions?.width}px`}
          h={`${icon?.dimensions?.height}px`}
        />
      </Flex>
    </Box>
  );
};

const UpcomingList = ({ heading, topBarIcon, events, eventIcon }) => {
  return (
    <Box mt={20}>
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
