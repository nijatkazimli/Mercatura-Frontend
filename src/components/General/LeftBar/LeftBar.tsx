import React from 'react';
import { Flex } from '@radix-ui/themes';
import SearchBar from '../SearchBar';
import './LeftBar.css';

function LeftBar() {
  const search = (term: string, dropdownValue?: string) => {
    // eslint-disable-next-line no-console
    console.log(term + dropdownValue);
  };
  return (
    <Flex className="leftBar" direction="column" align="center" gap="8" style={{ padding: '20px' }}>
      <SearchBar onSearch={search} width="auto" />
    </Flex>
  );
}

export default LeftBar;
