import { useEffect, useState } from 'react';
import styles from './add-purchase.module.scss';
import { AppButton, DateField, NumberField, TextArea, TextFieldInput, addPurchase, useAuthDispatch } from '@shop-portal/libs';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
/* eslint-disable-next-line */
export interface AddPurchaseProps {
  status:boolean,
  changeStatus?:any,
  data:any
}

export function AddPurchase(props: AddPurchaseProps) {
  const [open,setOpen]=useState(false)
  const todayDate = Date()
  const dispatch = useAuthDispatch()
  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = (body:any) =>{
    setOpen(false)
    props.changeStatus(body)
  }
  useEffect(() => {
    props.status && handleOpen()
    if(props.data.productCode){
      productForm.values.productCode = props.data.productCode
      productForm.values.productName = props.data.productName
      productForm.values.specification = props.data.specification
      productForm.values.productId = props.data.id
    //   productForm.setValues(
    //     {productCode:props.data.productCode,productName:props.data.productName,specification:props.data.specification,id:props.data.id})
     }
    else{
      productForm.resetForm()
    }
  },[props.status])
const productSchema = Yup.object({
  productCode:Yup.string().required(),
  productName:Yup.string().required(),
  specification:Yup.string().required()
})
  const productForm = useFormik({
    initialValues:{
      productCode:'',
      productName:'',
      specification:'',
      productId:'',
      quantity:null,
      buyingPrice:null,
      buyingDate:''//todayDate
    },
    validationSchema:productSchema,
    onSubmit(values){
      const {productCode,specification,productName,buyingDate, ...rest} =values
      const bDate = new Date(buyingDate)//this convert original captured date
      const buyingDateToDate = new Date(bDate.getTime() - (bDate.getTimezoneOffset() * 60000))
      const payloadData = {
        ...rest,
        buyingDate:buyingDateToDate.toISOString()
      }
      console.log("this is my payload",payloadData,buyingDateToDate)
      dispatch(addPurchase(payloadData)).then(()=>{
        handleClose(payloadData)
      })
     // if(productForm.errors !== undefined)
      
      
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
        //handleClose();
      },
    }}
  >
  <DialogTitle> New Purchase</DialogTitle>
  <DialogContent>
     <form className='mt-1' onSubmit={productForm.handleSubmit}>
     <input type="hidden" value={productForm.values.productId} name="productId"></input>
     <div className='row'>
      <div className='col-md-6 col-sm-12'>
      <TextFieldInput 
        name="productCode" 
        value={productForm.values.productCode}
        label='Product Code'
        errors={productForm.errors.productCode}
        handleChange={productForm.handleChange}
        handleBlur={productForm.handleBlur}
        disable={true}
        ></TextFieldInput>
      </div>
      <div className='col-md-6 col-sm-12'>
      <TextFieldInput 
        name="productName" 
        value={productForm.values.productName}
        label='Product Name'
        errors={productForm.errors.productName}
        handleChange={productForm.handleChange}
        handleBlur={productForm.handleBlur}
        disable={true}
        ></TextFieldInput>
      </div>
     </div>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
        <NumberField 
            name="quantity" 
            value={productForm.values.quantity}
            label='Quantity'
            errors={productForm.errors.quantity}
            handleChange={productForm.handleChange}
            handleBlur={productForm.handleBlur}
        />
        </div>
        <div className='col-md-6 col-sm-12'>
        <NumberField 
        name='buyingPrice' 
        label='Buying Price'
        value={productForm.values.buyingPrice}
        handleChange={productForm.handleChange}
         />
        </div>
        </div> 
        <div className='row'>
          <div className='col-12'>
            <DateField
            name='buyingDate'
            label='Purchasing Date'
            value={productForm.values.buyingDate}
            //errors={productForm.errors.buyingDate}
            handleChange={(date:Date)=>productForm.setFieldValue('buyingDate',date)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
          <TextArea
            name="specification" 
            value={productForm.values.specification}
            label='Specification/Description'
            disable={true}
            errors={productForm.errors.specification}
            handleChange={productForm.handleChange}
            handleBlur={productForm.handleBlur}
            row={4}
        ></TextArea>
          </div>
          </div> 
     </form>
  </DialogContent>
  <DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <AppButton handleClick={productForm.handleSubmit} status={false} name={'Save'}/>
  </DialogActions>
  </Dialog>
  );
}

export default AddPurchase;
