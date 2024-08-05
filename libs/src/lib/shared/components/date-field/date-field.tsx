import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import styles from './date-field.module.scss';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Alert } from '@mui/material';
import dayjs from 'dayjs'; // import dayjs library for date manipulation
import React from 'react';
/* eslint-disable-next-line */
export interface DateFieldProps {
  name:string,
  label:string,
  type?:string,
  value:any,
  handleChange?:any,
  handleBlur?:any,
  errors?:string,
  id?:string,
  disable?:boolean,
}

export function DateField(props: DateFieldProps) {
  const date =new Date('2024-04-30')
  return (
    <React.Fragment>
    <div className='form-group'>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker className='mb-1 w-100' 
        label={props.label}
        name={props.name}
        value={dayjs(props.value)}
        onChange={props.handleChange}
         />
      </DemoContainer>
    </LocalizationProvider>
    </div>
    {
      props.errors &&
      <Alert style={{height:"35px",padding:"1px"}} className='mb-1' severity='error' 
      >{props.errors}</Alert>  
    }
 </React.Fragment>
  );
}

export default DateField;
