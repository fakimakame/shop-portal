import { Checkbox, FormControlLabel } from '@mui/material';
import styles from './input-check-box.module.scss';

/* eslint-disable-next-line */
export interface InputCheckBoxProps {
  name:string,
  label:string,
  value:any,
  handleChange:any
}

export function InputCheckBox(props: InputCheckBoxProps) {
  return (
    <FormControlLabel onChange={() => props.handleChange(props.value)} value={props.value} name={props.name} control={<Checkbox />} label={props.label} />
  );
}

export default InputCheckBox;
