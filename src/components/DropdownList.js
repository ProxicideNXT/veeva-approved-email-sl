import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { DropdownOption } from './DropdownOption'
import { sortDropdown } from '../redux/DropdownReducer'

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
            {options.map((option, index) => (
              <DropdownOption
                key={index}
                index={index}
                text={option} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
