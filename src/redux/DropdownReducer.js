import { createSlice } from '@reduxjs/toolkit'
import rteUtil from 'veeva-approved-email-util'

export const dropdownReducer = createSlice({
  name: 'DropdownOptions',
  initialState: {
    veevaToken: "{{customText[]}}",
    options: [],
  },
  reducers: {
    setVeevaToken: (state, action) => {
      state.veevaToken = action.payload
      
      if (state.veevaToken === "{{customText[]}}") {
        state.options = []
      } else if (state.veevaToken.indexOf("{{customText[") === 0 && state.veevaToken.substring(state.veevaToken.length - 3) === "]}}") {
        state.options = rteUtil.getDropdownOptions(state.veevaToken)
      } else {
        state.options = []
      }
    },
    sortDropdown: (state, action) => {
      const {source, destination} = action.payload
      const temp = state.options[source.index]
      state.options.splice(source.index, 1)
      state.options.splice(destination.index, 0, temp)
      state.veevaToken = rteUtil.buildDropdownToken(state.options)
    },
    updateDropdownOption: (state, action) => {
      const {index, value} = action.payload
      state.options[index] = value
      state.veevaToken = rteUtil.buildDropdownToken(state.options)
    },
    addDropdownOption: (state, action) => {
      state.options.splice(0,0,"")
      state.veevaToken = rteUtil.buildDropdownToken(state.options)
    },    
    removeDropdownOption: (state, action) => {
      state.options.splice(action.payload, 1)

      if (state.options.length > 0) {
        state.veevaToken = rteUtil.buildDropdownToken(state.options)
      } else {
        state.veevaToken = "{{customText[]}}"
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setVeevaToken,
  sortDropdown,
  updateDropdownOption,
  addDropdownOption,
  removeDropdownOption,
} = dropdownReducer.actions

export default dropdownReducer.reducer