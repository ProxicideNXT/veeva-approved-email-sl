import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { isValidDropdownToken } from '../../util/dropdown'

const INITIAL_BTN_TEXT = 'Copy'
const ACTIVE_BTN_TEXT = 'Token Copied'
const BUTTON_TIMEOUT = 500

export const CopyTokenBtn = () => {
  const [btnText, setButtonText] = useState(INITIAL_BTN_TEXT)
  const { veevaToken } = useSelector((state) => state.dropdown)
  const isValid = isValidDropdownToken(veevaToken)

  const onCopyClicked = (e) => {
    setButtonText(ACTIVE_BTN_TEXT)
    navigator.clipboard.writeText(veevaToken)

    setTimeout(() => {
      setButtonText(INITIAL_BTN_TEXT)
    }, BUTTON_TIMEOUT)
  }

  return (
    <button
      className={`bg-[#F2613F] transition-colors duration-200 ease-in rounded-l-md inline-block text-white py-[12px] px-[25px] min-w-[150px] ${+isValid ? 'hover:bg-[#008fd2]' : 'opacity-25'}`}
      disabled={!isValid}
      onClick={onCopyClicked}
    >
      {btnText}
    </button>
  )
}
