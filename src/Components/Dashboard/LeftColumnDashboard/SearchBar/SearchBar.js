// Library
import React, { useState } from 'react';
// Own files
import styles from './SearchBar.module.css';
import loupe from '../../../../pictures/loupe.png';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.SearchBar}>
      <img src={loupe} alt='une icone de loupe' value={searchValue} onChange={handleSearchChange} />
      <input type='text' placeholder='Rechercher...' />
    </div>
  );
};

export default SearchBar;
