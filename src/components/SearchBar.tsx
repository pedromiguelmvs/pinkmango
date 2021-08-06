import React, { ChangeEventHandler } from 'react';

import '../styles/css/SearchBar.css';

interface SearchBarProps {
  onChange?: ChangeEventHandler;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <div className="searchbar-container">
      <input
        className="searchbar"
        placeholder="Pesquise por um nome..."
        type="text"
        onChange={props.onChange}
      />
      <button
        type="button"
        className="search-button"
      >
        <img
          src="https://i.imgur.com/oAbwPFv.png" alt="search"
        />
      </button>
    </div>
  );
}

export default SearchBar;