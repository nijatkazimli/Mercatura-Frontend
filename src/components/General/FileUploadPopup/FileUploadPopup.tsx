import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React, { ReactNode, useState } from 'react';

type Props = {
  trigger: ReactNode;
  title: string;
  description?: string;
  multiple?: boolean;
  onUpload: (files: File[]) => Promise<void>;
};

function FileUploadPopup({
  trigger,
  title,
  description,
  multiple = true,
  onUpload,
}: Readonly<Props>) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUploadClick = async () => {
    if (selectedFiles.length > 0) {
      await onUpload(selectedFiles);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {description ?? ''}
        </AlertDialog.Description>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginTop: '16px' }}
          multiple={multiple}
        />
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="purple"
              onClick={handleUploadClick}
              disabled={selectedFiles.length === 0}
            >
              Upload
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default FileUploadPopup;
