import { Fragment } from 'react';
import styles from './text-field.module.scss';
import React from 'react';

/* eslint-disable-next-line */
export interface TextFieldProps {
  name:string,
  label:string,
  type?:string,
  value?:string,
  handleChange?:any,
  handleBlur?:any,
  errors?:string
}

export function TextField(props:TextFieldProps) {

  return (
    <React.Fragment>
    <div className='form-group'>
      <label>{props.label}</label>
      <input
       type={props.type} 
       name={props.name} 
       value={props.value} 
       className='form-control'
       onChange={props.handleChange}
       onBlur={props.handleBlur}
       />
    </div>
    {props.errors &&
    <div className='alert alert-danger'
>{props.errors}</div>  
}
</React.Fragment>
);
}

export default TextField;
