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
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

function RegisterModal({ logo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/mailchimp', {
        method: 'POST',
        body: JSON.stringify({
          listId: 'c5bc39a77f',
          email: email,
        }),
      });
      console.log(res.json());
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <Fragment>
      <Button colorScheme="brand" mt={4} onClick={onOpen}>
        Add on calendar
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="white" />
          <Container p="12" centerContent bg="black">
            <Image
              my={8}
              fallbackSrc="./no-signal.jpg"
              src={logo?.url}
              alt={logo?.alt}
              htmlWidth={`${logo?.dimensions?.width}px`}
              htmlHeight={`${logo?.dimensions?.height}px`}
              w={`${logo?.dimensions?.width}` / 3}
              h={`${logo?.dimensions?.height}`}
            />
            <Text fontWeight="bold" fontSize="2xl" color="white">
              Don't miss the next one
            </Text>
            <Text mt="1" textAlign="center" color="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </Text>
          </Container>
          <ModalBody bg="brand.500" pt={8} pb={2}>
            <form onSubmit={onSubmit} id="register">
              <FormControl isRequired>
                <Input
                  sx={{ '::placeholder': { color: 'white' } }}
                  focusBorderColor="white"
                  color="white"
                  ref={initialRef}
                  type="email"
                  placeholder="test@test.com"
                  size="lg"
                  variant="flushed"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter bg="brand.500">
            <Button
              isFullWidth
              isLoading={loading}
              form="register"
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

export default RegisterModal;
