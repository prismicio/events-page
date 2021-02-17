import useWindowSize from '@/hooks/useWindowSize';
import { Box, Container, Flex, Link as CustomLink } from '@chakra-ui/react';
import Logo from '@/modules/layout/logo';
import Link from 'next/link';

export default function Header() {
  const size = useWindowSize();
  return (
    <Box
      zIndex="10"
      p="8"
      as="header"
      position="absolute"
      w="100%"
      left="0"
      top="0"
    >
      <Box>
        <Link passHref href="/">
          <CustomLink>
            <Logo src={size.width} />
          </CustomLink>
        </Link>
      </Box>
    </Box>
  );
}
