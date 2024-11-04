import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateDropdownOption,
  removeDropdownOption,
} from '../../redux/DropdownReducer'
import iconClose from '../../assets/icon-close.svg'
import iconSortable from '../../assets/icon-sort.svg'
import iconWarning from '../../assets/icon-warning.svg'
import iconError from '../../assets/icon-error.svg'
import { GRADE } from 'veeva-approved-email-util/lib/linting/grading'

export const DropdownOption = ({ index, veevaToken }) => {
  const { value, lint } = veevaToken
  const { options } = useSelector((state) => state.dropdown)
  const dispatch = useDispatch()

  /**
   * Disables special characters reserved for the Veeva dropdown tokens.
   */
  const onKeyPressed = (e) => {
    if (
      e.key === '|' ||
      e.key === '{' ||
      e.key === '}' ||
      e.key === '[' ||
      e.key === ']'
    ) {
      e.preventDefault()
    }
  }

  const onDropdownOptionChanged = (e) => {
    dispatch(
      updateDropdownOption({
        index: index,
        value: e.target.value,
      })
    )
  }

  const onRemoveOption = (e) => {
    dispatch(removeDropdownOption(index))
  }

  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <div
          className={`relative rounded-md bg-[#0C0C0C] p-[15px] mb-[20px] last:mb-[0px] border-solid border-${lint.grade === GRADE.ERROR ? '[2px]' : '[1px]'} border-${lint.grade === GRADE.ERROR ? '[#E63946]' : '[#3f3f3f]'}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <label htmlFor={index} className="mb-[10px] block text-[#CCC]">
            Dropdown Option <span className="text-[#fa9739]">{index + 1}</span>:
          </label>

          <button
            className="absolute top-[15px] right-[15px] text-white"
            onClick={onRemoveOption}
          >
            <img src={iconClose} width={20} alt="" />
          </button>

          <section className="relative pl-[50px]">
            <img
              src={iconSortable}
              alt=""
              className="absolute left-[2px] top-[50%] mt-[-18px]"
              width={30}
            />

            <textarea
              className="bg-[#303030] p-[5px] w-full text-[#AAA] outline-[#F2613F] placeholder:text-[#AAA]"
              autoFocus={index === options.length - 1}
              id={index}
              name={index}
              placeholder="Dropdown text"
              value={value}
              rows={1}
              onKeyDown={onKeyPressed}
              onChange={onDropdownOptionChanged}
            />
          </section>

          <section
            className={
              !lint.grade || lint.grade === GRADE.PASS
                ? 'hidden'
                : 'block relative text-sm mt-[15px]'
            }
          >
            <div className="relative pt-[7px] pl-[50px]">
              <img
                src={lint.grade === GRADE.WARNING ? iconWarning : iconError}
                className="absolute top-0 left-0 w-[35px]"
                alt=""
              />
              <span
                className={
                  lint.grade === GRADE.WARNING
                    ? 'text-[#F4A261]'
                    : 'text-[#E63946]'
                }
              >
                {lint.message}
              </span>
            </div>
          </section>
        </div>
      )}
    </Draggable>
  )
}
