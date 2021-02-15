import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

const VideoBg = ({ source, height, width }) => {
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
      height={height}
      width={width}
      as="video"
      poster="/no-signal.jpg"
      _before={after}
    >
      <Box as="source" src={source} />
    </Box>
  );
};

const after = {
  content: '""',
  position: 'absolute',
  bgGradient: ['linear(to-r, transparent 10%,  black 100%)'],
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
};

VideoBg.propTypes = {
  source: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default VideoBg;
