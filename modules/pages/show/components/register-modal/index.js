import React, { Fragment, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  Image,
  Box,
  Container,
} from '@chakra-ui/react';

function RegisterModal({ logo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  const [isRegistered, setRegister] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegister(true);
    }, 5000);
    console.log(email);
  };

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <Fragment>
      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="white">Yolo</ModalHeader>
          <ModalCloseButton color="white" />
          <Container p={12} centerContent bg="black">
            <Image
              my={8}
              fallbackSrc="./no-signal.jpg"
              src={logo?.url}
              alt={logo?.alt}
              htmlWidth={`${logo?.dimensions?.width}px`}
              htmlHeight={`${logo?.dimensions?.height}px`}
              w={`${logo?.dimensions?.width}` / 2}
              h={`${logo?.dimensions?.height}`}
            />
          </Container>
          <ModalBody pb={6}>
            <form onSubmit={onSubmit} id="register">
              <FormControl isRequired>
                <FormLabel color="black">Email</FormLabel>
                <Input
                  color="black"
                  ref={initialRef}
                  type="email"
                  placeholder="test@test.com"
                  size="lg"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading}
              form="register"
              type="submit"
              colorScheme="brand"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

export default RegisterModal;
