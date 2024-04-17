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
  disable?:boolean
}

export function TextFieldInput(props:TextFieldProps) {

  return (
    <React.Fragment>
    <div className='form-group'>
    <TextField 
    className='w-100 mb-1'
    label={props.label} 
    variant="outlined" 
    name={props.name} 
    value={props.value}
    type={props.type}
    onChange={props.handleChange}
    onBlur={props.handleBlur}
    disabled={props.disable ? props.disable : false}
    size='small'
    />
    </div>
    {
      props.errors &&
      <Alert style={{height:"35px",padding:"1px"}} className='mb-1' severity='error' 
      >{props.errors}</Alert>  
    }
 </React.Fragment>
);
}

export default TextField;
