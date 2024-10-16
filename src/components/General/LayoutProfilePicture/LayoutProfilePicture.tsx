import React, { useContext } from 'react';
import './LayoutProfilePicture.css';
import { Avatar, DropdownMenu } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ExitIcon } from '@radix-ui/react-icons';
import Images from '../../../constants/Images';
import AuthContext from '../../../hooks/AuthContext';
import { selectCarts, selectUser } from '../../../redux/selectors';
import { setUser } from '../../../redux/actions';
import { User } from '../../../api';

function LayoutProfilePicture() {
  const { setAuthResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const carts = useSelector(selectCarts);
  const user = useSelector(selectUser);
  const cartsCount = carts.length > 0 ? carts.length.toString() : '';

  const logOut = () => {
    setAuthResponse(null);
    setUser({} as User);
    navigate('/');
  };

  const goToCarts = () => {
    navigate('/cart');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          className="layout-profile-picture"
          src={user.profileImage ?? Images.defaultProfilePicture.src}
          alt={Images.defaultProfilePicture.alt}
          fallback="USER"
          size="4"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={goToProfile}>
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={goToCarts} shortcut={cartsCount}>
          My Carts
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={logOut} color="red">
          Log Out
          <ExitIcon />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default LayoutProfilePicture;
