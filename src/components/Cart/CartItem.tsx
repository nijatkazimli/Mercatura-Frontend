import React from 'react';
import {
  Badge, Button, Flex,
} from '@radix-ui/themes';
import { ArrowRightIcon, TrashIcon, CheckIcon } from '@radix-ui/react-icons';
import { isMobile } from 'react-device-detect';
import { CartUI } from './Carts';
import './CartItem.css';
import { Color } from '../../common/utils';
import { AlertDialog } from '../General/AlertDialog';

type ExtraProps = {
  index: number;
  onGoToCart: (id: string) => void;
  onPayCart: (id: string) => Promise<void>;
  onDeleteCart: (id: string) => Promise<void>;
};

function CartItem({
  id, numberOfItems, totalValue, paid, onDeleteCart, onGoToCart, onPayCart, index,
}: CartUI & ExtraProps) {
  let status = 'Unpaid';
  let color = 'red';
  if (paid) {
    status = 'Paid';
    color = 'green';
  }
  if (numberOfItems === 0) {
    status = 'Empty';
    color = 'gray';
  }

  return (
    <Flex
      direction="row"
      align="center"
      justify="between"
      maxHeight={isMobile ? '200px' : '80px'}
      style={{
        background: index % 2 === 0 ? 'ghostWhite' : 'whiteSmoke',
        border: '2px solid #c2c2c2',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '10px',
      }}
    >
      <Flex direction={isMobile ? 'column' : 'row'} align="center" style={{ flex: 1 }}>
        <p style={{ flex: 1, textAlign: 'left' }}>{`${numberOfItems} item${numberOfItems > 1 ? 's' : ''}`}</p>
        <p style={{ flex: 1, textAlign: 'center' }}>{`${totalValue} $`}</p>
        <Badge color={color as Color} variant="solid" size="2" radius="full">{status}</Badge>
      </Flex>
      <div style={{ width: isMobile ? '10px' : '500px' }} />
      <Flex direction={isMobile ? 'column' : 'row'} align="center" gap="8px">
        <Button className="button" color="green" onClick={() => onPayCart(id)} style={{ visibility: status === 'Unpaid' ? 'visible' : 'hidden' }}>
          <CheckIcon />
          Pay
        </Button>
        <Button className="button" color="purple" onClick={() => onGoToCart(id)} style={{ visibility: numberOfItems > 0 ? 'visible' : 'hidden' }}>
          <ArrowRightIcon />
          See Cart Items
        </Button>
        <AlertDialog
          trigger={(
            <Button color="red" style={{ fontFamily: 'Montserrat' }}>
              <TrashIcon />
              Delete
            </Button>
          )}
          title="Delete the cart"
          description="Are you sure? This cart will not be recoverable."
          onDeleteClick={() => onDeleteCart(id)}
        />
      </Flex>
    </Flex>
  );
}

export default CartItem;
