import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Flex, TextField } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes/dist/cjs/components/callout';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/selectors';
import './Profile.css';
import Images from '../../constants/Images';
import AuthContext from '../../hooks/AuthContext';
import FileUploadPopup from '../General/FileUploadPopup/FileUploadPopup';
import { postImage } from '../../api';
import { getUser } from '../../redux/actions';

function Profile() {
  const user = useSelector(selectUser);
  const { authResponse, setAuthResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    setAuthResponse(null);
    navigate('/');
  };

  const onProfilePhotoUpload = async (profilePicture: File[]) => {
    if (user && authResponse?.token) {
      const { token } = authResponse;
      const { id } = user;
      await postImage(`/user/${id}/image`, profilePicture[0], token);
      dispatch(getUser({ userId: id, token }));
    }
  };

  return (
    authResponse ? (
      <Flex p="8" style={{ justifyContent: 'space-around' }}>
        <Flex direction="column" gap="2" align="center">
          <img
            src={user.profileImage ?? Images.defaultProfilePicture.src}
            alt={Images.defaultProfilePicture.alt}
            className="profile-image"
          />
          <Flex direction="row" gap="3">
            <FileUploadPopup
              trigger={(
                <Button color="purple" size="3" style={{ maxWidth: 200 }}>
                  Change Profile Picture
                </Button>
              )}
              title="Change your profile picture"
              multiple={false}
              onUpload={onProfilePhotoUpload}
            />
            <Button onClick={logOut} color="red" size="3" style={{ maxWidth: 120 }}>
              Log Out
            </Button>
          </Flex>
        </Flex>
        <Flex direction="column" gap="2" ml="4">
          <Text size="7">
            {user.firstName}
            {' '}
            {user.lastName}
          </Text>
          <Text size="5">{user.userName}</Text>
          <Text mt="3">
            Set a new password
          </Text>
          <TextField.Root placeholder="New password" type="password">
            <TextField.Slot />
          </TextField.Root>
          <TextField.Root placeholder="Repeat password" type="password">
            <TextField.Slot />
          </TextField.Root>
          <Button color="purple">
            Change Password
          </Button>
        </Flex>
      </Flex>
    ) : (
      <p>You are not logged in!</p>
    )
  );
}

export default Profile;
