import React from 'react';
import { Box } from '@chakra-ui/react';
import Imgix from 'react-imgix';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';

const Feature = ({ picture, title, description }) => {
  return (
    <Box mb="4">
      <Imgix src={picture?.url} />
      <RichText render={title} htmlSerializer={htmlSerializer} />
      <RichText render={description} htmlSerializer={htmlSerializer} />
    </Box>
  );
};

const About = ({ description, features }) => {
  return (
    <Box>
      <RichText render={description} htmlSerializer={htmlSerializer} />
      {features &&
        features.map((feature) => (
          <Feature
            picture={feature.picture}
            title={feature.title}
            description={feature.description}
          />
        ))}
    </Box>
  );
};

export default About;
