import React, { useEffect, useState } from 'react';
import { Select } from '@radix-ui/themes';
import Images from '../../../constants/Images';
import styles from './SearchBar.style';
import './SearchBar.css';

type Props = {
  placeholder?: string,
  term?: string,
  height?: number,
  width?: number | 'auto',
  onSearch: (searchTerm?: string, dropDownValue?: string) => void,
  dropDownValue?: string,
  dropDownPlaceholder?: string,
  dropDownItemValues?: string[],
  capitalizeFirstLetter?: boolean,
};

function SearchBar({
  placeholder = 'Search',
  term,
  height = 30, width = 200,
  onSearch,
  dropDownValue,
  dropDownPlaceholder = 'Select',
  dropDownItemValues,
  capitalizeFirstLetter = false,
}: Readonly<Props>) {
  const [searchTerm, setSearchTerm] = useState<string>(term ?? '');
  const [dropdownValue, setDropdownValue] = useState<string | undefined>(dropDownValue ?? dropDownItemValues?.at(0));

  useEffect(() => {
    if (dropDownValue) {
      setDropdownValue(dropDownValue);
    }
  }, [dropDownValue]);

  useEffect(() => {
    if (!dropDownValue) {
      setDropdownValue(dropDownItemValues?.at(0));
    }
  }, [dropDownItemValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const term = capitalizeFirstLetter ? inputValue.charAt(0).toUpperCase() + inputValue.slice(1) : inputValue;
    setSearchTerm(term);
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
              {dropDownItemValues.map((value, index) => (
                <React.Fragment key={value}>
                  <Select.Item value={value}>{value}</Select.Item>
                  {index === 0 && <Select.Separator />}
                </React.Fragment>
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
