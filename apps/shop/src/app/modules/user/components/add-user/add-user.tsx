import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import styles from './add-user.module.scss';
import { useEffect, useState } from 'react';
import { AppButton, InputCheckBox, InputPassword, InputSelect, TextFieldInput, createUser, onViewRole, useAuthDispatch, useAuthSelector, useRole, viewStation } from '@shop-portal/libs';
import { useFormik } from 'formik';
import * as Yup from 'yup'
/* eslint-disable-next-line */
export interface AddUserProps { }

export function AddUser({ status = false, changeStatus = () => { return null } }) {
  const station = useAuthSelector((state) => state.station.station);
  const dispatch = useAuthDispatch()
  const roles = useAuthSelector(state => state.role.roles)
  const [open, setOpen] = useState(false)
  const { role, addRole, removeRole } = useRole()

  useEffect(() => {
    if (roles.length === 0) {
      dispatch(onViewRole())

    }
    if (station.length === 0) {
      dispatch(viewStation())
    }
    status &&
      handleOpen()
  }, [status, role])

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    changeStatus()

  }

  const onCheckBoxChange = (value: any) => {
    const findRole = role.filter((element: any) => element === value)
    if (findRole.length === 0) {
      addRole(value)
    }
    else {
      removeRole(value)
    }
  }
  const userValidateSchema = Yup.object({
    fullName: Yup.string().required(),
    username: Yup.string().required().email(),
    stationId: Yup.string().required(),
    password: Yup.string().required()

  })
  const userForm = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      stationId: "",
      password: ""
    },
    validationSchema: userValidateSchema,
    async onSubmit(values) {
      const payload = { ...values, role }
      dispatch(createUser(payload))

    },


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
      <DialogTitle> New User</DialogTitle>
      <DialogContent>
        <form className='mt-1' onSubmit={userForm.handleSubmit}>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <TextFieldInput name='fullName'
                value={userForm.values.fullName}
                errors={userForm.errors.fullName}
                handleChange={userForm.handleChange}
                handleBlur={userForm.handleBlur}
                label='Full name' />
            </div>
            <div className='col-md-6 col-sm-12'>
              <TextFieldInput name='username'
                value={userForm.values.username}
                errors={userForm.errors.username}
                handleChange={userForm.handleChange}
                handleBlur={userForm.handleBlur}
                label='Username' />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <InputSelect name='stationId'
                valueLable={"id"}
                selectOptionLabel={"stationName"}
                selectionValue={station}
                value={userForm.values.stationId}
                errors={userForm.errors.stationId}
                handleChange={userForm.handleChange}
                handleBlur={userForm.handleBlur}
                label='Station' />
            </div>
            <div className='col-md-6 col-sm-12'>
              <InputPassword name='password'
                label='password'
                value={userForm.values.password}
                errors={userForm.errors.password}
                handleChange={userForm.handleChange}
                handleBlur={userForm.handleBlur}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='form-group'>
                {
                  roles.map((element: any) => {
                    return <InputCheckBox handleChange={() => onCheckBoxChange(element.name)} value={element.name} name="check1" label={element.name} />
                  })
                }

              </div>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <AppButton handleClick={userForm.handleSubmit} status={false} name={'Save'} />
      </DialogActions>
    </Dialog>
  );
}

export default AddUser;
