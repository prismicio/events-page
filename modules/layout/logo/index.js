import { Image } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Image
      alt="prismic.io"
      margin={['auto', null, 'inherit']}
      w="90px"
      h="100%"
      htmlWidth="90px"
      htmlHeight="100%"
      src="/prismic-logo.svg"
    />
  );
}
