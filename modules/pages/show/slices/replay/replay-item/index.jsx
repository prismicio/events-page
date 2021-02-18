import React from 'react';
import { Box, Text, SimpleGrid, Link } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';
import Imgix from 'react-imgix';
import { format } from 'date-fns';

const ReplayItem = ({ replay }) => {
  const eventDate = format(new Date(replay?.epdate), 'MMMM yyyy');
  return (
    <SimpleGrid
      _hover={{ opacity: '1' }}
      transition="opacity 300ms"
      opacity="0.7"
      columns={[1, 1, 2]}
      spacing="8"
    >
      <Link href={replay?.link.url} isExternal>
        <Box borderRadius="md" overflow="hidden">
          <Imgix
            htmlAttributes={{ alt: replay?.alt || 'Product Meeetup Replay' }}
            src={replay?.thumbnail?.url}
            alt={replay?.thumbnail?.alt || 'Product Meeetup'}
            width={replay?.thumbnail?.dimensions?.width}
            height={replay?.thumbnail?.dimensions?.height}
          />
        </Box>
      </Link>
      <Link
        _hover={{ textDecoration: 'none' }}
        href={replay?.link.url}
        isExternal
      >
        <Text variant="label">{`EPISODE ${replay?.number} • ${eventDate}`}</Text>
        <Box mt="4">
          <RichText render={replay.title} htmlSerializer={htmlSerializer} />
          <Text mt="4" color="white" fontSize="md">
            {RichText.asText(replay?.description)}
          </Text>
        </Box>
      </Link>
    </SimpleGrid>
  );
};

export default ReplayItem;
