import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { Video } from 'cloudinary-react';

const VideoBg = ({ source }) => {
  const ref = useRef();
  return (
    <Box
      position="absolute"
      ref={ref}
      autoPlay
      muted
      playsInline
      loop
      objectFit="cover"
      width="100%"
      height="inherit"
      as="video"
      poster="/no-signal.jpg"
    >
      <source
        src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1613684508/last-test_jwynpc.mp4"
        type="video/mp4"
      />
      <source
        src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1613684508/last-test_jwynpc.webm"
        type="video/webm"
      />
      <source
        src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1613684508/last-test_jwynpc.ogv"
        type="video/ogg"
      />
    </Box>
  );
};

VideoBg.propTypes = {
  source: PropTypes.string.isRequired,
};

export default VideoBg;
