import React, { ReactNode } from 'react';
import {
  AlertDialog as AlertDialogRadix,
  Button,
  Flex,
} from '@radix-ui/themes';

type Props = {
  trigger: ReactNode;
  title: string;
  onDeleteClick: () => void;
  description?: string;
};

function AlertDialog({
  trigger,
  title,
  onDeleteClick,
  description = '',
}: Readonly<Props>) {
  return (
    <AlertDialogRadix.Root>
      <AlertDialogRadix.Trigger>{trigger}</AlertDialogRadix.Trigger>
      <AlertDialogRadix.Content maxWidth="450px">
        <AlertDialogRadix.Title>{title}</AlertDialogRadix.Title>
        <AlertDialogRadix.Description size="2">
          {description}
        </AlertDialogRadix.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialogRadix.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialogRadix.Cancel>
          <AlertDialogRadix.Action>
            <Button variant="solid" color="red" onClick={onDeleteClick}>
              Delete
            </Button>
          </AlertDialogRadix.Action>
        </Flex>
      </AlertDialogRadix.Content>
    </AlertDialogRadix.Root>
  );
}

export default AlertDialog;
