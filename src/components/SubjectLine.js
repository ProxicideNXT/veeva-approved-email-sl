import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateDropdownOption,
  removeDropdownOption,
} from '../redux/DropdownReducer'
import sortIcon from '../assets/icon-sort.svg'

export const SubjectLine = (props) => {
  const { options } = useSelector((state) => state.dropdown)
  const dispatch = useDispatch()

  const onDropdownOptionChanged = (e) => {
    dispatch(
      updateDropdownOption({
        index: props.index,
        value: e.target.value,
      })
    )
  }

  const onRemoveOption = (e) => {
    dispatch(removeDropdownOption(props.index))
  }

  return (
    <Draggable draggableId={props.index.toString()} index={props.index}>
      {(provided) => (
        <div
          className="relative rounded-md bg-[#0C0C0C]	border-[2px] border-[#8b8b8b] border-dashed p-[15px] mb-[20px] last:mb-[0px] outline-[#F2613F]"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="col-span-1 absolute top-[50%] mt-[-50px]">
            <img src={sortIcon} alt="" className="mt-[20px]" width={50} />
          </div>

          <div className="col-span-5 pl-[75px]">
            <label
              htmlFor={props.index}
              className="mb-[10px] block text-[#CCC] text-lg"
            >
              Dropdown Option {props.index + 1}:
            </label>
            <input
              className="bg-[#AAA] p-[5px] w-full text-black mb-[5px] outline-[#F2613F] placeholder:text-[#444]"
              id={props.index}
              name={props.index}
              placeholder="Dropdown text"
              value={options[props.index].value}
              onChange={onDropdownOptionChanged}
            />

            <section className={options[props.index].error.grade === "WARNING" ? "text-[#cf9c66]" : "text-[#CF6679]"}>
              {options[props.index].error.message}
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
