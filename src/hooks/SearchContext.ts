import React, { Dispatch, SetStateAction } from 'react';

type SearchContextType = {
  query: string | null;
  setQuery: Dispatch<SetStateAction<string | null>>;
};

const SearchContext = React.createContext<SearchContextType>({
  query: null,
  setQuery: () => { /* set auth response */ },
});

export default SearchContext;
