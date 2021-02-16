import {
  ChakraProvider,
  extendTheme,
  GlobalStyle,
  CSSReset,
} from '@chakra-ui/react';
import Layout from '@/modules/layout';

const customFont = `
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(fonts/Inter-Regular.ttf) format('ttf');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Inter';
  font-style: medium;
  font-weight: 500;
  font-display: swap;
  src: url(fonts/Inter-Medium.ttf) format('ttf');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Inter';
  font-style: bold;
  font-weight: 700;
  font-display: swap;
  src: url(fonts/Inter-Bold.ttf) format('ttf');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
`;

const customTheme = {
  styles: {
    global: {
      'html, body': {
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
      <GlobalStyle styles={customFont} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
