import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Badge,
  Progress,
  Link,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { RichText } from 'prismic-reactjs';
import { useElapsedTime } from 'use-elapsed-time';

const LiveItem = ({ event, icon }) => {
  dayjs.extend(customParseFormat);
  const parsedDate = dayjs(event?.date, 'YYYY-MM-DDTHH:mm:ss.000ZZ').format(
    'ddd, MMM D, YYYY h:mm A',
  );

  return (
    <Box bg="black" borderRadius="0.375em" p={['6', null, '12']}>
      <Flex justifyContent="space-between">
        <Badge variant="live">{`EPISODE ${event?.episode_number} ON AIR`}</Badge>
      </Flex>
      <Flex justifyContent="space-between" mt="6" alignItems="start">
        <Link
          _hover={{ textDecoration: 'none' }}
          isExternal
          href={event.stream.url}
        >
          <Heading color="white" fontSize={['2xl', null, '3xl']} as="h3">
            {RichText.asText(event?.title)}
          </Heading>
        </Link>

        <Button colorScheme="brand" size="sm" rightIcon={<ViewIcon />}>
          <Link
            _hover={{ textDecoration: 'none' }}
            isExternal
            href={event.stream.url}
          >
            Watch
          </Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default LiveItem;
