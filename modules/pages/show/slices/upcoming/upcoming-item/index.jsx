import React from 'react';
import { Box, Text, Image, Flex, Heading, Badge } from '@chakra-ui/react';
import { format } from 'date-fns';
import { RichText } from 'prismic-reactjs';

const UpcomingItem = ({ event, icon }) => {
  const eventDate = format(new Date(event.date), 'dd MMMM yyyy HH:mm');
  return (
    <Box borderRadius="0.375em" bg="#141414" p={['6', null, '8']}>
      <Badge variant="solid" colorScheme="brand">
        {' '}
        EPISODE X{' '}
      </Badge>
      <Heading isTruncated mt="4" color="white" fontSize="xl" as="h3">
        {RichText.asText(event.title)}
      </Heading>
      <Flex mt={4} alignItems="center">
        <Image
          mr={4}
          src={icon?.url}
          alt={icon?.alt}
          htmlWidth={`${icon?.dimensions?.width}px`}
          htmlHeight={`${icon?.dimensions?.height}px`}
          w={`${icon?.dimensions?.width}px`}
          h={`${icon?.dimensions?.height}px`}
        />
        <Text isTruncated variant="date">
          {eventDate}
        </Text>
      </Flex>
    </Box>
  );
};

export default UpcomingItem;
