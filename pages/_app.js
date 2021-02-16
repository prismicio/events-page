import {
  ChakraProvider,
  extendTheme,
  GlobalStyle,
  CSSReset,
} from '@chakra-ui/react';
import Layout from '@/modules/layout';

const customTheme = {
  styles: {
    global: {
      'html, body': {
        overflow: 'hidden',
      },
    },
  },
  colors: {
    black: '#0C0C0C',
    brand: {
      500: '#6E52FF',
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
    Text: {
      variants: {
        tagline: {
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: 'largest',
          opacity: '70%',
        },
        date: {
          color: 'white',
          fontSize: 'md',
          fontWeight: 'bold',
        },
      },
    },
    Divider: {},
  },
};

const theme = extendTheme({ ...customTheme });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
