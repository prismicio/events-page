import { Box, Link, HStack } from "@chakra-ui/react";

export default function Navigation() {
  return (
    <Box as="nav">
      <HStack listStyleType="none" as="ul">
        <Box as="li">
          <Link>Menu</Link>
        </Box>
        <Box as="li">
          <Link>Menu</Link>
        </Box>
        <Box as="li">
          <Link>Menu</Link>
        </Box>
      </HStack>
    </Box>
  );
}
