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
  components: {
    Container: {
      sizes: {
        default: {
          maxWidth: '1280px',
        },
      },
      variants: {
        'dev-mode': {},
      },
    },
    Link: {
      sizes: {
        large: {
          p: '4',
        },
      },
      variants: {
        amz: {
          w: '100%',
          textAlign: 'center',
          display: 'inline-block',
          bg: 'yellow.400',
          borderRadius: '4px',
          _hover: {
            bg: 'yellow.500',
            textDecoration: 'none',
          },
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
