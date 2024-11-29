import { createSlice } from '@reduxjs/toolkit'
import { getURLParams } from '../util/URLParams'
import {
  setInitialDropdownOptions,
  setDropdownToken,
  validateDropdownOption,
  isValidDropdownToken,
} from '../util/dropdown'
import { getDropdownOptions } from 'veeva-approved-email-util/lib/tokens/dropdowns'
import { GRADE } from 'veeva-approved-email-util/lib/linting/grading'

const initialState = {}
const DEFAULT_VEEVA_TOKEN = '{{customText[]}}'
const BLANK_OPTION = {
  value: '',
  lint: {
    // grade: '',
    // message: '',
  },
}
const queryParams = getURLParams(new URL(window.location.href))

// No URL parameter is defined.
if (!queryParams.token) {
  initialState.veevaToken = DEFAULT_VEEVA_TOKEN
  initialState.options = [BLANK_OPTION]
}

// URL parameter is defined.
else if (isValidDropdownToken(queryParams.token)) {
  initialState.veevaToken = queryParams.token
  initialState.options = setInitialDropdownOptions(queryParams.token)
}

// URL parameter contains the wrong syntax.
else {
  initialState.veevaToken = queryParams.token
  initialState.options = []
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

      // Valid syntax.
      if (
        state.veevaToken.indexOf('{{customText[') === 0 &&
        state.veevaToken.substring(state.veevaToken.length - 3) === ']}}' &&
        state.veevaToken.match(/{{customText/g).length === 1
      ) {
        // Update array of dropdown options.
        const dropdownOptions = []
        const tokenOptions = getDropdownOptions(state.veevaToken)
        tokenOptions.forEach((tokenOption) => {
          const log = validateDropdownOption(tokenOption)

          dropdownOptions.push({
            value: tokenOption,
            lint:
              log.grade === GRADE.PASS
                ? {}
                : {
                    grade: log.grade,
                    message: log.message,
                  },
          })
        })
        state.options = dropdownOptions
      } else {
        state.options = []
      }
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
      // At least one dropdown option needs to be active.
      if (state.options.length === 1) return

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
