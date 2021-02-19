import React from 'react';
import { Box, Text, Image, Flex, Heading, Badge } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { RichText } from 'prismic-reactjs';

const UpcomingItem = ({ event, icon }) => {
  const parsedDate = dayjs(event?.date, 'YYYY-MM-DD-HH-MM-SS').format(
    'ddd, MMM D, YYYY h:mm A',
  );
  return (
    <Box borderRadius="0.375em" bg="#111111" p={['6', null, '12']}>
      <Badge variant="episode">{`EPISODE ${event?.episode_number}`}</Badge>
      <Heading
        isTruncated
        mt="6"
        color="white"
        fontSize={['2xl', null, '3xl']}
        as="h3"
      >
        {RichText.asText(event?.title)}
      </Heading>
      <Flex mt={4} alignItems="center">
        <Image
          mr={2}
          src={icon?.url}
          alt={icon?.alt || 'Product Meeetup'}
          htmlWidth={`${icon?.dimensions?.width}px`}
          htmlHeight={`${icon?.dimensions?.height}px`}
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
