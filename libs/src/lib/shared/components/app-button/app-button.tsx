
import * as React from 'react';
import { Component } from 'react';
import { Button } from '@mui/material';
/* eslint-disable-next-line */
export interface AppButtonProps {
  class:string,
  name:string,
  styles?:any
}

export class AppButton extends Component <AppButtonProps> {

  render(){
  return (
    <Button type='submit' className='mt-1' style={this.props.styles} variant='contained' color="primary">{this.props.name}</Button>
   
  );
  }
}

export default AppButton;
