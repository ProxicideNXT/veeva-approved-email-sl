import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { DropdownOption } from '../DropdownOption/DropdownOption'
import { sortDropdown } from '../../redux/DropdownReducer'

export const DropdownList = () => {
  const { options } = useSelector((state) => state.dropdown)
  const dispatch = useDispatch()

  const onDragEnd = (result) => {
    if (!result.destination) return
    dispatch(sortDropdown(result))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="SL">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <h2 className="text-[#F5F5F5] text-[1.25rem] font-[Barlow] mb-[10px]">
              Dropdown Options
            </h2>
            {options.map((option, index) => (
              <DropdownOption key={index} index={index} veevaToken={option} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
