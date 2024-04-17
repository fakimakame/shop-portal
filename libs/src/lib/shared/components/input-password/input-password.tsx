import React from 'react';
import styles from './input-password.module.scss';
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/* eslint-disable-next-line */
export interface InputPasswordProps {
  name:string,
  label:string,
  type?:string,
  value?:string,
  handleChange?:any,
  handleBlur?:any,
  errors?:string,
  id?:string,
}

export function InputPassword(props: InputPasswordProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <React.Fragment>
    <FormControl size='small' className='w-100 mb-1' variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            name={props.name}
            
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {
          props.errors &&
          <Alert style={{height:"35px",padding:"1px"}} className='mb-1' severity='error' 
          >{props.errors}</Alert>  
        }
        </React.Fragment>
  );
}

export default InputPassword;
