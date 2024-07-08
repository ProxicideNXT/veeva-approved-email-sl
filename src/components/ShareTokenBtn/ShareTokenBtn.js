import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { isValidDropdownToken } from '../../util/dropdown'

const INITIAL_BTN_TEXT = 'Share'
const ACTIVE_BTN_TEXT = 'URL Copied'
const BUTTON_TIMEOUT = 500

export const ShareTokenBtn = () => {
  const [btnText, setButtonText] = useState(INITIAL_BTN_TEXT)
  const { veevaToken } = useSelector((state) => state.dropdown)
  const isValid = isValidDropdownToken(veevaToken)

  const onShareClicked = (e) => {
    setButtonText(ACTIVE_BTN_TEXT)
    navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}?token=${veevaToken}`
    )

    setTimeout(() => {
      setButtonText(INITIAL_BTN_TEXT)
    }, BUTTON_TIMEOUT)
  }

  return (
    <button
      className={`bg-[#0C0C0C] transition-colors duration-200 ease-in rounded-r-md inline-block text-white py-[12px] px-[25px] min-w-[150px] ${+isValid ? 'hover:bg-[#2b2b2b]' : 'opacity-25'}`}
      disabled={!isValid}
      onClick={onShareClicked}
    >
      {btnText}
    </button>
  )
}
