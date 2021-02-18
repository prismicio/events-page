import {
  ChakraProvider,
  extendTheme,
  GlobalStyle,
  CSSReset,
} from '@chakra-ui/react';

const customTheme = {
  styles: {
    global: {
      'html, body': {
        background: 'black',
        scrollBehavior: 'smooth',
        overflow: ['scroll', null, 'hidden'],
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
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
