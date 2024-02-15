import { AppButton, TextFieldInput, saveStation, useAuthDispatch, useAuthSelector } from '@shop-portal/libs';
import styles from './add-station.module.scss';
import * as Yup from 'yup'
import { useFormik } from 'formik';

/* eslint-disable-next-line */
export interface AddStationProps {}

export function AddStation(props: AddStationProps) {
  const {isLoading} =useAuthSelector((state => state.station))
  const dispatch = useAuthDispatch()
  const buttonStyles={
    float:'right'
  }
  const validationSchema=Yup.object({
    stationName:Yup.string().required()
  })
  const stationForm= useFormik({
    initialValues:{
      stationName:''
    },
    validationSchema:validationSchema,
    async  onSubmit(values){
      const { payload } = await dispatch(saveStation(values))
    }
  })
  return (
    <div className={styles['container']}>
      <h3>Add new Station</h3>
      <form onSubmit={stationForm.handleSubmit}>
          <TextFieldInput name='stationName'
          value={stationForm.values.stationName}
          errors={stationForm.errors.stationName}
            handleChange={stationForm.handleChange}
            handleBlur={stationForm.handleBlur}
           label='Station name'/>
          <AppButton status={isLoading} 
          styles={buttonStyles} 
          name='Submit' 
          classes='mt-1'/>
      </form>
    </div>
  );
}

export default AddStation;
