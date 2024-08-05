import { useState } from 'react';
import styles from './input-select.module.scss';
import { Alert, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

/* eslint-disable-next-line */
export interface InputSelectProps {
  name:string,
  label:string,
  type?:string,
  value?:string,
  handleChange?:any,
  handleBlur?:any,
  errors?:string,
  id?:string,
  selectionValue?:any,
  valueLable?:any,
  selectOptionLabel?:any
}

export function InputSelect(props: InputSelectProps) {
  const [selectValue, setSelectValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    props.handleChange(event)
    setSelectValue(event.target.value);
  };
  return (
    <React.Fragment>
    <FormControl size="small" className='w-100 mb-1'>
      <InputLabel>{props.label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        value={selectValue}
        label={props.label}
        name={props.name}
        onChange={handleChange} 
        onBlur={props.handleBlur}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
          props.selectionValue.map((element:any) => (
            <MenuItem  value={element[props.valueLable]}>{element[props.selectOptionLabel]}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
    {
      props.errors &&
      <Alert style={{height:"35px",padding:"1px"}} className='mb-1' severity='error' 
      >{props.errors}</Alert>  
    }
    </React.Fragment>
  );
}

export default InputSelect;
