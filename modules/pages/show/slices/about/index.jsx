import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from '@/modules/commons/serializer';
import Feature from './feature-item';

const About = ({ description, features }) => {
  return (
    <Box>
      <RichText render={description} htmlSerializer={htmlSerializer} />
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {features &&
          features.map((feature, index) => (
            <Feature
              key={`$feature-${index}`}
              picture={feature.picture}
              title={feature.title}
              description={feature.description}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default About;
