import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const UpcomingItem = ({ event, icon }) => {
  return (
    <Box mb="4">
      <RichText render={event.title} htmlSerializer={htmlSerializer} />
      <Flex mt={4} justifyContent="space-between" alignItems="center">
        <Text variant="date">{event.date}</Text>
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
