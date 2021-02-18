import UpcomingList from '@/modules/pages/show/slices/upcoming';
import VideoBg from '@/modules/pages/show/components/video-bg';
import { Flex, Box, Image, Text, Container, Heading } from '@chakra-ui/react';
import { getAllShows, getShowByUid } from 'lib/prismic';
import About from '@/modules/pages/show/slices/about';
import ReplayList from '@/modules/pages/show/slices/replay';
import { RichText } from 'prismic-reactjs';
import RegisterModal from '@/modules/pages/show/components/register-modal';
import { PrismicContext } from 'contexts';
import Layout from '@/modules/layout';
import queryString from 'querystring';
import { useRouter } from 'next/router';

const leftSideStyles = {
  display: 'inline-flex',
  position: 'relative',
  flex: 50,
  height: ['60vh', '60vh', '100vh'],
  _after: {
    zIndex: 4,
    content: '""',
    position: 'absolute',
    bgGradient: [
      'linear(to-b, transparent 10%,  black 100%)',
      'linear(to-b, transparent 10%,   black 100%)',
      'linear(to-r, transparent 10%,  black 85%, black 100%)',
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
      case 'replay':
        return (
          <ReplayList
            key={`${slice.type}-${index}`}
            heading={slice.primary.heading}
            topBarIcon={slice.primary.top_bar_icon}
            replays={slice.fields}
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

const Header = ({ label, name, logo }) => {
  return (
    <Box mt={[8, null, 24]} alignItems="center" justifyContent="space-between">
      <Text variant="label">{label}</Text>
      <Heading mt={1} as="h1" color="white" fontSize={['4xl', null, '6xl']}>
        {RichText.asText(name)}
      </Heading>
      <RegisterModal logo={logo} />
    </Box>
  );
};

export default function IndexPage({ show }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <PrismicContext.Provider value={[show]}>
      <Layout>
        <Flex flexDirection={['column', 'column', 'row']}>
          <Box {...leftSideStyles}>
            <Container zIndex="6" centerContent justifyContent="center">
              <Text variant="tagline" fontSize="sm">
                {show?.tagline}
              </Text>
              <Image
                my={[1, null, 8]}
                src={show?.logo?.url}
                alt={show?.logo?.alt}
                htmlWidth={`${show?.logo?.dimensions?.width}px`}
                htmlHeight={`${show?.logo?.dimensions?.height}px`}
                w={[
                  show?.logo?.dimensions?.width / 1.5,
                  show?.logo?.dimensions?.width,
                ]}
                h={show?.logo?.dimensions?.height}
              />
              <Image
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
            <Container
              overflowY={['hidden', null, 'scroll']}
              height={[null, null, '100vh']}
              maxW="full"
              paddingRight={['4', null, '20']}
              paddingLeft={['4', null, '0']}
              paddingBottom="8"
            >
              <Header label={show?.label} name={show?.name} logo={show?.logo} />
              <SliceZone slices={show?.body} />
            </Container>
          </Box>
        </Flex>
      </Layout>
    </PrismicContext.Provider>
  );
}

export async function getStaticPaths(context) {
  const data = await getAllShows();
  const paths = data.map((show) => ({
    params: {
      uid: show.node._meta.uid,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const show = await getShowByUid(params.uid, 'en-us', previewData);
  return {
    props: {
      show,
    },
  };
}
