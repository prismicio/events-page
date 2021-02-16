import React from 'react';
import { Box, Text, Flex, AspectRatio } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';
import Imgix from 'react-imgix';

const ReplayItem = ({ replay }) => {
  return (
    <Flex wrap="wrap">
      <Imgix
        src={replay?.thumbnail?.url}
        alt={replay?.thumbnail?.alt}
        width={replay?.thumbnail?.dimensions?.width}
        height={replay?.thumbnail?.dimensions?.height}
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
