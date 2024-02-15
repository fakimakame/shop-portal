import { Fragment } from 'react';
import styles from './text-field.module.scss';
import React from 'react';
import { Alert, TextField } from '@mui/material';
import ErrorIcon  from '@mui/icons-material/Error'

/* eslint-disable-next-line */
export interface TextFieldProps {
  name:string,
  label:string,
  type?:string,
  value?:string,
  handleChange?:any,
  handleBlur?:any,
  errors?:string,
  id?:string,
}

export function TextFieldInput(props:TextFieldProps) {

  return (
    <React.Fragment>
    <div className='form-group'>
    <TextField 
    id="outlined-basic" 
    className='w-100 mb-1'
    label={props.label} 
    variant="outlined" 
    name={props.name} 
    value={props.value}
    type={props.type}
    onChange={props.handleChange}
    onBlur={props.handleBlur}
    />
    </div>
    {
      props.errors &&
      <Alert className='mb-1' severity='error' 
      >{props.errors}</Alert>  
    }
 </React.Fragment>
//     <React.Fragment>
//     <div className='form-group'>
//       <label>{props.label}</label>
//       <input
//        type={props.type} 
//        name={props.name} 
//        value={props.value} 
//        className='form-control'
//        onChange={props.handleChange}
//        onBlur={props.handleBlur}
//        />
//     </div>
//     {props.errors &&
//     <div className='alert alert-danger'
// >{props.errors}</div>  
// }
// </React.Fragment>
);
}

export default TextField;
