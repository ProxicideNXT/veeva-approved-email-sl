const {
  getDropdownOptions,
  buildDropdownToken,
} = require('veeva-approved-email-util/lib/tokens/dropdowns')
const {
  CATEGORY_TYPES,
  isTokenUserInputCategory,
} = require('veeva-approved-email-util/lib/tokens/category')
const {
  lint,
} = require('veeva-approved-email-util/lib/linting/token/user-input')
const { GRADE } = require('veeva-approved-email-util/lib/linting/grading')

const isValidDropdownToken = (veevaToken) => {
  const tokenStart = veevaToken.substring(0, 2)
  const tokenEnd = veevaToken.split('').reverse().join('').substring(0, 3)

  if (
    tokenStart === '{{' &&
    tokenEnd === '}}]' &&
    isTokenUserInputCategory(veevaToken)
  ) {
    return true
  } else {
    return false
  }
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
      lint:
        log.grade === GRADE.PASS
          ? {}
          : {
              grade: log.grade,
              message: log.message,
            },
    })
  })

  return dropdownOptions
}

module.exports = {
  isValidDropdownToken,
  validateDropdownOption,
  setDropdownToken,
  setInitialDropdownOptions,
}
