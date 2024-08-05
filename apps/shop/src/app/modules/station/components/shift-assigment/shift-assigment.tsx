import { useFormik } from 'formik';
import { useState, useEffect } from 'react'
import styles from './shift-assigment.module.scss';
import { InputSelect, useAuthSelector, useAuthDispatch, viewStation, viewUser, TimeField, AppButton, addShift, MaterialTable, ActionButton, Column, viewShiftToAdmin } from '@shop-portal/libs';
import * as Yup from 'yup'
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface ShiftAssigmentProps { }
const columns: Column[] = [
  {
    accessorKey: 'stationName',
    header: 'Station',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'openerName',
    header: 'Opener Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'operatorName',
    header: 'Operator Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'shiftDate',
    accessorFn: (row: any) => new Date(row.shiftDate), //convert to Date for sorting and filtering
    header: 'Shift Date',
    Cell: ({ cell }: any) => (cell.getValue().toLocaleDateString()),
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'openingTime',
    header: 'openingTime',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
]
export function ShiftAssigment(props: ShiftAssigmentProps) {
  const navigate = useNavigate()
  const actionButtons: ActionButton[] = [
    {
      id: 'view',
      label: 'View',
      icon: 'visibility',
      title: 'View',
      action: 'onView',
    }
  ]
  const stationStore = useAuthSelector(state => state.station)
  const userStore = useAuthSelector(state => state.user)
  const shift = useAuthSelector(state => state.shift)
  const [stationId, setStationId] = useState(0)
  const dispatch = useAuthDispatch()
  const handleClick = (column: any, data: any) => {
    const action = column.action
    switch (action) {
      case 'onView':
        onView()
        break
    }
  }
  const onView = () => {
    navigate("/shop/sale-site")
  }
  useEffect(() => {
    dispatch(viewShiftToAdmin('opened'))
    if (stationStore.station.length === 0) {
      dispatch(viewStation())
    }
    if (userStore.user.length === 0) {
      dispatch(viewUser())
    }
  }, [])
  const shiftSchema = Yup.object({
    stationId: Yup.string().required(),
    operator: Yup.string().required(),
    openingTime: Yup.string().required()
  })
  const shiftForm = useFormik({
    initialValues: {
      stationId: '',
      operator: '',
      openingTime: '',
      //shiftDate:''
    },
    validationSchema: shiftSchema,
    onSubmit(values) {
      const userInfo: any = sessionStorage.getItem('userInfo')
      const { id, ...other } = JSON.parse(userInfo)

      const { openingTime, ...rest } = values
      const openingTimeToDate = new Date(openingTime)
      const shiftDate = new Date();
      const payload = {
        ...rest,
        shiftDate: shiftDate.toISOString(),
        opener: id,
        shiftStatus: 'opened',
        closingTime: '',
        openingTime: openingTimeToDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      }
      dispatch(addShift(payload))
      console.log("it work", payload, shiftDate)
    }
  })
  const handleChange = (value: any) => {
    console.log("this is working", value)
  }
  const handleClose = () => {
    shiftForm.resetForm()
    shiftForm.setFieldValue('stationId', "")
  }
  return (
    <>
      <div className="w-100 p-1 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#b3ecff' }}>
        <h5>
          Shift Assigment
        </h5>
        <span mat-dialog-close>
          <Close />
        </span>
      </div>
      <form className='mt-1' onSubmit={shiftForm.handleSubmit}>
        <div className='row'>
          <div className='col-md-3 col-sm-12'>
            <InputSelect name='stationId'
              valueLable={"id"}
              selectOptionLabel={"stationName"}
              selectionValue={stationStore.station}
              value={shiftForm.values.stationId}
              errors={shiftForm.errors.stationId}
              handleChange={shiftForm.handleChange}
              handleBlur={shiftForm.handleBlur}
              label='Station' />
          </div>
          <div className='col-md-3 col-sm-12'>
            <InputSelect name='operator'
              valueLable={"id"}
              selectOptionLabel={"fullName"}
              selectionValue={userStore.user}
              value={shiftForm.values.operator}
              errors={shiftForm.errors.operator}
              handleChange={shiftForm.handleChange}
              handleBlur={shiftForm.handleBlur}
              label='Operator' />
          </div>
          <div className='col-md-3 col-sm-12'>
            <TimeField
              name='openingTime'
              label='Opening Time'
              value={shiftForm.values.openingTime}
              errors={shiftForm.errors.openingTime}
              handleChange={(time: any) => shiftForm.setFieldValue('openingTime', time)}
            />
          </div>
          <div className='col-md-3 col-sm-12 pt-2'>
            <AppButton handleClick={shiftForm.handleSubmit} status={false} name={'Save'} />&nbsp;&nbsp;
            <Button variant='contained' size='small' color='warning' onClick={handleClose}>Reset</Button>
          </div>
        </div>
      </form>
      <br />
      <MaterialTable
        actionButtonData={actionButtons}
        rows={shift.shift} columns={columns}
        uniqueId={'shiftId'}
        isLoading={shift.isLoading}
        onActionClick={handleClick}
        hasActionButton={true}
        hasSerialNo={true}
        hasCustomButton={false}
      />
    </>
  );
}

export default ShiftAssigment;
