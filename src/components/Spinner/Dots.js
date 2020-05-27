import React from 'react'
import PropTypes from 'prop-types'
import { useSpinnerStyles } from './useStyles'

export function Dots(props) {
  const { size } = props

  const spinnerCls = useSpinnerStyles({
    size,
  })

  return <div className={spinnerCls.loader} />
}

Dots.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string,
}

Dots.defaultProps = {
  size: 'md',
}
