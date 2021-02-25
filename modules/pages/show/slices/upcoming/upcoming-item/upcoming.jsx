import React from 'react';
import { Box, Text, Image, Flex, Heading, Badge } from '@chakra-ui/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { RichText } from 'prismic-reactjs';

const UpcomingItem = ({ event, icon }) => {
  dayjs.extend(customParseFormat);
  const parsedDate = dayjs(event?.date, 'YYYY-MM-DDTHH:mm:ss.000ZZ').format(
    'ddd, MMM D, YYYY h:mm A',
  );
  return (
    <Box borderRadius="0.375em" bg="#111111" p={['6', null, '12']}>
      <Badge variant="episode">{`EPISODE ${event?.episode_number}`}</Badge>
      <Heading mt="6" color="white" fontSize={['2xl', null, '3xl']} as="h3">
        {RichText.asText(event?.title)}
      </Heading>
      <Flex mt={4} alignItems="center">
        <Image
          ignoreFallback={true}
          mr={2}
          src={icon?.url}
          alt={icon?.alt || 'Product Meeetup'}
          htmlWidth={icon?.dimensions?.width}
          htmlHeight={icon?.dimensions?.height}
          w={`${icon?.dimensions?.width}px`}
          h={`${icon?.dimensions?.height}px`}
        />
        <Text isTruncated variant="date">
          {parsedDate}
        </Text>
      </Flex>
    </Box>
  );
};

export default UpcomingItem;
