import { AppButton, TextFieldInput, loginThunk, useAuthDispatch, useAuthSelector } from '@shop-portal/libs';
import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';
export function Login () {
  const { isLoading }=useAuthSelector((state) => state.login)
  const navigate = useNavigate()
  const dispatch= useAuthDispatch()
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
        const {payload} = await dispatch(loginThunk(values))
        if(payload.access_token){
          navigate('/shop')
        }
        //return redirect('/shop')
    //  }
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
    //color:'red',
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
          <TextFieldInput 
            label="username" 
            name="username"
            errors={formik.errors.username}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.username}
            />
          <TextFieldInput 
          type="password" 
          label="Password" 
          name="password"
          errors={formik.errors.password}
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          />
          <AppButton status={isLoading} 
          styles={buttonStyles} 
          name='Login' 
          classes='mt-1'/>
          </form>
          </div>
        </div>
        
    </div>
    </React.Fragment>
  );
}

export default Login;
