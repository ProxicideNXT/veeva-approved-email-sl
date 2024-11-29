import React from 'react'
import { useDispatch } from 'react-redux'
import { addDropdownOption } from '../../redux/DropdownReducer'
import { useSelector } from 'react-redux'
import { isValidDropdownToken } from '../../util/dropdown'

export const AddOptionBtn = () => {
  const { veevaToken } = useSelector((state) => state.dropdown)
  const isValid = isValidDropdownToken(veevaToken)
  const dispatch = useDispatch()

  const onAddDropdownOption = (e) => {
    dispatch(addDropdownOption())
  }

  return (
    <button
      className={`bg-[#39B2FA] transition-colors duration-200 ease-in rounded-md inline-block text-white py-[12px] px-[25px] min-w-[125px] ${+isValid ? 'hover:bg-[#2A8EC1]' : 'opacity-25'}`}
      disabled={!isValid}
      onClick={onAddDropdownOption}
    >
      Add Dropdown Option
    </button>
  )
}
