import React from 'react';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { ArrowRightIcon, TrashIcon, CheckIcon } from '@radix-ui/react-icons';
import { isMobile } from 'react-device-detect';
import { CartUI } from './Carts';
import './CartItem.css';

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
  let color = 'Red';
  if (paid) {
    status = 'Paid';
    color = 'SeaGreen';
  }
  if (numberOfItems === 0) {
    status = 'Empty';
    color = 'Grey';
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
        <p style={{ flex: 1, textAlign: 'right', color: `${color}` }}>{status}</p>
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
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="red" style={{ fontFamily: 'Montserrat' }}>
              <TrashIcon />
              Delete
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Delete the cart</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure? This cart will not be recoverable.
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="red" onClick={() => onDeleteCart(id)}>
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>

          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
    </Flex>
  );
}

export default CartItem;
