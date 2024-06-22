import React from 'react'
import { useDispatch } from 'react-redux'
import { addDropdownOption } from '../redux/DropdownReducer'

export const Header = () => {
  const dispatch = useDispatch()
  
  const onAddDropdownOption = (e) => {
    dispatch(addDropdownOption())
  }

  return (
    <header className='grid md:grid-cols-2 bg-[#121212] fixed top-[0px] z-50 w-full p-[15px] h-[50px]'>
      <div className='md:col-span-1'>
        <button
          className="rounded-md text-[#008fd2] outline-[#F2613F]"
          onClick={onAddDropdownOption}>
          Add Dropdown Option
        </button>
      </div>
      
      <div className='md:col-span-1 text-[#FFF]'>
      </div>

    </header>
  )
}
