// Librairies
import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {

  let inputElement;
  const inputClasses = [];

  if (!props.valid && props.touched) {
    inputClasses.push(styles.invalid);
  }

  switch(props.type) {
    case('input'):
      inputElement = (
        <input 
          id={props.id}
          {...props.config}
          value={props.value} 
          onChange={props.changed} 
          className={inputClasses}
        />
      );
      break;

    case('textarea'):
        inputElement = (
          <textarea 
            id={props.id}
            value={props.value}
            onChange={props.changed} 
            className={inputClasses}
          ></textarea>
        );
        break;

    case('select'):
        inputElement = (
          <select 
            value={props.value} 
            onChange={props.changed} 
            id={props.id}
          >

            {props.config.options.map(option => (
              <option key={option.value} value={option.value}>

                {option.displayValue}

              </option>
            ))}

          </select>
        );
        break;

    default:
      inputElement = null;
  }

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {!props.valid && props.touched ? <span>{props.invalidMesssage}</span> : null}
    </div>
  );
};

export default Input;
