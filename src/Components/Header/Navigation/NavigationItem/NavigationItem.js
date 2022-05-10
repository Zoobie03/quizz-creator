// Librairies
import React from 'react';
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <li className={styles.NavigationItem}>
      <NavLink
        end={props.end}
        to={props.to}
        style={({ isActive }) => ({
          background: isActive ? 'white' : '',
          color: isActive ? '#9603fea1' : '',
          border: isActive ? '2px solid #3867ed' : '',
        })}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
