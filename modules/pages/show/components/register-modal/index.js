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

/**
 * try {
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
 */

function RegisterModal({ logo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  const [hasRegister, setRegister] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRegister(true);
      setLoading(false);
    }, 2000);
  };

  const mock = {
    before: {
      title: 'Donne ton mail',
      description: 'blablablablablalbla',
    },
    after: {
      title: `Merci ${email}`,
      description: 'Add the calenddar',
    },
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
              {!hasRegister ? mock.before.title : mock.after.title}
            </Text>
            <Text mt="1" textAlign="center" color="white">
              {!hasRegister ? mock.before.description : mock.after.description}
            </Text>
          </Container>
          {!hasRegister ? (
            <ModalBody bg="brand.500" py={4} px={8}>
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
          ) : null}

          <ModalFooter bg="brand.500">
            {!hasRegister ? (
              <Button
                size="lg"
                isFullWidth
                isLoading={loading}
                form="register"
                type="submit"
              >
                Save
              </Button>
            ) : (
              <Button
                href="https://calendar.google.com/calendar/u/1?cid=Y181am03djNvc2tiNjd1NTE3cHJvMGE0dTEwY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
                as="a"
                target="_blank"
                size="lg"
                isFullWidth
                isLoading={loading}
                form="register"
                type="submit"
              >
                Click là pour ajouter le calendar
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

export default RegisterModal;
