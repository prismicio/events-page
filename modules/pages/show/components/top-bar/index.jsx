import React from 'react';
import { Flex, Image, Divider, Box, Heading } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const Topbar = ({ heading, icon }) => {
  return (
    <Box>
      <Flex justify="space-between" pb={4}>
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
          alt={icon?.alt}
          htmlWidth={`${icon?.dimensions?.width}px`}
          htmlHeight={`${icon?.dimensions?.height}px`}
          w={`${icon?.dimensions?.width}px`}
          h={`${icon?.dimensions?.height}px`}
        />
      </Flex>
      <Divider variant="dashed" />
    </Box>
  );
};

export default Topbar;
