import { Container } from "@chakra-ui/react";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <Container pt="100px" maxW="1140px" role="main">
      <Header />
      {children}
    </Container>
  );
}
