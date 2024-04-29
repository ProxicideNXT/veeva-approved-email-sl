import { createSlice } from '@reduxjs/toolkit'
import vaeUtil from 'veeva-approved-email-util'

const validateDropdownOption = (option) => {
  return vaeUtil.lint.token.input.isValid({
    type: vaeUtil.lint.token.type.USER_INPUT,
    value: vaeUtil.buildDropdownToken([option]),
  })
}

const buildDropdownToken = (optionList) => {
  const options = []
  optionList.map((option) => {
    options.push(option.value)
  })
  return vaeUtil.buildDropdownToken(options)
}

const getDropdownOptions = (veevaToken) => {
  const dropdownOptions = []

  vaeUtil.getDropdownOptions(veevaToken).forEach((dropdownOption) => {
    const isValid = validateDropdownOption(dropdownOption)
    dropdownOptions.push({
      value: dropdownOption,
      error: isValid !== true ? isValid : {},
    })
  })

  return dropdownOptions
}

export const dropdownReducer = createSlice({
  name: 'DropdownOptions',
  initialState: {
    veevaToken: '{{customText[]}}',
    options: [],
  },
  reducers: {
    setVeevaToken: (state, action) => {
      state.veevaToken = action.payload

      if (state.veevaToken === '{{customText[]}}') {
        state.options = []
      } else if (
        state.veevaToken.indexOf('{{customText[') === 0 &&
        state.veevaToken.substring(state.veevaToken.length - 3) === ']}}'
      ) {
        // Check dropdown options....
        state.options = getDropdownOptions(state.veevaToken)
      } else {
        state.options = []
      }
    },
    sortDropdown: (state, action) => {
      const { source, destination } = action.payload
      const temp = state.options[source.index]
      state.options.splice(source.index, 1)
      state.options.splice(destination.index, 0, temp)
      state.veevaToken = buildDropdownToken(state.options)
    },
    updateDropdownOption: (state, action) => {
      const { index, value } = action.payload
      state.options[index].value = value

      const isValid = validateDropdownOption(value)
      if (isValid !== true) {
        state.options[index].error = isValid
      } else {
        state.options[index].error = {}
      }

      state.veevaToken = buildDropdownToken(state.options)
    },
    addDropdownOption: (state, action) => {
      // state.options.splice(0, 0, '')
      state.options.splice(0, 0, {
        value: '',
        error: {},
      })
      state.veevaToken = buildDropdownToken(state.options)
    },
    removeDropdownOption: (state, action) => {
      state.options.splice(action.payload, 1)

      if (state.options.length > 0) {
        state.veevaToken = buildDropdownToken(state.options)
      } else {
        state.veevaToken = '{{customText[]}}'
      }
    },
  },
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
