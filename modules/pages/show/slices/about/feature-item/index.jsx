import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Imgix from 'react-imgix';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const Feature = ({ picture, title, description }) => {
  return (
    <Box>
      <Box borderRadius="md" overflow="hidden">
        <Imgix
          width={picture?.dimensions?.width}
          height={picture?.dimensions?.height}
          src={picture?.url}
        />
      </Box>
      <Box mt={6}>
        <RichText render={title} htmlSerializer={htmlSerializer} />
        <Text mt={2} color="white" fontSize="md" lineHeight="base">
          {RichText.asText(description)}
        </Text>
      </Box>
    </Box>
  );
};

export default Feature;
