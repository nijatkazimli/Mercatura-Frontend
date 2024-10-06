import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Button, Callout, Flex, Select, Text,
} from '@radix-ui/themes';
import './Authorization.css';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import {
  postData, AuthResponse, RolesResponse, fetchData,
} from '../../api';
import AuthContext from '../../hooks/AuthContext';
import useWindowDimensions from '../../hooks/WindowDimensions';
import { toTitleCase } from '../../common/utils';
import ROLES from '../../constants/Roles';

type Props = {
  isLogin: boolean,
}

function LoginPage({ isLogin }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<RolesResponse>();
  const [selectedRole, setSelectedRole] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const { setAuthResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

  useEffect(() => {
    (async () => {
      try {
        const fetchedRoles = await fetchData<RolesResponse>('/auth/role');
        setRoles(fetchedRoles);
      } catch (e) {
        setError('Failed to get roles');
      }
    })();
  }, []);

  useEffect(() => {
    if (isLogin) {
      setFirstName('');
      setLastName('');
      setSelectedRole(undefined);
    }
  }, [isLogin]);

  const onAuthSubmitClicked = async () => {
    try {
      const loginBody = { username, password };
      const registerBody = {
        ...loginBody, firstName, lastName, role: selectedRole,
      };
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
    setSelectedRole(undefined);
    setError(null);
  };

  return (
    <Flex direction="column" display="flex" className="login-page-container" style={{ height }}>
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
              {roles && (
                <Flex mb="15px" direction="row" justify="between" align="center">
                  <Text as="label" htmlFor="role">Role</Text>
                  <Select.Root value={selectedRole} onValueChange={setSelectedRole} defaultValue={ROLES.USER}>
                    <Select.Trigger placeholder="Role" />
                    <Select.Content color="purple">
                      <Select.Group>
                        {roles.roles.map((role) => (
                          <Select.Item key={role} value={role}>
                            {toTitleCase(role)}
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              )}
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
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </Box>
          <Callout.Root className="callout-auth" variant="surface">
            <Flex direction="row" gap="2">
              <Callout.Icon>
                <QuestionMarkCircledIcon />
              </Callout.Icon>
              <Callout.Text style={{ whiteSpace: 'pre-wrap' }}>
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
