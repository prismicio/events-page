import UpcomingList from '@/modules/pages/show/slices/upcoming';
import VideoBg from '@/modules/pages/show/components/video-bg';
import { Flex, Box, Image, Text, Container, Button } from '@chakra-ui/react';
import { getShowByUid } from 'lib/prismic';
import About from '@/modules/pages/show/slices/about';

const leftSideStyles = {
  display: 'inline-flex',
  position: 'relative',
  flex: 50,
  height: ['60vh', '60vh', '100vh'],
  _after: {
    content: '""',
    position: 'absolute',
    bgGradient: [
      'linear(to-r, transparent 10%,  black 100%)',
      'linear(to-b, transparent 10%,  black 100%)',
      'linear(to-r, transparent 10%,  black 100%)',
    ],
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
};

const SliceZone = ({ slices }) => {
  return slices?.map((slice, index) => {
    switch (slice.type) {
      case 'upcoming':
        return (
          <UpcomingList
            key={`${slice.type}-${index}`}
            heading={slice.primary.heading}
            topBarIcon={slice.primary.top_bar_icon}
            eventIcon={slice.primary.event_icon}
            events={slice.fields}
          />
        );
      case 'about':
        return (
          <About
            key={`${slice.type}-${index}`}
            description={slice.primary.description}
            features={slice.fields}
          />
        );
      default:
        return null;
    }
  });
};

const Header = ({ logo }) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Image
        my={8}
        fallbackSrc="./no-signal.jpg"
        src={logo?.url}
        alt={logo?.alt}
        htmlWidth={`${logo?.dimensions?.width}px`}
        htmlHeight={`${logo?.dimensions?.height}px`}
        w={`${logo?.dimensions?.width}px`}
        h={`${logo?.dimensions?.height}px`}
      />
      <Button colorScheme="brand">Add on the calendar</Button>
    </Flex>
  );
};

export default function IndexPage({ show }) {
  return (
    <Flex flexDirection={['column', 'column', 'row']}>
      <Box {...leftSideStyles}>
        <Container zIndex="2" centerContent justifyContent="center">
          <Text variant="tagline" fontSize="sm">
            {show.tagline}
          </Text>
          <Image
            my={8}
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
      <Box flex={50} bg="black">
        <Container maxW="full">
          <Header logo={show?.logo?.header} />
          <SliceZone slices={show?.body} />
        </Container>
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
