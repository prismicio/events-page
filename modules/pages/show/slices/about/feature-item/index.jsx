import React from 'react';
import { Box } from '@chakra-ui/react';
import Imgix from 'react-imgix';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const Feature = ({ picture, title, description }) => {
  return (
    <Box mb="4">
      <Imgix
        width={picture?.dimensions?.width}
        height={picture?.dimensions?.height}
        src={picture?.url}
      />
      <RichText render={title} htmlSerializer={htmlSerializer} />
      <RichText render={description} htmlSerializer={htmlSerializer} />
    </Box>
  );
};

export default Feature;
