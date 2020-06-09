import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './Form.module.css'
import withFormControl from './withFormControl'

const DatePicker = (props) => {
  const { name, value, min, max, model, setValue } = props
  // console.log('DatePicker', props)

  const handleSetValue = (e) => {
    const { name, value } = e.target
    setValue(name, value, { model })
  }

  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        name={name}
        type="date"
        min={min}
        max={max}
        onChange={handleSetValue}
        onBlur={handleSetValue}
        value={value}
      />
    </div>
  )
}

DatePicker.defaultProps = {
  model: 'date',
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['date']),
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
}

export default withFormControl(React.memo(DatePicker))
