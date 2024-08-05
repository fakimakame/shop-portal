import { useEffect, useState } from 'react';
import styles from './add-product.module.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { AppButton, InputFile, InputSelect, TextArea, TextFieldInput, Toast, addProduct, useAuthDispatch, useAuthSelector, viewCategory } from '@shop-portal/libs';

/* eslint-disable-next-line */
export interface AddProductProps {
  status: boolean,
  changeStatus?: any,
  data: any
}

export function AddProduct(props: AddProductProps) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const categorySelector = useAuthSelector(state => state.category)
  const productLoading = useAuthSelector(state => state.product.isLoading)
  const dispatch = useAuthDispatch()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    props.changeStatus()
  }
  useEffect(() => {
    if (categorySelector.category.length === 0) {
      dispatch(viewCategory())
    }
    props.status && handleOpen()
    if (props.data.productCode) {
      productForm.setValues({ productCode: props.data.productCode, productName: props.data.productName, specification: props.data.specification, file: '',categoryId:'' })
    }
    else {
      productForm.resetForm()
    }

  }, [props.status, dispatch])
  const productSchema = Yup.object({
    productCode: Yup.string().required(),
    productName: Yup.string().required(),
    specification: Yup.string().required(),
    //file:Yup.string().required(),
    categoryId:Yup.string().required()
  })
  const uploadFile = (e: any) => {
    setFile(e)
  }
  const productForm = useFormik({
    initialValues: {
      productCode: '',
      productName: '',
      specification: '',
      categoryId:'',
      file: ''
    },
    validationSchema: productSchema,
    onSubmit(values) {
      const uploadedImage: any = file
      const formData: FormData = new FormData()
      formData.append("productCode", values.productCode)
      formData.append("productName", values.productName)
      formData.append("specification", values.specification)
      formData.append("categoryId",values.categoryId)
      if (file != null) {
        formData.append("file", new Blob([uploadedImage], { type: uploadedImage.type }), uploadedImage.name);
        dispatch(addProduct(formData))
      }
      else {
        Toast("Please upload file before submit", "danger")
      }
      setFile(null)
      if (productForm.errors !== undefined && file !== null)
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
      <form className='mt-1' onSubmit={productForm.handleSubmit}>
      <DialogContent>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <TextFieldInput
                name="productCode"
                value={productForm.values.productCode}
                label='Product Code'
                errors={productForm.errors.productCode}
                handleChange={productForm.handleChange}
              />
            </div>
            <div className='col-md-6 col-sm-12'>
              <TextFieldInput
                name="productName"
                value={productForm.values.productName}
                label='Product Name'
                errors={productForm.errors.productName}
                handleChange={productForm.handleChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <InputSelect name='categoryId'
                valueLable={"id"}
                selectOptionLabel={"categoryName"}
                selectionValue={categorySelector.category}
                value={productForm.values.categoryId}
                errors={productForm.errors.categoryId}
                handleChange={productForm.handleChange}
                label='Category' />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <TextArea
                name="specification"
                value={productForm.values.specification}
                label='Specification/Description'
                errors={productForm.errors.specification}
                handleChange={productForm.handleChange}
                row={4}
              ></TextArea>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <InputFile name="file"
                //value = {productForm.values.file}
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                handleChange={(e: any) => { productForm.handleChange, uploadFile(e) }}
              />
            </div>
          </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <AppButton disabledStatus={!productForm.isValid} status={productLoading} handleClick={productForm.handleSubmit} name={'Save'} />
      </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddProduct;
