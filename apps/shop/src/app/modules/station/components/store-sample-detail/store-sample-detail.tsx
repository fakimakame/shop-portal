import styles from './store-sample-detail.module.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//import { ProductSizeService } from '@shop-portal/apps/shop/src/app/services/product-size.service';
import { ProductSizeService } from 'apps/shop/src/app/services/product-size.service';
import { MainStoreService } from 'apps/shop/src/app/services/mainStore.service';
import { AppButton, formatNumber, useAuthSelector } from '@shop-portal/libs';
import { useDispatch } from 'react-redux';

/* eslint-disable-next-line */
export interface StoreSampleDetailProps {
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
export function StoreSampleDetail(props: StoreSampleDetailProps) {
  const dispatch = useDispatch()
  const availableQty = useAuthSelector(state=>state.sample.availableQuantity)
  const productSizeService = new ProductSizeService()
  const mainStoreService = new MainStoreService()
  const [open, setOpen] = useState(false)
  const [sizeData, setSizeData] = useState<sizeModel[]>([])
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState('');
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const [initialSizeData,setInitialSizeData] = useState<sizeModel[]>([])
  //this is for getting available samples quantity
  const [availableStock, setAvailableStock] = useState<sizeModel[]>([])
  useEffect(() => {
    console.log("quantity inside store detail ",availableQty)
    if (props.status) {
      getSize()
      setOpen(true)
    }

  }, [props.status])
  const update = async () => {
    setIsLoading(true)
    await productSizeService.addQuantitiesToStore(sizeData, props.existingData.proId, props.currentSample.id)
    //  dispatch(updateProductAfterAddedToSample(productData))
    setIsLoading(false)
    handleClose()
  }
  const handleText = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const availableStockData = availableStock.filter((element: sizeModel) => element.id === id)
    //console.log("this is my available stock ",availableStockData)
    let newValue = event.target.value;
    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      const value = parseInt(newValue)
      if (isNaN(value)) {
        newValue = '0'
      }
      //this is function for finding sum of quantity except current updated qty
      const getTotalQuantity = (id: number): number => {
        return sizeData.reduce((total: number, item: sizeModel) => {
          return item.id === id ? total + item.qty : total;
        }, 0);
      }
      //geting available quantity plus new value
      //const totalAfterAddingNewValue = getTotalQuantity(id) + parseInt(newValue)
      const totalAfterAddingNewValue = parseInt(newValue)
      // console.log("this is my total available quantity ",totalAfterAddingNewValue)
      //For geting size to be updated
      const sampleData = sizeData.find((size: sizeModel) => size.id === id)
      //initial data before updated
      const initialData = initialSizeData.find((size: sizeModel) => size.id === id)
      //For getting index up updated size
      const updatedQty = availableStockData[0].qty + (initialData?.qty || 0 )
      const index = sizeData.findIndex((element: sizeModel) => element.id === id)
      //const { qty, ...rest } = sampleData
      //console.log("this is my new sampledata ",sampleData[0])
      if (updatedQty < totalAfterAddingNewValue) {
       // newValue = qty?.toString()
        setMsg(`Exceed available stock of ${availableStockData[0].qty} `)
        setStatus(true)
      }
      else {
        setMsg('')
        setStatus(false)
        const updatedSizeData = [
          ...sizeData.slice(0, index),
          { ...sizeData[index], qty: parseInt(newValue) },
          ...sizeData.slice(index + 1),
        ];
        setSizeData(updatedSizeData)
          setValue(newValue)
        }
        
      }
     //updated payload
     
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
    //initial data before updated
    const initialData = initialSizeData.find((data: sizeModel) => data.id === id)
    //setStatus(false)
    const availableStockData = availableStock.filter((element: sizeModel) => element.id === id)

    //this is function for finding sum of quantity
    const getTotalQuantity = (id: number): number => {
      return sizeData.reduce((total: number, item: sizeModel) => {
        return item.id === id ? total + item.qty : total;
      }, 0);
    }
    //geting available quantity plus new value
    const totalAfterAddingNewValue = getTotalQuantity(id) + 1
    const index = sizeData.findIndex((element: sizeModel) => element.id === id)
    const updatedQty = availableStockData[0].qty + (initialData?.qty || 0 ) //nimefika hapa
   
    if (updatedQty < totalAfterAddingNewValue) {
      setMsg(`Exceed available stock of ${availableStockData[0].qty} `)
      setStatus(true)
    }
    else {
      //updated payload
      const updatedSizeData = [
        ...sizeData.slice(0, index),
        { ...sizeData[index], qty: sizeData[index].qty + 1 },
        ...sizeData.slice(index + 1),
      ];
      setSizeData(updatedSizeData)
      setMsg('')
      setStatus(false)
    }

    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = (id: number) => {
    const availableStockData = availableStock.filter((element: sizeModel) => element.id === id)
    
    const index = sizeData.findIndex((element: sizeModel) => element.id === id)
    
    if (sizeData[index].qty > 0) {
      const newUpdateSize = [
        ...sizeData.slice(0,index),
        { ...sizeData[index], qty: sizeData[index].qty - 1 },
        ...sizeData.slice(index + 1)
      ]
      setSizeData(newUpdateSize)
      setMsg('')
      setQuantity(prev => prev - 1);
      setStatus(false)

    }
    else {
      setStatus(true)
    }
  };
  const getSize = async () => {
    const data = await productSizeService.getStoreProductSize(props.existingData.proId, props.currentSample.id)
    setInitialSizeData(data)
    setSizeData(data)
    const product = await productSizeService.getProductSize(props.existingData.proId, props.currentSample.id)
    setAvailableStock(product)
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
                  <p className="tw-text-sm tw-font-semibold tw-leading-6 tw-text-gray-900">{ size.size_name }</p>
                  <p className="tw-mt-1 tw-truncate tw-text-xs tw-leading-5 tw-text-gray-500">Quantity {formatNumber(size.qty ? size.qty : 0)}</p>
                </div>
              </div>
              <div className="tw-flex tw-w-">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(size.id)}
                    className="tw-px-1 tw-py-1 bg-gray-300 tw-bg-blue-400 text-gray-700 tw-rounded-l-md focus:outline-none hover:bg-gray-400"
                    // disabled={quantity <= 1}
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

export default StoreSampleDetail;
