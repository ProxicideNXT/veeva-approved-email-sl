import { createSlice } from '@reduxjs/toolkit'
import { getDropdownOptions, buildDropdownToken } from 'veeva-approved-email-util/lib/tokens/dropdowns'
import { CATEGORY_TYPES } from 'veeva-approved-email-util/lib/tokens/category'
import { lint } from 'veeva-approved-email-util/lib/linting/token/user-input'
import { getURLParams } from '../util/URLParams'
import { GRADE } from 'veeva-approved-email-util/lib/linting/grading'

const queryParams = getURLParams(new URL(window.location.href));
const BLANK_OPTION = {
  value: '',
  lint: {
    // grade: '',
    // message: '',
  },
}

const validateDropdownOption = (dropdownOptionValue) => {
  return lint({
    category: CATEGORY_TYPES.USER_INPUT,
    token: buildDropdownToken([dropdownOptionValue]),
  })
}

const setDropdownToken = (optionList) => {
  const options = []
  optionList.map((option) => {
    options.push(option.value)
  })
  return buildDropdownToken(options)
}

const setInitialDropdownOptions = (veevaToken) => {
  const dropdownOptions = []

  getDropdownOptions(veevaToken).forEach((dropdownOption) => {
    const log = validateDropdownOption(dropdownOption)
    dropdownOptions.push({
      value: dropdownOption,
      lint: log.grade === GRADE.PASS ? {} : {
        grade: log.grade,
        message: log.message,
      },
    })
  })

  return dropdownOptions
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
    updateDropdownOption: (state, action) => {
      const { index, value } = action.payload

      // Update text area form input.
      const dropdownOption = state.options[index]
      dropdownOption.value = value
      
      // Validate dropdown option.
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
  updateDropdownOption,
  addDropdownOption,
  removeDropdownOption,
} = dropdownReducer.actions

export default dropdownReducer.reducer
