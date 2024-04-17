import { useEffect, useState } from 'react';
import styles from './shared-dialog.module.scss';
import { Dialog, DialogTitle } from '@mui/material';

/* eslint-disable-next-line */
export interface SharedDialogProps {}

export function SharedDialog({status=false,changeStatus=()=>{return null}}) {
  const [open,setOpen]=useState(false)
  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
    changeStatus()

  }
  useEffect(()=>{
    status && handleOpen()
  },[status])
  return (
    <Dialog
        open={open}
        fullWidth={true}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries((formData as any).entries());
            // console.log(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle> New User</DialogTitle>
      </Dialog>
  );
}

export default SharedDialog;
