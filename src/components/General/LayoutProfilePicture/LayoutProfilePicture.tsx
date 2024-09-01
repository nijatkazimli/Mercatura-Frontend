import React, { useContext } from 'react';
import './LayoutProfilePicture.css';
import { Avatar, DropdownMenu } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Images from '../../../constants/Images';
import AuthContext from '../../../hooks/AuthContext';
import { selectCarts } from '../../../redux/selectors';

function LayoutProfilePicture() {
  const { setAuthResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const carts = useSelector(selectCarts);
  const cartsCount = carts.length > 0 ? carts.length.toString() : '';

  const logOut = () => {
    setAuthResponse(null);
    navigate('/');
  };

  const goToCarts = () => {
    navigate('/cart');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          className="layout-profile-picture"
          src={Images.defaultProfilePicture.src}
          alt={Images.defaultProfilePicture.alt}
          fallback="USER"
          size="4"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={goToCarts} shortcut={cartsCount}>
          My Carts
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={logOut} color="red">
          Log Out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default LayoutProfilePicture;
