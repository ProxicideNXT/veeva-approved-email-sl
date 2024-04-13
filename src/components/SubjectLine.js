import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { updateDropdownOption, removeDropdownOption } from '../redux/DropdownReducer'

export const SubjectLine = (props) => {

  const {options} = useSelector(state => state.dropdown)
  const dispatch = useDispatch()

  const onDropdownOptionChanged = e => {
    dispatch(updateDropdownOption({
      index: props.index,
      value: e.target.value
    }))
  }

  const onRemoveOption = e=> {
    dispatch(removeDropdownOption(props.index))
  }
  
  return (
    <Draggable
      draggableId={props.index.toString()}
      index={props.index}
      >
        {provided => (
          <div
            className='rounded-md	border-[2px] border-[#008fd2] border-dashed p-[15px] mb-[20px] last:mb-[0px]'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p className='mb-[10px] font-bold'>
              <label htmlFor={props.index}>Dropdown Option {props.index + 1}:</label>
            </p>
            <input 
              className='bg-[#F0F0F0] border-[1px] border-[#343A40] border-solid p-[5px] w-full text-black mb-[5px]'
              id={props.index}
              name={props.index}
              value={options[props.index]}
              onChange={onDropdownOptionChanged}
            />

            <button className='font-bold underline' onClick={onRemoveOption}>Remove option</button>
          </div>
        )}
    </Draggable>
  )
}
