import {
  ChakraProvider,
  extendTheme,
  GlobalStyle,
  CSSReset,
} from '@chakra-ui/react';
import Layout from '@/modules/layout';

const customTheme = {
  fonts: {
    heading: 'Roboto Slab',
  },
  colors: {
    black: '#0C0C0C',
    brand: {
      900: 'blue',
      800: 'red',
      700: 'yellow',
      600: 'pink',
    },
  },
  letterSpacings: {
    large: '0.15em',
    largest: '0.3em',
  },
  components: {
    Text: {
      variants: {
        tagline: {
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: 'largest',
          opacity: '70%',
        },
      },
    },
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
