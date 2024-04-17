import React from 'react';
import styles from './text-area.module.scss';
import { Alert, TextField } from '@mui/material';

/* eslint-disable-next-line */
export interface TextAreaProps {
  name:string,
  label:string,
  type?:string,
  value?:string,
  handleChange?:any,
  handleBlur?:any,
  errors?:string,
  id?:string,
  row?:number,
  disable?:boolean
}

export function TextArea(props: TextAreaProps) {
  return(
  <React.Fragment>
    <div className='form-group'>
    <TextField 
    className='w-100 mb-1'
    id="outlined-multiline-flexible"
    label={props.label} 
    variant="outlined" 
    name={props.name} 
    value={props.value}
    type={props.type}
    onChange={props.handleChange}
    multiline
    disabled={props.disable ? props.disable : false}
    rows={props.row}
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

export default TextArea;
