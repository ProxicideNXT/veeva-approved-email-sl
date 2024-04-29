import { configureStore } from '@reduxjs/toolkit'
import DropdownReducer from './DropdownReducer'

export default configureStore({
  reducer: {
    dropdown: DropdownReducer,
  },
})
