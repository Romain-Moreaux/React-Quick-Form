export function initiateFormFields(fieldNames = [], required = []) {
  let valueUndefined
  return fieldNames.reduce(
    (acc, field) => ({
      ...acc,
      [field]: {
        value: valueUndefined,
        validation: null,
        required: required.includes(field),
        help: null,
      },
    }),
    {}
  )
}

export function processField(
  name,
  value,
  required,
  options = {},
  validationTexts = {}
) {
  const {
    model,
    min,
    forcePreviousCheck,
    customValidationFunction,
    fieldConfirm,
  } = options
  // console.log('processField', validationTexts)

  // If the value is an array, remove its empty values for safety.
  const processedValue = Array.isArray(value)
    ? value.filter(
        (item) =>
          Number.isInteger(item) || item instanceof Object || item.length
      )
    : value

  let validation = null,
    passwordStrength = null,
    help = null

  // VALIDATION - If any check will fail, raise error state and set help message.
  if (required && (!processedValue || processedValue.length === 0)) {
    // If the field is required and its value is empty, set an error.
    validation = 'error'
    help = validationTexts.requiredField
  } else if (processedValue && processedValue.length > 0) {
    // If forcePreviousCheck is present, skip further validation.
    if (
      forcePreviousCheck &&
      typeof forcePreviousCheck.validation === 'string' &&
      typeof forcePreviousCheck.help === 'string'
    ) {
      console.log('forcePreviousCheck', forcePreviousCheck)
      return {
        [name]: {
          value: processedValue,
          validation: forcePreviousCheck.validation,
          required,
          help: forcePreviousCheck.help,
        },
      }
    }
    // Each case has a validation rule
    switch (model) {
      case 'email':
        if (!isEmail(value)) {
          validation = 'error'
          help = validationTexts.emailInvalid
        }
        break
      case 'passwordCreate':
        // Get a password rank and a helptext based on user inputs.
        let { rank, helpText, isValid } = rankPassword(value)
        console.log('password rank =>', rank, 'valid:', isValid)
        passwordStrength = rank
        if (!isValid) {
          validation = 'error'
          help = helpText
        }
        break
      case 'tel':
        // A améliorer
        if (
          !value.match(
            /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g
          )
        ) {
          validation = 'error'
          help = validationTexts.phoneInvalid
        }
        break

      case 'confirmator':
        if (value !== fieldConfirm.value) {
          validation = 'error'
          help = validationTexts.fieldConfirmInvalid.replace(
            ':field:',
            fieldConfirm.name
          )
        }
        break
      default:
        // A améliorer
        // Handle custom validation function.
        if (model && customValidationFunction) {
          const error = (() => {
            console.log('customValidationFunctiont called from helpers')
            return customValidationFunction(value, model)
          })()

          if (error) {
            validation = 'error'
            help = error
          }
        }

        // Minimal length shouldn't take precedence over main types check
        if (min && processedValue.length < min) {
          validation = 'error'
          help = validationTexts.minChars.replace(':length:', min)
        }
        break
    }
  }

  // If there is no error and value is not empty, indicate success state.
  if (
    validation !== 'error' &&
    ((processedValue && processedValue.length > 0) ||
      (typeof value === 'object' && !Array.isArray(value)))
  ) {
    validation = 'success'
    help = validationTexts.fieldValid
  }

  return {
    [name]: {
      value: processedValue,
      validation,
      required,
      help,
      ...(() => passwordStrength && { passwordStrength })(),
    },
  }
}

/**
 * Reset valdiation states of all fields in a form.
 */
export function updateFieldsRequirements(fieldsData, required) {
  console.log('updateFieldsRequirements', arguments)

  let updatedFieldsData = {}
  Object.keys(fieldsData).forEach((key) => {
    const { value, help } = fieldsData[key]
    const isRequired = required.includes(key)
    updatedFieldsData[key] = {
      value,
      // If the field is not on required anymore, validation must be cleaned up.
      validation:
        fieldsData[key].validation === 'error' && !isRequired
          ? null
          : fieldsData[key].validation,
      help,
      required: isRequired,
    }
  })
  return updatedFieldsData
}

