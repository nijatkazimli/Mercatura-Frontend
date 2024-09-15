import React, { useEffect, useState } from 'react';
import { Select } from '@radix-ui/themes';
import Images from '../../../constants/Images';
import styles from './SearchBar.style';
import './SearchBar.css';

type Props = {
  placeholder?: string,
  height?: number,
  width?: number | 'auto',
  onSearch: (searchTerm?: string, dropDownValue?: string) => void,
  dropDownValue?: string,
  dropDownPlaceholder?: string,
  dropDownItemValues?: string[],
};

function SearchBar({
  placeholder = 'Search',
  height = 30, width = 200,
  onSearch,
  dropDownValue,
  dropDownPlaceholder = 'Select',
  dropDownItemValues,
}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dropdownValue, setDropdownValue] = useState<string | undefined>(dropDownValue);

  useEffect(() => {
    if (dropDownValue) {
      setDropdownValue(dropDownValue);
    }
  }, [dropDownValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const capitalizedTerm = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setSearchTerm(capitalizedTerm);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm, dropdownValue);
  };

  return (
    <form style={styles.form(height, width)} onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={`${placeholder}...`}
        className="search-bar"
      />
      {dropDownItemValues && (
        <Select.Root value={dropdownValue} onValueChange={setDropdownValue}>
          <Select.Trigger placeholder={dropDownPlaceholder} radius="none" className="dropdown-trigger" />
          <Select.Content color="purple">
            <Select.Group>
              {dropDownItemValues.map((value) => (
                <Select.Item key={value} value={value}>{value}</Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      <button className="search-button">
        <img src={Images.search.src} alt={Images.search.alt} className="search-icon" />
      </button>
    </form>
  );
}

export default SearchBar;
