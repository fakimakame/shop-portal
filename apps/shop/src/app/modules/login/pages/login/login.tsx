import { AppButton, TextField } from '@shop-portal/libs';
import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup'
// eslint-disable-next-line @nx/enforce-module-boundaries
import LoginService from 'apps/shop/src/app/services/login.service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface LoginProps {
}

export function Login (props : LoginProps) {

  const validationSchema=Yup.object({
    username:Yup.string().required().email(),
    password:Yup.string().required()
  })

  const formik =useFormik({
    initialValues:{
      username:'',
      password:''
    },
    validationSchema:validationSchema,
    async onSubmit(values){
      const loginService=new LoginService()
      const  {data }= await loginService.getById(values)

      console.log('the form is submitted',data)
    }
  })

  const [formData,setFormData]= useState({
    username:'',
    password:''
  }
  )

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} =e.target
    setFormData({
      ...formData,
      [name]:value
    })
    //this.setState({account:{[name]:value}})
  }

  const handleSubmit = (e:any)=>{
    e.preventDefault()
    console.log('submitted')
    
  }
  const buttonStyles={
    color:'red',
    float:'right'
  }
    
  return (
    <React.Fragment>
    <ToastContainer></ToastContainer>
    <div className='container mt-4'>
        <div className='row'>
          <div className="offset-md-3 col-md-5 col-sm-12">
          <h1>Login Form</h1>
          <form onSubmit={formik.handleSubmit}>
          <TextField 
            label="username" 
            name="username"
            errors={formik.errors.username}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.username}
            ></TextField>
          <TextField 
          type="password" 
          label="Password" 
          name="password"
          errors={formik.errors.password}
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          ></TextField>
          <AppButton styles={buttonStyles} name='Login' class='btn-success'></AppButton>
          </form>
          </div>
        </div>
        
    </div>
    </React.Fragment>
  );
}

export default Login;
