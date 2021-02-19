import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  useDisclosure,
  Image,
  Box,
  Container,
  Text,
  arrow,
} from '@chakra-ui/react';
import { PrismicContext } from '@/contexts/index';
import { RichText } from 'prismic-reactjs';
import { useRouter } from 'next/router';
import { ArrowForwardIcon } from '@chakra-ui/icons';

function RegisterModal() {
  const router = useRouter();
  const query = router.query;
  const [show] = useContext(PrismicContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState('');
  const [hasRegister, setRegister] = useState(false);

  useEffect(() => {
    if (query.email) setEmail(query.email);
    if (query.lastname) setLastName(query.lastname);
    if (query.firstname) setFirstName(query.firstname);
  }, [query]);

  const CALENDAR_CID = `https://calendar.google.com/calendar/u/1?cid=${show?.calendar_cid}`;

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/mailchimp', {
        method: 'POST',
        body: JSON.stringify({
          lastName,
          firstName,
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

  return (
    <Fragment>
      <Button
        width={['100%', null, 'inherit']}
        height="52px"
        aria-label="open register form"
        colorScheme="brand"
        mt={4}
        onClick={onOpen}
      >
        {show?.button}
        <ArrowForwardIcon ml="2" w="5" h="5" />
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
          <ModalCloseButton
            aria-label="close register form"
            px="4"
            color="white"
          />
          <Container pt="12" pb="4" px="12" centerContent bg="black">
            <Image
              ignoreFallback={true}
              my={8}
              src={show?.logo?.url}
              alt={show?.logo?.alt || 'Product Meeetup'}
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
                    sx={{ '::placeholder': { color: 'white', opacity: '.3' } }}
                    focusBorderColor="white"
                    color="white"
                    ref={initialRef}
                    defaultValue={query.email || ''}
                    type="email"
                    placeholder={show?.email_placeholder}
                    size="lg"
                    variant="flushed"
                    aria-label="your email"
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
                aria-label="submit your email"
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
                aria-label="show the calendar"
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
