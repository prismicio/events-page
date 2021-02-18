import React from 'react';
import { Flex, Image, Divider, Box, Heading } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const Topbar = ({ heading, icon }) => {
  return (
    <Box>
      <Flex alignItems="center" justify="space-between">
        <Heading
          letterSpacing="widest"
          textTransform="uppercase"
          fontSize="sm"
          color="white"
        >
          {RichText.asText(heading)}
        </Heading>
        <Image
          src={icon?.url}
          alt={icon?.alt || 'Product Meeetup'}
          htmlWidth={icon?.dimensions?.width}
          htmlHeight={icon?.dimensions?.height}
          w={`${icon?.dimensions?.width}px`}
          h={`${icon?.dimensions?.height}px`}
        />
      </Flex>
      <Divider opacity="0.2" pt={8} variant="dashed" />
    </Box>
  );
};

export default Topbar;
