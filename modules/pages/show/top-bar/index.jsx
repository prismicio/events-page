import React from 'react';
import { Flex, Image, Divider, Box } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const Topbar = ({ heading, icon }) => {
  return (
    <Box mb={4}>
      <Flex justify="space-between" pb={4}>
        <RichText render={heading} htmlSerializer={htmlSerializer} />
        <Image
          src={icon?.url}
          alt={icon?.alt}
          htmlWidth={`${icon?.dimensions?.width}px`}
          htmlHeight={`${icon?.dimensions?.height}px`}
          w={`${icon?.dimensions?.width}px`}
          h={`${icon?.dimensions?.height}px`}
        />
      </Flex>
      <Divider />
    </Box>
  );
};

export default Topbar;
