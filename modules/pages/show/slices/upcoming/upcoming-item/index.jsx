import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import { format } from 'date-fns';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const UpcomingItem = ({ event, icon }) => {
  const eventDate = format(new Date(event.date), 'dd MMMM yyyy HH:mm');
  return (
    <Box mb="4">
      <RichText render={event.title} htmlSerializer={htmlSerializer} />
      <Flex mt={4} justifyContent="space-between" alignItems="center">
        <Text variant="date">{eventDate}</Text>
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

export default UpcomingItem;
