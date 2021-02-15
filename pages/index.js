import { Flex, Box, Container, Text } from "@chakra-ui/react";

const VideoBg = () => {
  return (
    <Box
      position="relative"
      _after={{
        content: '"/"',
        position: "absolute",
        bg: "red.600",
        opacity: "0.5",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      <Box
        autoPlay
        loop
        muted
        as="video"
        height={["50vh", "50vh", "100vh"]}
        w="100%"
        objectFit="cover"
      >
        <Box
          as="source"
          src="https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4"
        />
      </Box>
    </Box>
  );
};

export default function IndexPage({ allEvents }) {
  return (
    <Flex flexDir={["column", "column", "row"]} minH="100vh">
      <Box flex={["0", "0", 1]}>
        <VideoBg />
      </Box>
      <Box flex={1} bg="black">
        hello
      </Box>
    </Flex>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  //const allPosts = await getAllPosts(previewData);
  return {
    props: {},
  };
}
