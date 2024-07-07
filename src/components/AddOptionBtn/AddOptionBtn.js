import React from 'react'
import { useDispatch } from 'react-redux'
import { addDropdownOption } from '../../redux/DropdownReducer'

export const AddOptionBtn = () => {
  const dispatch = useDispatch()
  
  const onAddDropdownOption = (e) => {
    dispatch(addDropdownOption())
  }  
  
  return (
    <button
      className='bg-[#F2613F] hover:bg-[#008fd2] transition-colors duration-200 ease-in rounded-md inline-block text-white py-[12px] px-[25px] min-w-[125px]'
      onClick={onAddDropdownOption}>
      Add Dropdown Option
    </button>
  )
}
