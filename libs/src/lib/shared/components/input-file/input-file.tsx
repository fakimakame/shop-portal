import styled from '@emotion/styled';
import styles from './input-file.module.scss';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import React from 'react';
/* eslint-disable-next-line */
export interface InputFileProps {
  name:string,
  value?:string,
  handleChange?:any,
  errors?:string,
}
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'noswrap',
  width: 1,
});
export function InputFile(props: InputFileProps) {
  const [fileName,setFileName] = useState('');
  const [filePath,setFilePath] = useState('No file selected')
  const handleChange = ()=>{
    const path = document.getElementById('myFile') as HTMLInputElement
    if(path.files && path.files.length >0)
      {
        const file = path.files[0]
        setFileName(file.name)
        props.handleChange(file)
      }
      else {
        setFileName("")
        props.handleChange(null)
      }
      
  }
  return (
    <React.Fragment>
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onChange={() => handleChange()}
      //id="btn"
    >
      Upload file
      <VisuallyHiddenInput readOnly name = {props.name} id='myFile' type="file" />
    </Button>
    <label className='m-2'>{fileName}</label>
    </React.Fragment>
  );
}

export default InputFile;
