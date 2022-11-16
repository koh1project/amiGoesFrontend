import { Input } from 'native-base';
import React from 'react';

type SearchKeywordFormProps = {
  searchKeyword: string;
  handleSearchChange: (event) => void;
};

export const SearchKeywordForm: React.FC<SearchKeywordFormProps> = ({
  searchKeyword,
  handleSearchChange,
}) => {
  return (
    <Input
      placeholder="Search"
      onChange={handleSearchChange}
      value={searchKeyword}
    ></Input>
  );
};
