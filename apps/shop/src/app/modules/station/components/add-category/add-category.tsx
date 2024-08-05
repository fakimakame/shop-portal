import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styles from './add-category.module.scss';
import { addCategory, addSize, AppButton, TextFieldInput, useAuthDispatch, useAuthSelector } from '@shop-portal/libs';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
/* eslint-disable-next-line */
export interface AddCategoryProps {
  changeStatus?: any,
  status?: boolean,
  type?: string
}

export function AddCategory(props: AddCategoryProps) {
  const categorySelector = useAuthSelector(state => state.category)
  const sizeSelector = useAuthSelector(state => state.size)
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
  }, [props.status])
  const schema = Yup.object({
    name: Yup.string().required()
  })
  const categoryForm = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
     onSubmit(values) {
      console.log("this is my value", values)
      if (props.type === "Category") {
       dispatch(addCategory(values))
      }
      else {
       dispatch(addSize(values))
      }
      handleClose()
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
              {`Add ${props.type}`}
            </div>
          </div>

        </DialogTitle>
        <DialogContent>
          <div className='row mt-1'>
            <div className='col-md-12 col-sm-12'>
              <TextFieldInput
                handleBlur={categoryForm.handleBlur}
                handleChange={categoryForm.handleChange}
                errors={categoryForm.errors.name}
                value={categoryForm.values.name}

                name='name' label='Name' />
            </div>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {
            props.type === "Category" &&
            <AppButton handleClick={categoryForm.handleSubmit} disabledStatus={!categoryForm.isValid} status={categorySelector.isLoading} name={'Save'} />
          }
          {
            props.type === "Size" &&
            <AppButton handleClick={categoryForm.handleSubmit} disabledStatus={!categoryForm.isValid} status={sizeSelector.isLoading} name={'Save'} />
          }
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default AddCategory;
