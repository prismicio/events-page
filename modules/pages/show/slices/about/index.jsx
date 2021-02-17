import React from 'react';
import { Box, Divider, SimpleGrid, Text } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import Feature from './feature-item';

const About = ({ description, features }) => {
  return (
    <Box mt={4}>
      <Divider opacity="0.1" />
      <Text mt={16} color="white" fontSize="3xl">
        {RichText.asText(description)}
      </Text>
      <SimpleGrid mt={8} columns={[1, 1, 2]} spacing={8}>
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
