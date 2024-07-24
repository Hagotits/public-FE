import React from "react";

const SearchInput = ({ onSearch, searchTerm }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={onSearch}
        value={searchTerm}
      />
    </div>
  );
};

export default SearchInput;
