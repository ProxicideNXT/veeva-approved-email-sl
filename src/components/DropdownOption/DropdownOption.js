import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateDropdownOption,
  removeDropdownOption,
} from '../../redux/DropdownReducer'
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
          className="relative rounded-md bg-[#0C0C0C]	border-[1px] border-[#3f3f3f] border-solid p-[15px] mb-[20px] last:mb-[0px]"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="col-span-1 absolute top-[50%] mt-[-50px]">
            <img
              src={iconSortable}
              alt=""
              className="mt-[20px] ml-[5px]"
              width={50}
            />
          </div>

          <div className="col-span-5 pl-[75px]">
            <label
              htmlFor={index}
              className="mb-[10px] block text-[#CCC] text-lg"
            >
              Dropdown Option {index + 1}:
            </label>
            <textarea
              className="bg-[#303030] min-h-20 p-[5px] w-full text-[#AAA] outline-[#F2613F] placeholder:text-[#AAA]"
              autoFocus={index === options.length - 1}
              id={index}
              name={index}
              placeholder="Dropdown text"
              value={value}
              onKeyDown={onKeyPressed}
              onChange={onDropdownOptionChanged}
            />

            <section
              className={
                !lint.grade || lint.grade === GRADE.PASS ? 'hidden' : 'block'
              }
            >
              <span
                className={
                  lint.grade === GRADE.WARNING
                    ? 'text-[#FF9966]'
                    : 'text-[#e54141]'
                }
              >
                <img
                  src={lint.grade === GRADE.WARNING ? iconWarning : iconError}
                  className="inline-block w-[35px] ml-[-5px]"
                  alt=""
                />
                {lint.message}
              </span>
            </section>

            <button
              className="underline text-[#008fd2] outline-[#F2613F] mt-[10px]"
              onClick={onRemoveOption}
            >
              Remove option
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}
