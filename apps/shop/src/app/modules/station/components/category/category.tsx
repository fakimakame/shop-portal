import { Column, InputSelect, MaterialTable, useAuthDispatch, useAuthSelector, viewCategory, viewCategoryWithSize, viewSize } from '@shop-portal/libs';
import styles from './category.module.scss';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AddCategory from '../add-category/add-category';
import AddCategorySize from '../add-category-size/add-category-size';

/* eslint-disable-next-line */
export interface CategoryProps { }
const categoryColumns: Column[] = [
  {
    accessorKey: 'categoryName',
    header: 'Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
]
const sizeColumns: Column[] = [
  {
    accessorKey: 'sizeName',
    header: 'Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
]
const categorysizeColumns: Column[] = [
  {
    accessorKey: 'category',
    header: 'Category',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'size',
    header: 'Size',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
]
export function Category(props: CategoryProps) {
  const categorySelector = useAuthSelector(state => state.category)
  const sizeSelector = useAuthSelector(state => state.size)
  const categorysizeSelector = useAuthSelector(state => state.categorySize)
  const dispatch = useAuthDispatch();
  const [open,setOpen] = useState(false)
  const [type,setType] = useState("")
  const [openMap,setOpenMap] = useState(false)
  useEffect(() => {
    if (categorySelector.category.length === 0) {
      dispatch(viewCategory())
    }
    if (sizeSelector.size.length === 0) {
      dispatch(viewSize())
    }
    if(categorysizeSelector.categorySize.length === 0){
      dispatch(viewCategoryWithSize())
    }
  }, [dispatch])
  const initialValues = {
    categoryId: ""
  }
  const categoryForm = useFormik({
    initialValues,
    onSubmit(values) {
      //
    }
  })
  const handleChange = (value:any) => {
    console.log("this is my value",value)
  }
  const openDialog = (value:string) =>{
    setType(value)
    setOpen(true)
  }
  const openMapDialog = () =>{
    setOpenMap(true)
  }
  const onCloseDialog = () =>{
    setOpen(false)
    setOpenMap(false)
    setType("")
  }
  return (
    <>
      <div className="lg:tw-flex lg:tw-items-center lg:tw-justify-between">
        <div className="tw-min-w-0 flex-1">
          <h2 className="tw-text-2xl tw-font-bold tw-leading-7 tw-text-gray-900 sm:tw-truncate sm:tw-text-3xl sm:tw-tracking-tight">Categories And Product Sizes</h2>

        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='co-md-4 col-sm-12 col-lg-4'>
          {/* <h4 className="tw-text-xl tw-font-bold tw-leading-2 tw-text-gray-400 sm:tw-truncate sm:tw-text-xl sm:tw-tracking-tight"> Product category</h4> */}
          <MaterialTable
            // actionButtonData={actionButtons} 
            rows={categorySelector.category} columns={categoryColumns}
            uniqueId={'id'}
            //onActionClick={handleClick}
            hasActionButton={false}
            hasSerialNo={true}
            hasCustomButton={true}
            customButtonName={'CATEGORY'}
            customButtonClick={()=>openDialog("Category")}
          />
        </div>
        <div className='co-md-4 col-sm-12 col-lg-4'>
          {/* <h4 className="tw-text-xl tw-font-bold tw-leading-2 tw-text-gray-400 sm:tw-truncate sm:tw-text-xl sm:tw-tracking-tight"> Product Size</h4> */}
          <MaterialTable
            // actionButtonData={actionButtons} 
            rows={sizeSelector.size} columns={sizeColumns}
            uniqueId={'id'}
            //onActionClick={handleClick}
            hasActionButton={false}
            hasSerialNo={true}
            hasCustomButton={true}
            customButtonName={'SIZE'}
            customButtonClick={()=>openDialog("Size")}
          />
        </div>
        <div className='co-md-4 col-sm-12 col-lg-4'>
          {/* <h4 className="tw-text-xl tw-font-bold tw-leading-2 tw-text-gray-400 sm:tw-truncate sm:tw-text-xl sm:tw-tracking-tight">Category & size</h4> */}
          <MaterialTable
            // actionButtonData={actionButtons} 
            rows={categorysizeSelector.categorySize} columns={categorysizeColumns}
            uniqueId={'id'}
            //onActionClick={handleClick}
            hasActionButton={false}
            hasSerialNo={true}
            hasCustomButton={true}
            customButtonName={'MAP'}
            customButtonClick={openMapDialog}
          />
        </div>
      </div>
      <AddCategory type={type} status={open} changeStatus={onCloseDialog}/>
      <AddCategorySize status={openMap} changeStatus={onCloseDialog}/>
    </>

  );
}

export default Category;
