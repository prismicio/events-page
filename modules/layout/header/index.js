import useWindowSize from "@/hooks/useWindowSize";
import { Box, Container, Flex, Link as CustomLink } from "@chakra-ui/react";
import Navigation from "@/modules/layout/navigation/desktop";
import MobileNavigation from "@/modules/layout/navigation/mobile";
import Logo from "@/modules/layout/logo";
import Link from "next/link";

export default function Header() {
  const size = useWindowSize();
  return (
    <Box as="header" position="absolute" w="100%" left="0" top="0">
      <Box bg="#FFF100" borderBottom="1px #f1f1f1 solid">
        <Container
          maxW="1140px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="50px"
        >
          <Link passHref href="/">
            <CustomLink>
              <Logo src={size.width} />
            </CustomLink>
          </Link>
          {size.width > 1000 ? <Navigation /> : <MobileNavigation />}
        </Container>
      </Box>
    </Box>
  );
}
