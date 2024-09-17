import React, { useContext, useState } from 'react';
import {
  Box, Button, Callout, Flex, Text,
} from '@radix-ui/themes';
import './Authorization.css';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { postData, AuthResponse } from '../../api';
import AuthContext from '../../hooks/AuthContext';
import useWindowDimensions from '../../hooks/WindowDimensions';

type Props = {
  isLogin: boolean,
}

function LoginPage({ isLogin }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setAuthResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  // TODO: add it to global constants
  const layoutHeight = 80;

  const onAuthSubmitClicked = async () => {
    try {
      const loginBody = { username, password };
      const registerBody = { ...loginBody, firstName, lastName };
      const path = `/auth/${isLogin ? 'login' : 'register'}`;
      const authResponse = await postData<AuthResponse>(path, isLogin ? loginBody : registerBody);
      setAuthResponse(authResponse);
      navigate('/');
    } catch (error) {
      setError('Failed to authorize.');
      setAuthResponse(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAuthSubmitClicked();

    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    setError(null);
  };

  return (
    <Flex direction="column" display="flex" className="login-page-container" style={{ height: height - layoutHeight }}>
      <Box maxWidth="400px" className="login-form">
        {error && <Text color="red" mb="10px">{error}</Text>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Box mb="15px">
                <Text as="label" htmlFor="firstName">First Name</Text>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setError(null); }}
                  required
                  placeholder="Enter your first name"
                  className="login-input"
                />
              </Box>
              <Box mb="15px">
                <Text as="label" htmlFor="lastName">Last Name</Text>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setError(null); }}
                  required
                  placeholder="Enter your last name"
                  className="login-input"
                />
              </Box>
            </>
          )}
          <Box mb="15px">
            <Text as="label" htmlFor="username">Username</Text>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(null); }}
              required
              placeholder="Enter your username"
              className="login-input"
            />
          </Box>
          <Box mb="15px">
            <Text as="label" htmlFor="password">Password</Text>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              required
              placeholder="Enter your password"
              className="login-input"
            />
          </Box>
          <Callout.Root className="callout-auth" variant="surface">
            <Flex direction="row" gap="2">
              <Callout.Icon>
                <QuestionMarkCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                {isLogin ? 'You do not have an account?' : 'You have an account?'}
              </Callout.Text>
              <Button className="auth-navigation-button" type="button" onClick={() => navigate(isLogin ? '/auth/register' : '/auth/login')}>
                {isLogin ? 'Register now' : 'Login now'}
              </Button>
            </Flex>
          </Callout.Root>
          <Button type="submit" color="purple" size="3">
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginPage;
