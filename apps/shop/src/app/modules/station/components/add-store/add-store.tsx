import { useEffect, useState } from 'react';
import styles from './add-store.module.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { AppButton, TextArea, TextFieldInput, addToStore, findProductByCode, onViewProduct, useAuthDispatch, useAuthSelector } from '@shop-portal/libs';
/* eslint-disable-next-line */
export interface AddStoreProps {
  status:boolean,
  changeStatus?:any,
  data:any
}

export function AddStore(props: AddStoreProps) {
  const [open,setOpen]=useState(false)
  const product = useAuthSelector(state => state.product.product);
  const dispatch = useAuthDispatch()
  const [isLoading,setIsLoading] = useState(false)
  const [searchingCode,setSearchingCode]= useState('')
  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
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
        id:''
      },
      validationSchema:productSchema,
      onSubmit(values){
        const payload = {
          productId:values.id,
          stationId:props.data,
          price:0,
          availableQuantity:0,
        }
        dispatch(addToStore(payload))
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
      productForm.setValues({productCode:pro.productCode,productName:pro.productName,specification:pro.specification,id:pro.id})
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
    <DialogTitle>Product Store</DialogTitle>
  <DialogContent>
     <form className='mt-1' onSubmit={productForm.handleSubmit}>
      <TextFieldInput 
        name="productCode" 
        value={productForm.values.productCode}
        label='Product Code'
        errors={productForm.errors.productCode}
        handleChange={ productForm.handleChange}
        handleBlur={(e:any) => customHandleBlur(e.target.value)}
        ></TextFieldInput>
        <TextFieldInput 
        name="productName" 
        value={productForm.values.productName}
        label='Product Name'
        disable={true}
        errors={productForm.errors.productName}
        handleChange={productForm.handleChange}
        handleBlur={productForm.handleBlur}
        ></TextFieldInput>
        <input type="hidden" value={productForm.values.id} name="id"></input>
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
