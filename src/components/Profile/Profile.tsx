import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Callout, Flex, TextField, Tooltip,
} from '@radix-ui/themes';
import { Text } from '@radix-ui/themes/dist/cjs/components/callout';
import { useNavigate } from 'react-router-dom';
import {
  ExclamationTriangleIcon,
  ExitIcon,
  PlusCircledIcon,
  UpdateIcon,
} from '@radix-ui/react-icons';
import { selectUser } from '../../redux/selectors';
import './Profile.css';
import Images from '../../constants/Images';
import AuthContext from '../../hooks/AuthContext';
import FileUploadPopup from '../General/FileUploadPopup/FileUploadPopup';
import { postData, postImage } from '../../api';
import { getUser } from '../../redux/actions';

function Profile() {
  const user = useSelector(selectUser);
  const { authResponse, setAuthResponse } = useContext(AuthContext);
  const profilePictureTitle = user?.profileImage
    ? 'Change the profile picture'
    : 'Add a profile picture';
  const profilePictureButton = user?.profileImage
    ? 'Change profile picture'
    : 'Add profile picture';
  const profilePictureButtonIcon = user?.profileImage ? (
    <UpdateIcon />
  ) : (
    <PlusCircledIcon />
  );
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedNewPassword, setRepeatedNewPassword] = useState('');
  const [toolTipContent, setToolTipContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    setAuthResponse(null);
    navigate('/');
  };

  const changePassword = async () => {
    const body = {
      username: user.userName,
      currentPassword,
      newPassword,
    };
    try {
      await postData('/auth/change', body);
      logOut();
    } catch (e) {
      setError('Failed to change the password!');
    }
  };

  useEffect(() => {
    if (!authResponse) {
      navigate('/');
    }
  }, [authResponse]);

  useEffect(() => {
    setError('');
    if (currentPassword.length === 0) {
      setToolTipContent('Please enter the current password');
      setIsDisabled(true);
    } else if (newPassword.length === 0) {
      setToolTipContent('Please enter the new password');
      setIsDisabled(true);
    } else if (newPassword !== repeatedNewPassword) {
      setToolTipContent('Passowrds do not match');
      setIsDisabled(true);
    } else if (currentPassword === newPassword) {
      setToolTipContent('Your new password cannot be same');
      setIsDisabled(true);
    } else if (newPassword.length < 8) {
      setToolTipContent('You should enter at least 8 characters');
      setIsDisabled(true);
    } else {
      setToolTipContent('Change the password');
      setIsDisabled(false);
    }
  }, [currentPassword, newPassword, repeatedNewPassword]);

  const onProfilePhotoUpload = async (profilePicture: File[]) => {
    if (user && authResponse?.token) {
      const { token } = authResponse;
      const { id } = user;
      await postImage(`/user/${id}/image`, profilePicture[0], token);
      dispatch(getUser({ userId: id, token }));
    }
  };

  return authResponse ? (
    <Flex p="8" className="profile-container">
      <Flex direction="column" gap="2" align="center">
        <img
          src={user.profileImage ?? Images.defaultProfilePicture.src}
          alt={Images.defaultProfilePicture.alt}
          className="profile-image"
        />
        <Flex direction="row" gap="3">
          <FileUploadPopup
            trigger={(
              <Button color="purple" size="3" style={{ maxWidth: 230 }}>
                {profilePictureButtonIcon}
                {profilePictureButton}
              </Button>
            )}
            title={profilePictureTitle}
            multiple={false}
            onUpload={onProfilePhotoUpload}
          />
          <Button
            onClick={logOut}
            color="red"
            size="3"
            style={{ maxWidth: 120 }}
          >
            <ExitIcon />
            Log Out
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column" gap="2" ml="4" mt="2" minWidth="300px">
        <Text size="7">
          {user.firstName}
          {' '}
          {user.lastName}
        </Text>
        <Text size="5">{user.userName}</Text>
        <Text mt="3">Set a new password</Text>
        <TextField.Root
          placeholder="Current password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        >
          <TextField.Slot />
        </TextField.Root>
        <TextField.Root
          placeholder="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        >
          <TextField.Slot />
        </TextField.Root>
        <TextField.Root
          placeholder="Repeat password"
          type="password"
          value={repeatedNewPassword}
          onChange={(e) => setRepeatedNewPassword(e.target.value)}
        >
          <TextField.Slot color="red" />
        </TextField.Root>
        <Tooltip content={toolTipContent}>
          <Button color="purple" onClick={changePassword} disabled={isDisabled}>
            <UpdateIcon />
            Change Password
          </Button>
        </Tooltip>
        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <ExclamationTriangleIcon color="red" />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
      </Flex>
    </Flex>
  ) : (
    <p>You are not logged in!</p>
  );
}

export default Profile;
