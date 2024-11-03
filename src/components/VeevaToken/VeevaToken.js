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
      <textarea
        className="resize-none rounded-md bg-[#0C0C0C] border-[1px] border-[#3f3f3f] border-solid p-[15px] w-full min-h-[350px] md:h-full text-[#888888] outline-[#F2613F]"
        placeholder="Veeva dropdown token"
        id="veeva-dropdown"
        name="veeva-dropdown"
        onChange={onVeevaTokenChange}
        value={veevaToken}
      />

      <section className="text-[#CCC] md:text-right">
        Character Count:{' '}
        <span className="text-[#fa9739]">{veevaToken.length}</span>
      </section>
    </>
  )
}
