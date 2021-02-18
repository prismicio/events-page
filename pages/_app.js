import {
  ChakraProvider,
  extendTheme,
  GlobalStyle,
  CSSReset,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { pageview } from '@/lib/gtag';
import { useEffect } from 'react';

const customTheme = {
  styles: {
    global: {
      'html, body': {
        background: 'black',
        scrollBehavior: 'smooth',
        //overflow: ['scroll', null, 'hidden'],
      },
    },
  },
  colors: {
    black: '#0C0C0C',
    brand: {
      100: '#E7DBFF',
      400: '#BB99FF',
      500: '#6E52FF',
      600: '#5F2AF3',
      800: '#390ABD',
      900: '#2C283F',
    },
  },
  letterSpacings: {
    large: '0.15em',
    largest: '0.3em',
  },
  components: {
    Container: {
      sizes: {
        full: {
          width: '100%',
        },
      },
    },
    Badge: {
      variants: {
        episode: {
          pt: '0.10em',
          bg: 'brand.900',
          borderColor: '#3C3369 !important',
          color: 'brand.500',
          fontWeight: 'bold',
          border: '1px',
          px: '0.5em',
        },
      },
    },
    Text: {
      variants: {
        tagline: {
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: 'largest',
          opacity: '70%',
        },
        label: {
          fontWeight: 'bold',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          fontSize: 'sm',
          color: 'white',
        },
        date: {
          color: 'white',
          fontSize: 'sm',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        },
      },
    },
    Divider: {},
  },
};

const theme = extendTheme({ ...customTheme });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
