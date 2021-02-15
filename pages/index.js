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
  console.log(show?.broadcast?.dimensions?.width);
  return (
    <Flex wrap="wrap">
      <Box {...leftSideStyles}>
        <Container zIndex="2" centerContent justifyContent="center">
          <Text color="white" fontSize="sm">
            {show.tagline}
          </Text>
          <Image
            fallbackSrc="./no-signal.jpg"
            src={show?.logo?.url}
            alt={show?.logo?.alt}
            htmlWidth={`${show?.logo?.dimensions?.width}px`}
            htmlHeight={`${show?.logo?.dimensions?.height}px`}
            w={`${show?.logo?.dimensions?.width}px`}
            h={`${show?.logo?.dimensions?.height}px`}
          />
          <Image
            fallbackSrc="./no-signal.jpg"
            src={show?.broadcast?.url}
            alt={show?.broadcast?.alt}
            htmlWidth={`${show?.broadcast?.dimensions?.width}px`}
            htmlHeight={`${show?.broadcast?.dimensions?.height}px`}
            w={`${show?.broadcast?.dimensions?.width}px`}
            h={`${show?.broadcast?.dimensions?.height}px`}
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
