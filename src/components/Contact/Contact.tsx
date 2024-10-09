import {
  Avatar,
  Box,
  Card,
  DataList,
  Flex,
  Link,
  Text,
} from '@radix-ui/themes';
import React from 'react';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
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
      <Flex
        direction="column"
        align="center"
        maxWidth="500px"
        className="contact-page-info-box"
        style={{ border: '22px' }}
      >
        <Card style={{ borderRadius: '30px', padding: '20px' }}>
          <Flex gap="9" align="center">
            <Avatar
              size="9"
              src="https://avatars.githubusercontent.com/u/139158505?v=4"
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="7" weight="bold">
                Nijat Kazimli
              </Text>
              <Text as="div" size="3" color="gray">
                Software Engineer
              </Text>
            </Box>
          </Flex>
        </Card>
        <DataList.Root size="3" style={{ padding: '20px' }}>
          <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
            <DataList.Value>
              <Link href="mailto:nctkzmli@gmail.com" target="_blank">
                nctkzmli@gmail.com
              </Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label
              minWidth="88px"
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              GitHub
              <GitHubLogoIcon style={{ marginLeft: 5 }} />
            </DataList.Label>
            <DataList.Value>
              <Link href="https://github.com/nijatkazimli" target="_blank">
                nijatkazimli
              </Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label
              minWidth="88px"
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              LinkedIn
              <LinkedInLogoIcon style={{ marginLeft: 5 }} />
            </DataList.Label>
            <DataList.Value>
              <Link
                href="https://www.linkedin.com/in/nijat-kazimli-nk"
                target="_blank"
              >
                nijat-kazimli-nk
              </Link>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Flex>
    </Flex>
  );
}

export default Contact;
