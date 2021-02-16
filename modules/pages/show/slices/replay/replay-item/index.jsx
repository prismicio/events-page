import React from 'react';
import { Box, Text, Flex, SimpleGrid, Heading } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';
import Imgix from 'react-imgix';

const ReplayItem = ({ replay }) => {
  return (
    <SimpleGrid columns="2" spacing="8">
      <Imgix
        src={replay?.thumbnail?.url}
        alt={replay?.thumbnail?.alt}
        width={replay?.thumbnail?.dimensions?.width}
        height={replay?.thumbnail?.dimensions?.height}
      />
      <Box>
        <Text
          fontWeight="bold"
          color="white"
        >{`EPISODE ${replay.number}`}</Text>
        <Heading mt="4" fontWeight="normal" color="white" size="lg" as="h3">
          {RichText.asText(replay.title)}
        </Heading>
        <Text mt="4" color="white" fontSize="md">
          {RichText.asText(replay?.description)}
        </Text>
      </Box>
    </SimpleGrid>
  );
};

export default ReplayItem;
