import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVeevaToken } from '../../redux/DropdownReducer'

export const VeevaToken = (props) => {
  const { veevaToken } = useSelector((state) => state.dropdown)
  const dispatch = useDispatch()

  const onVeevaTokenChange = (e) => {
    dispatch(updateVeevaToken(e.target.value))
  }

  return (
    <>
      <h2 className="text-[#F5F5F5] text-[1.25rem] font-[Barlow] mb-[10px]">
        HTML Veeva Token
      </h2>

      <textarea
        className="resize-none block rounded-md bg-[#0C0C0C] border-[1px] border-[#3f3f3f] border-solid p-[15px] w-full min-h-[300px] text-[#888888] outline-[#F2613F]"
        placeholder="Veeva dropdown token"
        id="veeva-dropdown"
        name="veeva-dropdown"
        onChange={onVeevaTokenChange}
        value={veevaToken}
      />

      <section className="text-[#CCC] md:text-right my-[20px]">
        Token character count:&nbsp;
        <span className="text-[#fa9739]">{veevaToken.length}</span>
      </section>
    </>
  )
}
