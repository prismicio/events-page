import { Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { Elements } from 'prismic-reactjs';
import { v4 as uuidv4 } from 'uuid';

export default function htmlSerializer(type, element, content, children, key) {
  let props = {};
  switch (type) {
    case Elements.heading1:
      return (
        <Heading key={uuidv4()} color="red.600" size="xs">
          {children}
        </Heading>
      );
    case Elements.heading2:
      return (
        <Heading
          key={uuidv4()}
          textTransform="uppercase"
          color="white"
          size="sm"
          as="h2"
        >
          {children}
        </Heading>
      );
    case Elements.heading3:
      return (
        <Heading
          key={uuidv4()}
          fontWeight="normal"
          color="white"
          size="lg"
          as="h3"
          mb="2"
        >
          {children}
        </Heading>
      );
    case Elements.heading4:
      return (
        <Heading key={uuidv4()} size="md" as="h2">
          {children}
        </Heading>
      );
    case Elements.list:
      return <UnorderedList key={uuidv4()}>{children}</UnorderedList>;
    case Elements.listItem:
      return (
        <ListItem listStylePosition="inside" key={uuidv4()}>
          {children}
        </ListItem>
      );
    case Elements.heading5:
      return (
        <Heading key={uuidv4()} size="sm" as="h2">
          {children}
        </Heading>
      );
    case Elements.heading6:
      return (
        <Heading key={uuidv4()} size="xs" as="h2">
          {children}
        </Heading>
      );
    case Elements.paragraph:
      return (
        <Text key={uuidv4()} color="white" fontSize="3xl" mb="4">
          {children}
        </Text>
      );
  }
}