/**
 * Check whether whole form is filled correctly.
 */
export function formIsInvalid(fieldsData, fieldKeys = []) {
  console.log('formIsInvalid', fieldsData, fieldKeys)
  // Check only fields of given keys, otherwise check whole form.
  const fieldsToCheck = fieldKeys.length ? fieldKeys : Object.keys(fieldsData)
  let requiredButEmpty = false
  let hasAnyError = false

  fieldsToCheck.forEach((key) => {
    const { value, validation, required } = fieldsData[key]
    if (
      required &&
      (typeof value === 'undefined' ||
        (typeof value === 'string' && value === '') ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' &&
          !Array.isArray(value) &&
          (value === null || !Object.keys(value).length)))
    ) {
      console.log('required but empty')
      requiredButEmpty = true
    }
    if (validation === 'error') {
      console.log('has any error')
      hasAnyError = true
    }
  })

  return requiredButEmpty || hasAnyError
}

/**
 * Get values from all fields and organize them into API friendly format.
 */
export function getValues(fieldsData) {
  let values = {}
  Object.keys(fieldsData).forEach((key) => {
    values[key] = fieldsData[key].value
  })

  return values
}

export function getErrorFields(fieldsData) {
  let errorFields = []
  Object.keys(fieldsData).forEach((key) => {
    fieldsData[key].validation === 'error' && errorFields.push(key)
  })

  return errorFields
}

const isEmail = (value) => {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(value).toLowerCase())
}

const rankPassword = (value) => {
  let upper = /[A-Z]/,
    length = /^[\s\S]{8,16}$/,
    lower = /[a-z]/,
    number = /[0-9]/,
    special = /[^A-Za-z0-9]/,
    threeAdjacent = /([\s\S])\1\1/,
    twoAdjacent = /([\s\S])\1/,
    minLength = 8,
    score = 0,
    rank,
    helpText = 'Your password should contain: ',
    isValid

  const rules = {
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    hasTwoAdjacent: false,
    hasThreeAdjacent: false,
    hasMinimumRules: false,
    hasRequiredLength: false,
  }

  // Add 1pt for each conditions fulfilled
  if (upper.test(value)) {
    rules.hasUpper = true
    score++
  }
  if (lower.test(value)) {
    rules.hasLower = true
    score++
  }
  if (number.test(value)) {
    rules.hasNumber = true
    score++
  }
  if (special.test(value)) {
    rules.hasSpecial = true
    score++
  }

  // Remove 1pt if there'isnt at least 3 conditions fulfilled
  if (score < 3) score--
  else rules.hasMinimumRules = true

  // Remove 1pt if shorter than 8 chars
  if (value.length < 8) score--

  // Remove 1pt if there is 2 duplicate adjacent chars
  if (twoAdjacent.test(value)) {
    // console.log('2 identiques')
    rules.hasTwoAdjacent = true
    score--
  }

  // Remove 1pt if there is 3 duplicate adjacent chars
  if (threeAdjacent.test(value)) {
    // console.log('3 identiques')
    rules.hasThreeAdjacent = true
    score--
  }

  // if has required length
  if (length.test(value)) {
    // console.log('has required length')
    rules.hasRequiredLength = true
  }

  // add 1pt every 2 chars when min length successful
  if (value.length > minLength + 1) {
    score += Math.floor((value.length - minLength) / 2)
    // console.log('superieur', value.length, score)
  }

  if (!rules.hasRequiredLength) {
    helpText += '8-16 characters'
  }

  if (!rules.hasMinimumRules) {
    helpText += String.raw`
    ${!rules.hasUpper ? '1 upper' : ''}
    ${!rules.hasLower ? '1 lower' : ''}
    ${!rules.hasNumber ? '1 number' : ''}
    ${!rules.hasSpecial ? '1 special character' : ''}`
  }

  isValid = rules.hasMinimumRules && rules.hasRequiredLength

  // console.log('score', score)

  // Define a ranking based on the calculated score
  if (score < 3) rank = 'weak'
  else if (score < 4) rank = 'medium'
  else if (score < 6) rank = 'strong'
  else rank = 'very strong'

  return { rank, helpText, isValid }
}
