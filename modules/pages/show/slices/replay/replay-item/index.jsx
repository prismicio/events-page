import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const ReplayItem = ({ replay }) => {
  return (
    <Flex wrap="wrap">
      <Image
        src={replay?.thumbnail?.url}
        alt={replay?.thumbnail?.alt}
        htmlWidth={`${replay?.thumbnail?.dimensions?.width}px`}
        htmlHeight={`${replay?.thumbnail?.dimensions?.height}px`}
        w={`${replay?.thumbnail?.dimensions?.width}px`}
        h={`${replay?.thumbnail?.dimensions?.height}px`}
      />
      <Box>
        <RichText render={replay.title} htmlSerializer={htmlSerializer} />
        <RichText render={replay.description} htmlSerializer={htmlSerializer} />
        <Text mt={4} variant="date">
          {replay.number}
        </Text>
      </Box>
    </Flex>
  );
};

export default ReplayItem;
