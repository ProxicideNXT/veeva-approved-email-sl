import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVeevaToken } from '../redux/DropdownReducer'

export const DropdownForm = (props) => {
  const { veevaToken } = useSelector((state) => state.dropdown)
  const dispatch = useDispatch(setVeevaToken())

  const onSubjectLineChanged = (e) => {
    dispatch(setVeevaToken(e.target.value))
  }

  return (
    <>
      <textarea
        className="resize-none bg-[#000000] border-2 border-black border-solid p-[15px] w-full h-full text-[#c1c1c1] outline-[#F2613F] w-full h-full"
        placeholder="Veeva dropdown token"
        id="veeva-dropdown"
        name="veeva-dropdown"
        value={veevaToken}
        onChange={onSubjectLineChanged}
      />
    </>
  )
}
