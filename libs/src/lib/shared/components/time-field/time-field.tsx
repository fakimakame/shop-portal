import styles from './time-field.module.scss';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Alert } from '@mui/material';
import dayjs from 'dayjs'; // import dayjs library for date manipulation
import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';
import { Padding } from '@mui/icons-material';
/* eslint-disable-next-line */
export interface TimeFieldProps {
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

const StyledTimePicker = styled(TimePicker)({
  
  '& .MuiInputBase-input': {
    padding: '8px', // Customize padding here
  },
  '& .MuiStack-root': {
    // backgroundColor: 'green', // Customize background color of the stack
    // display: "flex",
    //padding:0px,
  },
});

export function TimeField(props: TimeFieldProps) {
  return (
    <React.Fragment>
    <div className={`form-group ${styles.timeFormats}`}>
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <StyledTimePicker className={"mb-1 w-100"}
        label={props.label}
        name={props.name}
        value={dayjs(props.value)}
        onChange={props.handleChange}
        //onSelectedSectionsChange={props.handleBlur}
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

export default TimeField;
