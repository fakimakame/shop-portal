import { useEffect, useState } from 'react';
import styles from './add-product.module.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { AppButton, TextArea, TextFieldInput, addProduct, useAuthDispatch } from '@shop-portal/libs';

/* eslint-disable-next-line */
export interface AddProductProps {
  status:boolean,
  changeStatus?:any,
  data:any
}

export function AddProduct(props: AddProductProps) {
  const [open,setOpen]=useState(false)
  const dispatch = useAuthDispatch()
  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
    props.changeStatus()
  }
  useEffect(() => {
    props.status && handleOpen()
    if(props.data.productCode){
      productForm.setValues({productCode:props.data.productCode,productName:props.data.productName,specification:props.data.specification})
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
      specification:''
    },
    validationSchema:productSchema,
    onSubmit(values){
      dispatch(addProduct(values))
      if(productForm.errors !== undefined)
      handleClose()
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
        // const formData = new FormData(event.currentTarget);
        // const formJson = Object.fromEntries((formData as any).entries());
        // console.log(formJson);
        handleClose();
      },
    }}
  >
  <DialogTitle> New Product</DialogTitle>
  <DialogContent>
     <form className='mt-1' onSubmit={productForm.handleSubmit}>
      <TextFieldInput 
        name="productCode" 
        value={productForm.values.productCode}
        label='Product Code'
        errors={productForm.errors.productCode}
        handleChange={productForm.handleChange}
        handleBlur={productForm.handleBlur}
        ></TextFieldInput>
        <TextFieldInput 
        name="productName" 
        value={productForm.values.productName}
        label='Product Name'
        errors={productForm.errors.productName}
        handleChange={productForm.handleChange}
        handleBlur={productForm.handleBlur}
        ></TextFieldInput>
        <TextArea
        name="specification" 
        value={productForm.values.specification}
        label='Specification/Description'
        errors={productForm.errors.specification}
        handleChange={productForm.handleChange}
        handleBlur={productForm.handleBlur}
        row={4}
        ></TextArea>
     </form>
  </DialogContent>
  <DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <AppButton handleClick={productForm.handleSubmit} status={false} name={'Save'}/>
  </DialogActions>
  </Dialog>
  );
}

export default AddProduct;
