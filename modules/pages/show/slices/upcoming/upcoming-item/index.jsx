import React from 'react';
import { Box, Text, Image, Flex, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';
import { RichText } from 'prismic-reactjs';

const UpcomingItem = ({ event, icon }) => {
  const eventDate = format(new Date(event.date), 'dd MMMM yyyy HH:mm');
  return (
    <Box borderRadius="0.375em" bg="#101010" p="8" mb="4">
      <Heading color="white" fontSize="xl" as="h3">
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
        <Text variant="date">{eventDate}</Text>
      </Flex>
    </Box>
  );
};

export default UpcomingItem;
