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
      <source
        src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1621258966/prismic-pm_ibyhar.mp4"
        type="video/mp4"
      />
      <source
        src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1621258966/prismic-pm_ibyhar.webm"
        type="video/webm"
      />
      <source
        src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1621258966/prismic-pm_ibyhar.ogv"
        type="video/ogg"
      />
    </Box>
  );
};

VideoBg.propTypes = {
  source: PropTypes.string.isRequired,
};

export default VideoBg;
