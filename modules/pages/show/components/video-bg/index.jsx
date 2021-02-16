import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

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
      <Box as="source" src={source} />
    </Box>
  );
};

VideoBg.propTypes = {
  source: PropTypes.string.isRequired,
};

export default VideoBg;
