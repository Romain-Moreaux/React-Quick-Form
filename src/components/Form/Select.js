import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './Form.module.css'
import withFormControl from './withFormControl'
import { FiChevronDown } from 'react-icons/fi'
import { concatClasses } from '../../helpers'

const Select = (props) => {
  const { name, value, model, options, setValue } = props
  // console.log('Select', props)

  const handleSetValue = (e) => {
    const { name, value } = e.target
    setValue(name, value, { model })
  }

  return (
    <div className={styles.field}>
      <select
        className={concatClasses([styles.input, styles.select])}
        name={name}
        onChange={handleSetValue}
        onBlur={handleSetValue}
        value={value}
      >
        <option value="">Select a choice</option>
        {options.map((option, index) => (
          <option
            key={index}
            value={typeof option === 'string' ? option : option.label}
          >
            {typeof option === 'string' ? option : option.label}
          </option>
        ))}
      </select>
      <span className={styles.fieldIcon}>{<FiChevronDown />}</span>
    </div>
  )
}

Select.defaultProps = {
  model: 'select',
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['select']),
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ label: PropTypes.node, value: PropTypes.string }),
    ])
  ),
}

export default withFormControl(React.memo(Select))
