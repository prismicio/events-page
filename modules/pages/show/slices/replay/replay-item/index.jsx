import React from 'react';
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Heading,
  Link,
  AspectRatio,
} from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';
import Imgix from 'react-imgix';

const ReplayItem = ({ replay }) => {
  return (
    <SimpleGrid columns={[1, 1, 2]} spacing="8">
      <Link href={replay?.link.url} isExternal>
        <Box borderRadius="md" overflow="hidden">
          <Imgix
            src={replay?.thumbnail?.url}
            alt={replay?.thumbnail?.alt}
            width={replay?.thumbnail?.dimensions?.width}
            height={replay?.thumbnail?.dimensions?.height}
          />
        </Box>
      </Link>
      <Link href={replay?.link.url} isExternal>
        <Text variant="label">{`EPISODE ${replay.number}`}</Text>
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
