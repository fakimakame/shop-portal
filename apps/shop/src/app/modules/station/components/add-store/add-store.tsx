import { useEffect, useState } from 'react';
import styles from './add-store.module.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { AppButton, NumberField, TextArea, TextFieldInput, Toast, addToStore, findProductByCode, getAvailableQuantity, useAuthDispatch, useAuthSelector,addStoreToStation, updatePrice } from '@shop-portal/libs';
/* eslint-disable-next-line */
export interface AddStoreProps {
  status:boolean,
  changeStatus?:any,
  data:any
  extraData?:any
  isPrice?:boolean
}

export function AddStore(props: AddStoreProps) {
  const [open,setOpen]=useState(false)
  const product = useAuthSelector(state => state.product.product);
  const dispatch = useAuthDispatch()
  const [isLoading,setIsLoading] = useState(false)
  const [isDisable,setIsDisable] = useState(false)
  const [searchingCode,setSearchingCode]= useState('')
  const [availableQty,setAvailableQty]= useState(0)
  const handleOpen = () =>{
    if(props.extraData !== null || undefined){
      setProductForm(props.extraData)
      setIsDisable(true)
     checkAvailableStock(props.extraData.proId)
      //productForm.values.productCode.
    }
    setOpen(true)
  }
   const checkAvailableStock = async (id:number)=>{
    //const availableStock = await  dispatch(getAvailableQuantity(id))
     dispatch(getAvailableQuantity(id)).then((res:any)=>{
      if(res.payload.quantity){
      setAvailableQty(res.payload.quantity);
      }

     })
     //console.log("this is my available stock ",availableQty)
  }
  const handleClose = () =>{
    setOpen(false)
    setIsDisable(false)
    setAvailableQty(0)
    props.changeStatus()
    productForm.resetForm()
  }
  useEffect(()=>{
    props.status && handleOpen()

    if(isLoading){
           const p = product.find((element:any) => element.productCode === searchingCode) //findProductByCode(searchingCode)
           if(p){
           setProductForm(p)
           }
           setIsLoading(false)
    }

  },[props.status,isLoading])
  const productSchema = Yup.object({
    productCode:Yup.string().required(),
  })
    const productForm = useFormik({
      initialValues:{
        productCode:'',
        productName:'',
        specification:'',
        id:'',
        quantity:0,
        price:0
      },
      validationSchema:productSchema,
      onSubmit(values){
        
        if(isDisable && !props.isPrice){//this is for adding item from main store to station store
          const payload = {
            id:props.extraData.id,
            productId:props.extraData.proId,
            quantity:values.quantity,
            stationId:props.data,
          }
          if(productForm.values.quantity !== 0){
            
          dispatch(addStoreToStation(payload))
          }
          else{
            Toast("Quantity must be greater then 0","warning")
          }
        }
        else if(props.isPrice){ //this is for setting selling price
          if(productForm.values.price !== 0){
            const payload = {
              id:props.extraData.id,
              productId:props.extraData.proId,
              quantity:0,
              stationId:props.data,
              price:productForm.values.price
            }
          dispatch(updatePrice(payload))
          }
          else{
            Toast("Price must be greater then 0","warning")
          }
        }
        else{// this is condition for initiate new product to store
          const payload = {
            productId:values.id,
            stationId:props.data,
            price:0,
            availableQuantity:0,
          }
        dispatch(addToStore(payload))
        }
      }
    })
   const customHandleBlur = async(code:string) =>{
    if(code){
    setSearchingCode(code)
      const p = findProduct(code)
      if(p){
      setProductForm(p)
      }
      else{
        await dispatch(findProductByCode(code))
        setSearchingCode(code)
        setIsLoading(true)
        // i didn't update here because async function can't retrieve and update data inside same function
     // }
    }
  }
  }
    const findProduct = (code:any) =>{
      return product.find((element:any) => element.productCode === code)
    }
    // const fetchProductByCode = async (code:any) =>{
    //   setIsLoading(true)
    //   await dispatch(onViewProduct())
    //   setIsLoading(false)

    //}
    const setProductForm = (pro:any) =>{
      productForm.setValues({productCode:pro.productCode,productName:pro.productName,specification:pro.specification,id:pro.id,quantity:0,price:pro.price})
    }
    const checkLimit =()=>{
      const inputedQuantity = productForm.values.quantity
      if(inputedQuantity > availableQty){
        productForm.setFieldValue("quantity",0)
        Toast("Quantity are higher then available quantity","warning")
        
      }
      else if(inputedQuantity < 0){
        productForm.setFieldValue("quantity",0)
        Toast("Quantity must be greater then 0","warning")
        
      }
    }
    const checkPriceLimit =()=>{
      const inputedQuantity = productForm.values.price
      if(inputedQuantity < 0){
        productForm.setFieldValue("price",0)
        Toast("Price must be greater then 0","warning")
        
      }
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
        handleClose();
      },
    }}
  >
    <DialogTitle>
      <div className='row'>
        <div className='col-md-8 col-sm-12'>
            Product Store
        </div>
        <div className='col-md-4 col-sm-12' style={{fontSize:"15px"}}>
            {
            (isDisable) && 
            <span className='text-danger'>{'Available Qty ' + availableQty}</span>
            }
        </div>
      </div>
      
      </DialogTitle>
  <DialogContent>
     <form className='mt-1' onSubmit={productForm.handleSubmit}>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
            <TextFieldInput 
            name="productCode" 
            value={productForm.values.productCode}
            label='Product Code'
            disable={isDisable}
            errors={productForm.errors.productCode}
            handleChange={productForm.handleChange}
            handleBlur={(e:any) => customHandleBlur(e.target.value)}
            />
        </div>
        <div className='col-md-6 col-sm-12'>
          <TextFieldInput 
          name="productName" 
          value={productForm.values.productName}
          label='Product Name'
          disable={true}
          errors={productForm.errors.productName}
          handleChange={productForm.handleChange}
          handleBlur={productForm.handleBlur}
          />
        </div>
      </div>
      {
          (isDisable && !props.isPrice) &&
      <div className='row'>
        <div className='col-12'>
        
        <NumberField 
            name="quantity" 
            value={productForm.values.quantity}
            label='Quantity'
            errors={productForm.errors.quantity}
            handleChange={productForm.handleChange}
            //handleChange={(e:any) => {productForm.handleChange,setQuantity(e.target.value)}}
            handleBlur={(e:any)=>{productForm.handleBlur,checkLimit()}}
        />
        </div>
      </div>
      }
      {
          (isDisable && props.isPrice) &&
      <div className='row'>
        <div className='col-12'>
        
        <NumberField 
            name="price" 
            value={productForm.values.price}
            label='Selling Price'
            errors={productForm.errors.price}
            handleChange={productForm.handleChange}
            //handleChange={(e:any) => {productForm.handleChange,setQuantity(e.target.value)}}
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            handleBlur={(e:any)=>{productForm.handleBlur,checkPriceLimit()}}
        />
        </div>
      </div>
      }
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
        <input type="hidden" value={productForm.values.id} name="id"/>
     </form>
  </DialogContent>
  <DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <AppButton handleClick={productForm.handleSubmit} status={false} name={'Add Store'}/>
  </DialogActions>
    </Dialog>
  );
}

export default AddStore;
