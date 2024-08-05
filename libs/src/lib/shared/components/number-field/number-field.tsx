import { NumericFormat, NumericFormatProps } from 'react-number-format';
import styles from './number-field.module.scss';
import React from 'react';
import { Alert, TextField } from '@mui/material';

/* eslint-disable-next-line */
export interface NumberFieldProps {
  name:string,
  label:string,
  type?:string,
  value:any,
  handleChange?:any,
  handleBlur?:any,
  errors?:string,
  id?:string,
  disable?:boolean,
  min?:number,
  max?:number,
}
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  prifix?:string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        //prefix={props.prifix}
      />
    );
  },
);
export function NumberField(props: NumberFieldProps) {
  const [values, setValues] = React.useState({
    numberformat: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <React.Fragment>
    <div className='form-group'>
    <TextField
        label={props.label}
        className='w-100 mb-1'
        size='small'
        variant="outlined" 
        value={props.value}//{values.numberformat}
        onChange={props.handleChange}
        name={props.name}
        onBlur={props.handleBlur}
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
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

export default NumberField;
