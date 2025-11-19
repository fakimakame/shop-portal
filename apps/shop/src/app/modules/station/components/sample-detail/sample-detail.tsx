import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styles from './sample-detail.module.scss';
import { updateProductAfterAddedToSample } from "@shop-portal/libs"
import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//import { ProductSizeService } from '@shop-portal/apps/shop/src/app/services/product-size.service';
import { ProductSizeService } from 'apps/shop/src/app/services/product-size.service';
import { AppButton, formatNumber } from '@shop-portal/libs';
import { useDispatch } from 'react-redux';

/* eslint-disable-next-line */
export interface SampleDetailProps {
  changeStatus?: any,
  status?: boolean,
  existingData?: any,
  currentSample?: any
}
interface sizeModel {
  id: number,
  size_name: string,
  qty: number
}
const initialValue: any = []
export function SampleDetail(props: SampleDetailProps) {
  const dispatch = useDispatch()
  const productSizeService = new ProductSizeService()
  const [open, setOpen] = useState(false)
  const [sizeData, setSizeData] = useState<sizeModel[]>([])
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState('');
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(false)
  useEffect(() => {
    console.log("this is current sample data", props.currentSample)
    if (props.status) {
      getSize()
      setOpen(true)
    }
  }, [props.status])
  const update = async () => {
    setIsLoading(true)
    const productData = await productSizeService.addQuantities(sizeData, props.existingData.id, props.currentSample.id)
    dispatch(updateProductAfterAddedToSample(productData))
    setIsLoading(false)
    handleClose()
  }
  const handleText = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    let newValue = event.target.value;
    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      const value = parseInt(newValue)
      if (isNaN(value)) {
        newValue = '0'
      }
      //this is function for finding sum of quantity except current updated qty
      const getTotalQuantity = (): number => {
        return sizeData.filter((element: sizeModel) => element.id !== id).reduce((total: number, item: sizeModel) => total + item.qty, 0)
      }
      //geting available quantity plus new value
      const totalAfterAddingNewValue = getTotalQuantity() + parseInt(newValue)
      //For geting size to be updated
      //const sampleData = sizeData.filter((size: sizeModel) => size.id === id)
      //For getting index up updated size
      const index = sizeData.findIndex((element: sizeModel) => element.id === id)
      //const { qty, ...rest } = sampleData[0]
      if (props.existingData.quantity < totalAfterAddingNewValue) {
        //newValue = sizeData[index].qty.toString()
        setMsg(`Exceed available stock of ${props.existingData.quantity} `)
        setStatus(true)
      }
      else {
        setMsg('')
        setStatus(false)
      }
      //updated payload
      const newUpdatedSize = [
        ...sizeData.slice(0, index),
        { ...sizeData[index], qty: parseInt(newValue) },
        ...sizeData.slice(index + 1)
      ]
      setSizeData(newUpdatedSize);
      // const newUpdatedSize: sizeModel = {
      //   ...rest,
      //   qty: parseInt(newValue)
      // }
      // sizeData.splice(index, 1)
      // sizeData.splice(index, 0, newUpdatedSize)
      setValue(newValue)
    }
  };
  const handleClose = () => {
    setOpen(false)
    setSizeData(initialValue)
    setValue('')
    setMsg('')
    setIsLoading(false)
    props.changeStatus()
  }

  const increaseQuantity = (id: number) => {
    //this is function for finding sum of quantity
    const getTotalQuantity = (): number => {
      return sizeData.reduce((total: number, item: sizeModel) => total + item.qty, 0)
    }
    //geting available quantity plus new value
    const totalAfterAddingNewValue = getTotalQuantity() + 1
    //For geting size to be updated
    //const sampleData = sizeData.filter((size: sizeModel) => size.id === id)
    //For getting index up updated size
    const index = sizeData.findIndex((element: sizeModel) => element.id === id)
    // const { qty, ...rest } = sampleData[0]
    if (props.existingData.quantity < totalAfterAddingNewValue) {
      setMsg(`Exceed available stock of ${props.existingData.quantity} `)
      setStatus(true)
    }
    else {
      //updated payload
      const newUpdatedSize = [
        ...sizeData.slice(0, index),
        { ...sizeData[index], qty: sizeData[index].qty + 1 },
        ...sizeData.slice(index + 1)
      ]
      setSizeData(newUpdatedSize);
      // const newUpdatedSize: sizeModel = {
      //   ...rest,
      //   qty: qty + 1
      // }
      // sizeData.splice(index, 1)
      // sizeData.splice(index, 0, newUpdatedSize)
      //setValue()
      setMsg('')
      setStatus(false)
    }

    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = (id: number) => {
    //For geting size to be updated
    //const sampleData = sizeData.filter((size: sizeModel) => size.id === id)
    //For getting index up updated size
    const index = sizeData.findIndex((element: sizeModel) => element.id === id)
    // const { qty, ...rest } = sampleData[0]
    if (sizeData[index].qty > 0) {
      // const newUpdatedSize: sizeModel = {
      //   ...rest,
      //   qty: qty - 1
      // }
      // sizeData.splice(index, 1)
      // sizeData.splice(index, 0, newUpdatedSize)
      const newUpdatedSize = [
        ...sizeData.slice(0, index),
        { ...sizeData[index], qty: sizeData[index].qty - 1 },
        ...sizeData.slice(index + 1)
      ]
      setSizeData(newUpdatedSize);
      //setValue()
      setMsg('')
      setQuantity(prev => prev - 1);
      setStatus(false)

    }
    else {
      setStatus(true)
    }
  };
  const getSize = async () => {
    const data = await productSizeService.getProductSize(props.existingData.id, props.currentSample.id)
    setSizeData(data)
  }

  return (
    <Dialog
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
      <DialogTitle>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            Sample Details
          </div>
          <div className='col-md-6 col-sm-12 tw-text-sm tw-text-red-300 '>
            {msg}
          </div>
        </div>

      </DialogTitle>
      <DialogContent>
        <ul role="list" className="divide-y divide-gray-100">
          {sizeData.map((size: sizeModel) => (
            <li key={size.id} className="tw-flex tw-justify-between tw-gap-x-3 py-2">
              <div className="tw-flex tw-min-w-0 tw-gap-x-4">
                {/* <img alt="" src={person.imageUrl} className="tw-h-12 tw-w-12 tw-flex-none tw-rounded-full tw-bg-gray-50" /> */}
                <div className="tw-min-w-0 tw-flex-auto">
                  <p className="tw-text-sm tw-font-semibold tw-leading-6 tw-text-gray-900">{size.size_name}</p>
                  <p className="tw-mt-1 tw-truncate tw-text-xs tw-leading-5 tw-text-gray-500">Quantity {formatNumber(size.qty ? size.qty : 0)}</p>
                </div>
              </div>
              <div className="tw-flex tw-w-">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(size.id)}
                    className="tw-px-1 tw-py-1 bg-gray-300 tw-bg-blue-400 text-gray-700 tw-rounded-l-md focus:outline-none hover:bg-gray-400"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={size.qty ? size.qty : 0}
                    onChange={(event) => handleText(event, size.id)}
                    autoComplete="given-name"
                    className="tw-text-center tw-w-12  tw-border-0 tw-px-1 tw-py-1 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
                  />
                  <button
                    onClick={() => increaseQuantity(size.id)}
                    className="px-1 py-1 bg-gray-300 tw-bg-blue-400 text-gray-700 tw-rounded-r-md focus:outline-none hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* <div className="tw-relative">
                <svg data-testid="AddCircleIcon"></svg>
              </div> */}
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <AppButton handleClick={update} disabledStatus={status} status={isLoading} name={'Update'} />
      </DialogActions>
    </Dialog>
  );
}

export default SampleDetail;
