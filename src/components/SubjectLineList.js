import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { SubjectLine } from './SubjectLine'
import { sortDropdown, addDropdownOption } from '../redux/DropdownReducer'

export const SubjectLineList = () => {
  const { options } = useSelector((state) => state.dropdown)
  const dispatch = useDispatch()

  const onDragEnd = (result) => {
    if (!result.destination) return
    dispatch(sortDropdown(result))
  }

  const onAddSubjectLine = (e) => {
    dispatch(addDropdownOption())
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <button
        className="rounded-md	bg-[#008fd2] text-white p-[15px] mb-[15px] outline-[#F2613F]"
        onClick={onAddSubjectLine}
      >
        Add option
      </button>

      <Droppable droppableId="SL">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {options.map((option, index) => (
              <SubjectLine
                key={index}
                index={index}
                text={option}
              ></SubjectLine>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
