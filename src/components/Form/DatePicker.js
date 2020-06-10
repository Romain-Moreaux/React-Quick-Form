import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './Form.module.css'
import withFormControl from './withFormControl'
import DefaultInput from './DefaultInput'

const DatePicker = (props) => {
  const { name, value, min, max, model, setValue, component: Component } = props
  // console.log('DatePicker', props)

  const handleSetValue = (e) => {
    const { name, value } = e.target
    setValue(name, value, { model })
  }

  return (
    <div className={styles.field}>
      <Component
        name={name}
        type="date"
        min={min}
        max={max}
        handleSetValue={handleSetValue}
        value={value}
      />
    </div>
  )
}

DatePicker.defaultProps = {
  model: 'date',
  component: DefaultInput,
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
