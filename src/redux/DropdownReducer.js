import { createSlice } from '@reduxjs/toolkit'
import { getURLParams } from '../util/URLParams'
import { setInitialDropdownOptions, setDropdownToken, validateDropdownOption } from '../util/dropdown'
import { getDropdownOptions } from 'veeva-approved-email-util/lib/tokens/dropdowns';
import { GRADE } from 'veeva-approved-email-util/lib/linting/grading';

const queryParams = getURLParams(new URL(window.location.href));
const BLANK_OPTION = {
  value: '',
  lint: {
    // grade: '',
    // message: '',
  },
}

const initialState = {
  veevaToken: !queryParams.token ? '{{customText[]}}' : queryParams.token,
  options: !queryParams.token ? [BLANK_OPTION] : setInitialDropdownOptions(queryParams.token),
}

export const dropdownReducer = createSlice({
  name: 'DropdownOptions',
  initialState,
  reducers: {
    sortDropdown: (state, action) => {
      const { source, destination } = action.payload
      const temp = state.options[source.index]
      state.options.splice(source.index, 1)
      state.options.splice(destination.index, 0, temp)
      state.veevaToken = setDropdownToken(state.options)
    },
    updateVeevaToken: (state, action) => {
      // Update Veeva token.
      state.veevaToken = action.payload

      // Update array of dropdown options.
      const dropdownOptions = []
      const tokenOptions = getDropdownOptions(state.veevaToken)
      tokenOptions.forEach(tokenOption => {
        const log = validateDropdownOption(tokenOption)

        dropdownOptions.push({
          value: tokenOption,
          lint: log.grade === GRADE.PASS ? {} : {
            grade: log.grade,
            message: log.message,
          },
        })
      })
      state.options = dropdownOptions
    },
    updateDropdownOption: (state, action) => {
      const { index, value } = action.payload

      // Update text area form input.
      const dropdownOption = state.options[index]
      dropdownOption.value = value
      
      // Lint dropdown option.
      const results = validateDropdownOption(value)
      dropdownOption.lint = {
        grade: results.grade,
        message: results.message,
      }

      // Build Veeva dropdown token.
      state.veevaToken = setDropdownToken(state.options)
    },
    addDropdownOption: (state, action) => {
      state.options.push(BLANK_OPTION)
      state.veevaToken = setDropdownToken(state.options)
    },
    removeDropdownOption: (state, action) => {
      state.options.splice(action.payload, 1)

      if (state.options.length > 0) {
        state.veevaToken = setDropdownToken(state.options)
      } else {
        state.veevaToken = ''
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  sortDropdown,
  updateVeevaToken,
  updateDropdownOption,
  addDropdownOption,
  removeDropdownOption,
} = dropdownReducer.actions

export default dropdownReducer.reducer
