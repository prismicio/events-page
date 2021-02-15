import VideoBg from '@/modules/pages/show/video-bg';
import { Flex, Box, Image, Text, Container, Center } from '@chakra-ui/react';
import { getShowByUid } from 'lib/prismic';

const leftSideStyles = {
  display: 'flex',
  flex: 1,
  position: 'relative',
  height: '100vh',
  _after: {
    content: '""',
    position: 'absolute',
    bgGradient: ['linear(to-r, transparent 10%,  black 100%)'],
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
};

export default function IndexPage({ show }) {
  console.log(show);
  return (
    <Flex wrap="wrap">
      <Box {...leftSideStyles}>
        <Container zIndex="2" centerContent justifyContent="center">
          <Text color="white" fontSize="sm">
            {show.tagline}
          </Text>
          <Image
            src={show?.logo?.url}
            alt={show?.logo?.alt}
            w={show?.logo?.dimensions?.width}
            h={show?.logo?.dimensions?.height}
          />
          <Image
            src={show?.broadcast?.url}
            alt={show?.broadcast?.alt}
            w={show?.broadcast?.dimensions?.width}
            h={show?.broadcast?.dimensions?.height}
          />
        </Container>
        <VideoBg source={show?.video?.url} />
      </Box>
      <Box flex={1} bg="black">
        hello
      </Box>
    </Flex>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const show = await getShowByUid('product-meetup', 'en-us', previewData);
  return {
    props: {
      show,
    },
  };
}
