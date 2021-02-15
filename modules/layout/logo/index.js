import { Text, Link } from "@chakra-ui/react";

export default function Logo({ src }) {
  return (
    <Text fontWeight="bold" fontSize="3xl">
      {src}
    </Text>
  );
}
