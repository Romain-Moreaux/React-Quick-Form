import React from 'react'
import { withFormControl } from '.'
import PropTypes from 'prop-types'
import styles from './Form.module.css'
import { FiFileText } from 'react-icons/fi'
import DefaultInput from './DefaultInput'

function Text(props) {
  const {
    name,
    value,
    placeholder,
    component: Component,
    model,
    setValue,
  } = props
  // console.log('Text', props)

  return (
    <div className={styles.field}>
      <Component
        className={styles.input}
        name={name}
        value={value}
        placeholder={placeholder}
        model={model}
        setValue={setValue}
        type="text"
      />
      <span className={styles.fieldIcon}>{<FiFileText />}</span>
    </div>
  )
}

Text.defaultProps = {
  component: DefaultInput,
  model: 'text',
}

Text.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['text']),
  value: PropTypes.any,
  placeholder: PropTypes.node,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(React.memo(Text))
