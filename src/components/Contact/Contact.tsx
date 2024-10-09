import { Box, Flex } from '@radix-ui/themes';
import React from 'react';
import useWindowDimensions from '../../hooks/WindowDimensions';
import './Contact.css';

function Contact() {
  const { height } = useWindowDimensions();
  return (
    <Flex
      direction="column"
      display="flex"
      className="contact-page-container"
      style={{ height }}
    >
      <Box />
    </Flex>
  );
}

export default Contact;
