import React from 'react'
import { useSelector } from 'react-redux'

export const VeevaToken = (props) => {
  const { veevaToken } = useSelector((state) => state.dropdown)

  return (
    <textarea
      className="resize-none rounded-md bg-[#0C0C0C] border-[1px] border-[#3f3f3f] border-solid p-[15px] w-full min-h-[350px] md:h-full text-[#888888] outline-[#F2613F]"
      disabled={true}
      placeholder="Veeva dropdown token"
      id="veeva-dropdown"
      name="veeva-dropdown"
      value={veevaToken}
    />
  )
}
