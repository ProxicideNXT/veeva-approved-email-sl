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
          className="grid grid-cols-6 rounded-md	border-[2px] border-[#008fd2] border-dashed p-[15px] mb-[20px] last:mb-[0px]"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="col-span-1">
            <img
              src={sortIcon}
              alt="sort icon"
              className="mt-[20px]"
              width={50}
            />
          </div>

          <div className="col-span-5">
            <label htmlFor={props.index} className="mb-[10px] font-bold block">
              Dropdown Option {props.index + 1}:
            </label>
            <input
              className="bg-[#F0F0F0] border-[1px] border-[#343A40] border-solid p-[5px] w-full text-black mb-[5px]"
              id={props.index}
              name={props.index}
              placeholder="Dropdown option"
              value={options[props.index].value}
              onChange={onDropdownOptionChanged}
            />

            <p>{options[props.index].error.message}</p>
            <button className="font-bold underline" onClick={onRemoveOption}>
              Remove option
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}
