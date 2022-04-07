// Library
import React from 'react';
// Own files
import styles from './SearchBar.module.css';
import loupe from '../../../../pictures/loupe.png';

const SearchBar = () => {
  return (
    <div className={styles.SearchBar}>
      <img src={loupe} alt='une icone de loupe' />
      <input type='text' placeholder='Rechercher...' />
    </div>
  );
};

export default SearchBar;
