import styles from './store-sample.module.scss';

/* eslint-disable jsx-a11y/anchor-is-valid */
import { AppBar, Button, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material';
import { ProductImageSample, useAuthDispatch, useAuthSelector, viewSample } from '@shop-portal/libs';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddSample from '../add-sample/add-sample';
import SampleDetail from '../sample-detail/sample-detail';
import StoreSampleDetail from '../store-sample-detail/store-sample-detail';
import SaleSampleDetail from '../sale-sample-detail/sale-sample-detail';
/* eslint-disable-next-line */
export interface StoreSampleProps {
  status: boolean,
  changeStatus?: any,
  data: any,
  isForSale?:boolean
}

export function StoreSample(props: StoreSampleProps) {
  const sampleSelector = useAuthSelector(state => state.sample)
  const dispatch = useAuthDispatch()
  const [open, setOpen] = useState(false)
  const [sample, setSample] = useState([])
  const [openDialogStatus, setOpenDialogStatus] = useState(false)
  const [alreadyDispatched, setAlreadyDispatched] = useState(false);
  const [openDetailDialogStatus, setOpenDetailDialogStatus] = useState(false)
  const [currentSample, setCurrentSample] = useState("")
  const handleOpen = () => {
    setOpen(true)
  }
  const closeAddSampleDialog = () => {
    setOpenDialogStatus(false)
  }
  const closeDetailSampleDialog = () => {
    setOpenDetailDialogStatus(false)
    setCurrentSample("")
  }
  const handleClose = () => {
    setOpen(false)
    setOpenDialogStatus(false)
    setOpenDetailDialogStatus(false)
    setCurrentSample("")
    props.changeStatus()
  }
  const openDialog = () => {
    setOpenDialogStatus(true)
  }
  const openDetailDialog = (data: any) => {
    setOpenDetailDialogStatus(true)
    setCurrentSample(data)
  }
  useEffect(() => {
    if (props.status) {
      const availableSample = sampleSelector.sample.filter((item: any) => item.productId === props.data.proId)

      handleOpen()
      if (availableSample.length === 0 && !alreadyDispatched) {
        dispatch(viewSample(props.data.proId))
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
            {/* <Button autoFocus color="inherit" onClick={openDialog}>
              Add Sample
            </Button> */}
          </Toolbar>
        </AppBar>
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <div className="p-2">Sample and Size for &nbsp; <span className='tw-text-red-400'>{` product: ${props.data.productName} code: ${props.data.productCode}`}</span></div>
            {/* <div className="p-2"><AppButton handleClick={openDialog} status={false} name='Add Sample' />
            </div> */}
          </div>
          <hr />
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
                sample.map((element: { id: number, image: string }) => (
                  <a style={{ cursor: "pointer" }} onClick={() => openDetailDialog(element)}><ProductImageSample id={element.id} img={`data:image/jpeg;base64,${element.image}`} /></a>
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
      {
        props.isForSale ? (
         <SaleSampleDetail currentSample={currentSample} changeStatus={closeDetailSampleDialog} status={openDetailDialogStatus} existingData={props.data}  />
        )
        :
        (
          <>
          <AddSample changeStatus={closeAddSampleDialog} status={openDialogStatus} existingData={props.data} />
          <StoreSampleDetail currentSample={currentSample} changeStatus={closeDetailSampleDialog} status={openDetailDialogStatus} existingData={props.data} />
          </>
        )
    }
    </>
  );
}

export default StoreSample;

