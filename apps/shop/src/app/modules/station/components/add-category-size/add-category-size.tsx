import { useEffect, useState } from 'react';
import styles from './add-category-size.module.scss';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addSizeToCategory, AppButton, InputSelect, useAuthDispatch, useAuthSelector, viewCategory, viewSize } from '@shop-portal/libs';
/* eslint-disable-next-line */
export interface AddCategorySizeProps {
  changeStatus?: any,
  status?: boolean,
}

export function AddCategorySize(props: AddCategorySizeProps) {
  const categorySelector = useAuthSelector(state => state.category)
  const sizeSelector = useAuthSelector(state => state.size)
  const categorySizeSelector = useAuthSelector(state => state.categorySize)
  const dispatch = useAuthDispatch()
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
    props.changeStatus()
    categoryForm.resetForm()
  }
  useEffect(() => {
    props.status &&
      setOpen(true)
    if(categorySelector.category === 0){
      dispatch(viewCategory())
    }
    if(sizeSelector.size === 0){
      dispatch(viewSize())
    }
  }, [props.status])

  const initialValues = {
    categoryId:'',
    sizeId:''
  }
  const schema = Yup.object({
    categoryId:Yup.string().required(),
    sizeId:Yup.string().required(),
  })
  const categoryForm = useFormik({
    initialValues:initialValues,
    validationSchema:schema,
    onSubmit(values){
      dispatch(addSizeToCategory(values))
    }
  })
  return (
    <form onSubmit={categoryForm.handleSubmit}>
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
              Map Size to Category
            </div>
          </div>

        </DialogTitle>
        <DialogContent>
          <div className='row mt-1'>
            <div className='col-md-12 col-sm-12'>
            <InputSelect name='categoryId'
                valueLable={"id"}
                selectOptionLabel={"categoryName"}
                selectionValue={categorySelector.category}
                value={categoryForm.values.categoryId}
                errors={categoryForm.errors.categoryId}
                  handleChange={categoryForm.handleChange}
                  handleBlur={categoryForm.handleBlur}
                label='Category'/>
            <InputSelect name='sizeId'
                valueLable={"id"}
                selectOptionLabel={"sizeName"}
                selectionValue={sizeSelector.size}
                value={categoryForm.values.sizeId}
                errors={categoryForm.errors.sizeId}
                  handleChange={categoryForm.handleChange}
                  handleBlur={categoryForm.handleBlur}
                label='Size'/>
          </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
            <AppButton handleClick={categoryForm.handleSubmit} disabledStatus={!categoryForm.isValid} status={categorySizeSelector.isLoading} name={'Save'} />
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default AddCategorySize;
