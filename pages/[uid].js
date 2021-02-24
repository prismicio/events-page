import UpcomingList from '@/modules/pages/show/slices/upcoming';
import VideoBg from '@/modules/pages/show/components/video-bg';
import {
  Flex,
  Box,
  Image,
  Text,
  Container,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { getAllShows, getShowByUid } from 'lib/prismic';
import About from '@/modules/pages/show/slices/about';
import ReplayList from '@/modules/pages/show/slices/replay';
import { RichText } from 'prismic-reactjs';
import RegisterModal from '@/modules/pages/show/components/register-modal';
import { PrismicContext } from 'contexts';
import Layout from '@/modules/layout';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { forwardRef, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import YouTube from 'react-youtube';
import styles from './player.module.css';

const leftSideStyles = {
  display: 'inline-flex',
  position: ['relative', null, 'fixed'],
  width: ['100%', null, '50%'],
  height: ['60vh', '60vh', '100vh'],
  _after: {
    zIndex: 0,
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

const Header = forwardRef(({ logo, label, name }, ref) => (
  <Box ref={ref} mt={[8, null, 24]}>
    <Text variant="label">{label}</Text>
    <Flex alignItems="center" justifyContent="space-between" wrap="wrap">
      <Heading mt={1} as="h1" color="white" fontSize={['4xl', null, '6xl']}>
        {RichText.asText(name)}
      </Heading>
      <RegisterModal logo={logo} />
    </Flex>
  </Box>
));

const StickyHeader = ({ logo, name, inView }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  return (
    <Box
      visibility={!loaded ? 'hidden' : 'visible'}
      pos="fixed"
      opacity={inView ? 0 : 1}
      transition="opacity 130ms ease-out"
      zIndex="13"
      top="0"
      w={['100%', null, '50%']}
      bg="black"
    >
      <Box paddingRight={['8', null, '20']} py="10">
        <Flex alignItems="center" justifyContent="space-between" wrap="wrap">
          <Heading
            transform={inView ? 'translateY(30px) ' : 'translateY(0px)'}
            transition="transform 0.2s ease-out 0.02s"
            opacity={inView ? 0 : 1}
            mt={1}
            as="h1"
            color="white"
            fontSize={['2xl', null, '3xl']}
          >
            {RichText.asText(name)}
          </Heading>
          <Box
            transform={inView ? 'translateY(30px) ' : 'translateY(0px)'}
            transition="transform 0.2s ease-out 0.04s"
            opacity={inView ? 0 : 1}
            w={['full', null, 'inherit']}
          >
            <RegisterModal logo={logo} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default function IndexPage({ show }) {
  const mainRef = useRef();
  const [isLive, setLive] = useState(true);
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: true,
  });

  useEffect(() => {
    if (isLive) {
      document.body.style.overflow = 'hidden';
      gsap.to(
        mainRef.current,
        {
          ease: 'slow',
          duration: 0.5,
          autoAlpha: 0,
          scale: 1.1,
          display: 'none',
          transformOrigin: '50% 0%',
        },
        1.5,
      );
    }
  }, [isLive]);

  const player = useRef();
  useEffect(() => {
    gsap
      .to(
        player.current,
        {
          ease: 'slow',
          visibility: 'visible',
          duration: 0.5,
          autoAlpha: 1,
        },
        1.8,
      )
      .then(() => {
        console.log(player.current);
        //player.current.internalPlayer.playVideo();
        //player.current.internalPlayer.unMute();
      });
  }, []);
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      enablejsapi: 1,
    },
  };

  return (
    <PrismicContext.Provider value={[show]}>
      <Layout>
        <Box
          ref={player}
          visibility="hidden"
          pos="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          height="100vh"
        >
          <YouTube
            containerClassName={styles.player}
            videoId="36YnV9STBqc"
            opts={opts}
            onReady={(event) => {
              event.target.mute();
              event.target.setVolume(50);
              event.target.playVideo();
            }}
          />
          ;
        </Box>
        <Flex ref={mainRef} flexDirection={['column', 'column', 'row']}>
          <Box {...leftSideStyles}>
            <Container zIndex="6" centerContent justifyContent="center">
              <Text
                mt={[24, null, 'inherit']}
                variant="tagline"
                fontSize={['xs', 'md', null]}
              >
                {show?.tagline}
              </Text>
              <Image
                ignoreFallback={true}
                my={[1, null, 8]}
                src={show?.logo?.url}
                alt={show?.logo?.alt || 'Product Meeetup'}
                htmlWidth={show?.logo?.dimensions?.width}
                htmlHeight={show?.logo?.dimensions?.height}
                w={[
                  show?.logo?.dimensions?.width / 1.5,
                  show?.logo?.dimensions?.width,
                ]}
                h={show?.logo?.dimensions?.height}
              />
              <Image
                ignoreFallback={true}
                src={show?.broadcast?.url}
                alt={show?.broadcast?.alt || 'Product Meeetup'}
                htmlWidth={show?.broadcast?.dimensions?.width}
                htmlHeight={show?.broadcast?.dimensions?.height}
                w={show?.broadcast?.dimensions?.width}
                h={show?.broadcast?.dimensions?.height}
              />
            </Container>
            <VideoBg source={show?.video?.url} />
          </Box>
          <Box bg="black" width={['100%', null, '50%']} ml="auto">
            <Container
              height={[null, null, '100vh']}
              maxW="full"
              paddingRight={['4', null, '20']}
              paddingLeft={['4', null, '0']}
              paddingBottom="8"
            >
              <Header
                ref={ref}
                label={show?.label}
                name={show?.name}
                logo={show?.logo}
              />
              <StickyHeader
                inView={inView}
                label={show?.label}
                name={show?.name}
                logo={show?.logo}
              />
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
