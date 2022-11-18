import { Input } from 'native-base';
import React from 'react';
import i18n from '../../../localization/Localization';

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
      placeholder={i18n.t('Discover.search')}
      onChange={handleSearchChange}
      value={searchKeyword}
      style={{
        backgroundColor: 'white',
      }}
    ></Input>
  );
};
