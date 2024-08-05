import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styles from './add-sample.module.scss';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { addSample, AppButton, InputFile, useAuthDispatch, useAuthSelector } from '@shop-portal/libs';

/* eslint-disable-next-line */
export interface AddSampleProps {
  changeStatus?:any,
  status?:boolean,
  existingData?:any
}

export function AddSample(props: AddSampleProps) {
  const sampleSelector = useAuthSelector(state => state.sample)
  const dispatch = useAuthDispatch()
  const [open,setOpen] = useState(false)
  const [file,setFile] = useState(null)
  const [disableStatus,setDisableStatus] = useState(true)
  const handleClose = () =>{
    setOpen(false)
    setFile(null)
    setDisableStatus(true)
    props.changeStatus()
  }
  const uploadFile = (e:any) =>{
    if(e){
    setFile(e)
    setDisableStatus(false)
    }
    else{
      setDisableStatus(true)
    }
  }
  useEffect(() =>{
    props.status &&
    setOpen(true)
  },[props.status])
  const sampleForm = useFormik({
    initialValues:{
      productId:'',
      file:''
    },
    onSubmit(values){
      if(file){
      const uploadedImage:any = file
      const formData:FormData = new FormData()
      formData.append("productId",props.existingData.id)
      formData.append("file",new Blob([uploadedImage], { type: uploadedImage.type }), uploadedImage.name)
      dispatch(addSample(formData))
      handleClose()
      }
    }
})

  return (
    <Dialog
    open={open}
    fullWidth={true}
    onClose={handleClose}
    PaperProps={{
      component: 'form',
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleClose();
      },
    }}
  >
    <DialogTitle>
      <div className='row'>
        <div className='col-md-8 col-sm-12'>
            Add Sample
        </div>
      </div>
      
      </DialogTitle>
  <DialogContent>
    <form onSubmit={sampleForm.handleSubmit}>
    <div className='row'>
          <div className='col-md-12 col-sm-12'>
            <InputFile name = "file"
            //value = {productForm.values.file}
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            handleChange ={(e:any) => {sampleForm.handleChange,uploadFile(e)}}
            />
          </div>
        </div>
    </form>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <AppButton handleClick={sampleForm.handleSubmit} disabledStatus={disableStatus}  status={sampleSelector.isLoading} name={'Save'}/>
  </DialogActions>
    </Dialog>
  );
}

export default AddSample;
