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
import { PrismicContext } from '@/contexts/index';
import { RichText } from 'prismic-reactjs';

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
    try {
      const res = await fetch('/api/mailchimp', {
        method: 'POST',
        body: JSON.stringify({
          email,
          listId: show.mailchimp_list_id,
        }),
      });
      setRegister(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  console.log('the context', show);

  return (
    <Fragment>
      <Button height="52px" colorScheme="brand" mt={4} onClick={onOpen}>
        {show?.button}
      </Button>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay sx={{ backdropFilter: 'blur(6px)' }} />
        <ModalContent>
          <ModalCloseButton px="4" color="white" />
          <Container pt="12" pb="4" px="12" centerContent bg="black">
            <Image
              my={8}
              src={show?.logo?.url}
              alt={show?.logo?.alt}
              htmlWidth={`${show?.logo?.dimensions?.width}px`}
              htmlHeight={`${show?.logo?.dimensions?.height}px`}
              w={`${show?.logo?.dimensions?.width}` / 2}
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
            <ModalBody bg="black" py={4} px="12">
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

          <ModalFooter pb="16" px="12" bg="black">
            {!hasRegister ? (
              <Button
                colorScheme="brand"
                size="lg"
                height="52px"
                isFullWidth
                isLoading={loading}
                form="register"
                type="submit"
              >
                {show?.button_for_register}
              </Button>
            ) : (
              <Button
                colorScheme="brand"
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
