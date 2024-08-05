import styles from './product-sample.module.scss';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material';
import { AppButton, ProductImageSample, useAuthDispatch, useAuthSelector, viewSample, ActionButton } from '@shop-portal/libs';
import { useEffect, useState } from 'react';
import { sample } from 'rxjs';
import CloseIcon from '@mui/icons-material/Close';
import AddSample from '../add-sample/add-sample';
/* eslint-disable-next-line */
export interface ProductSampleProps {
  status: boolean,
  changeStatus?: any,
  data: any
}

export function ProductSample(props: ProductSampleProps) {
  const sampleSelector = useAuthSelector(state => state.sample)
  const dispatch = useAuthDispatch()
  const [open, setOpen] = useState(false)
  const [sample, setSample] = useState([])
  const [openDialogStatus, setOpenDialogStatus] = useState(false)
  const [alreadyDispatched, setAlreadyDispatched] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  }
  const closeAddSampleDialog = () =>{
    setOpenDialogStatus(false)
  }
  const handleClose = () => {
    setOpen(false)
    setOpenDialogStatus(false)
    props.changeStatus()
  }
  const openDialog = () => {
    console.log("this function is working fine ",openDialogStatus)
    setOpenDialogStatus(true)
  }
  useEffect(() => {
    if (props.status) {
      const availableSample = sampleSelector.sample.filter((item: any) => item.productId === props.data.id)
      
      handleOpen()
      if (availableSample.length === 0 && !alreadyDispatched) {
        dispatch(viewSample(props.data.id))
        setAlreadyDispatched(true)
      }
      setSample(availableSample)

    }
    else {
      return () => {
        // Component unmount logic
        setAlreadyDispatched(false)
      }
    }
  }, [props.status, props.data.id, sampleSelector.sample, alreadyDispatched])
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        fullWidth={true}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            //handleClose();
          },
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              
            </Typography>
            <Button autoFocus color="inherit" onClick={openDialog}>
            Add Sample
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <div className="p-2">Sample and Size for &nbsp; <span className='tw-text-red-400'>{` product: ${props.data.productName} code: ${props.data.productCode}`}</span></div>
            {/* <div className="p-2"><AppButton handleClick={openDialog} status={false} name='Add Sample' />
            </div> */}
          </div>
              <hr/>
        </DialogTitle>
        <DialogContent>
          {/* <table className='table table-bordered'>
            <tr>
              <th>Product name</th>
              <td>{props.data.productName}</td>
              <th>Product Code</th>
              <td>{props.data.productCode}</td>
            </tr>
          </table> */}
          {
            sample.length > 0 &&
            <div className="tw-grid tw-grid-cols-1 tw-gap-x-6 tw-gap-y-10 sm:tw-grid-cols-2 lg:tw-grid-cols-6 xl:tw-grid-cols-6 xl:tw-gap-x-6">
              {
                sample.map((element: any) => (
                  <ProductImageSample id={element.id} img={`data:image/jpeg;base64,${element.image}`} />
                ))
              }
            </div>
          }
        </DialogContent>
        {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <AppButton handleClick={productForm.handleSubmit} status={false} name={'Save'} />
      </DialogActions> */}
      </Dialog >
      <AddSample changeStatus={closeAddSampleDialog} status={openDialogStatus} existingData ={props.data} />
    </>
  );
}

export default ProductSample;
