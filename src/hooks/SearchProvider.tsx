/* eslint-disable react/function-component-definition */
import React, {
  useState, ReactNode, useMemo,
  useEffect,
} from 'react';
import SearchContext from './SearchContext';

interface SearchProviderProps {
    children?: ReactNode;
}

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string | null>(null);
  const value = useMemo(() => ({ query, setQuery }), [query, setQuery]);

  useEffect(() => {
    // console.log(query);
  }, [query]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
