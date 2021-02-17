import React, { Fragment, useContext, useState } from 'react';
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
import { PrismicContext } from '@/contexts/index';
import { RichText } from 'prismic-reactjs';

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

function RegisterModal() {
  const [show] = useContext(PrismicContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  const [hasRegister, setRegister] = useState(false);

  const CALENDAR_CID = `https://calendar.google.com/calendar/u/1?cid=${show?.calendar_cid}`;

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRegister(true);
      setLoading(false);
    }, 2000);
  };

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  console.log('the context', show);

  return (
    <Fragment>
      <Button colorScheme="brand" mt={4} onClick={onOpen}>
        {show?.button}
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
              src={show?.logo?.url}
              alt={show?.logo?.alt}
              htmlWidth={`${show?.logo?.dimensions?.width}px`}
              htmlHeight={`${show?.logo?.dimensions?.height}px`}
              w={`${show?.logo?.dimensions?.width}` / 3}
              h={`${show?.logo?.dimensions?.height}`}
            />
            <Text
              textAlign="center"
              fontWeight="bold"
              fontSize="1xl"
              color="white"
            >
              {!hasRegister
                ? RichText.asText(show?.title_before)
                : RichText.asText(show?.title_after)}
            </Text>
            <Text mt="1" textAlign="center" color="white">
              {!hasRegister
                ? RichText.asText(show?.description_before)
                : RichText.asText(show?.description_after)}
            </Text>
          </Container>
          {!hasRegister ? (
            <ModalBody bg="brand.500" py={4} px={8}>
              <form onSubmit={onSubmit} id="register">
                <FormControl isRequired>
                  <Input
                    sx={{ '::placeholder': { color: 'white', opacity: '.7' } }}
                    focusBorderColor="white"
                    color="white"
                    ref={initialRef}
                    type="email"
                    placeholder={show?.email_placeholder}
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
                {show?.button_for_register}
              </Button>
            ) : (
              <Button
                href={CALENDAR_CID}
                as="a"
                target="_blank"
                size="lg"
                isFullWidth
                isLoading={loading}
                form="register"
                type="submit"
              >
                {show?.button_for_calendar}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

export default RegisterModal;
