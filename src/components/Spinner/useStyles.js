import { createUseStyles } from 'react-jss'
import { hexToRgb } from '../../helpers'

export const sizes = {
  sm: 5,
  md: 8,
  lg: 12,
}

const colorAnimation = hexToRgb('#ffffff')

export const useSpinnerStyles = createUseStyles({
  loader: (props) => ({
    marginRight: '1.8rem',
    borderRadius: '50%',
    width: sizes[props.size],
    height: sizes[props.size],
    fontSize: sizes[props.size],
    animation: '$dots 1.1s infinite ease',
  }),
  '@keyframes dots': {
    '0%,100%': {
      boxShadow: `0em -2.6em 0em 0em rgb(${colorAnimation}),
      1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2),
      2.5em 0em 0 0em rgba(${colorAnimation}, 0.2),
      1.75em 1.75em 0 0em rgba(${colorAnimation}, 0.2),
      0em 2.5em 0 0em rgba(${colorAnimation}, 0.2),
      -1.8em 1.8em 0 0em rgba(${colorAnimation}, 0.2),
      -2.6em 0em 0 0em rgba(${colorAnimation}, 0.5),
      -1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.7)`,
    },
    '12.5%': {
      boxShadow: `0em -2.6em 0em 0em rgba(${colorAnimation}, 0.7),
        1.8em -1.8em 0 0em rgb(${colorAnimation}), 2.5em 0em 0 0em rgba(${colorAnimation}, 0.2),
        1.75em 1.75em 0 0em rgba(${colorAnimation}, 0.2),
        0em 2.5em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em 1.8em 0 0em rgba(${colorAnimation}, 0.2),
        -2.6em 0em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.5)`,
    },
    '25%': {
      boxShadow: `0em -2.6em 0em 0em rgba(${colorAnimation}, 0.5),
        1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.7), 2.5em 0em 0 0em rgb(${colorAnimation}),
        1.75em 1.75em 0 0em rgba(${colorAnimation}, 0.2),
        0em 2.5em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em 1.8em 0 0em rgba(${colorAnimation}, 0.2),
        -2.6em 0em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2)`,
    },
    '37.5%': {
      boxShadow: `0em -2.6em 0em 0em rgba(${colorAnimation}, 0.2),
        1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.5),
        2.5em 0em 0 0em rgba(${colorAnimation}, 0.7), 1.75em 1.75em 0 0em rgb(${colorAnimation}),
        0em 2.5em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em 1.8em 0 0em rgba(${colorAnimation}, 0.2),
        -2.6em 0em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2)`,
    },
    '50%': {
      boxShadow: `0em -2.6em 0em 0em rgba(${colorAnimation}, 0.2),
        1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2),
        2.5em 0em 0 0em rgba(${colorAnimation}, 0.5),
        1.75em 1.75em 0 0em rgba(${colorAnimation}, 0.7), 0em 2.5em 0 0em rgb(${colorAnimation}),
        -1.8em 1.8em 0 0em rgba(${colorAnimation}, 0.2),
        -2.6em 0em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2)`,
    },
    '62.5%': {
      boxShadow: `0em -2.6em 0em 0em rgba(${colorAnimation}, 0.2),
        1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2),
        2.5em 0em 0 0em rgba(${colorAnimation}, 0.2),
        1.75em 1.75em 0 0em rgba(${colorAnimation}, 0.5),
        0em 2.5em 0 0em rgba(${colorAnimation}, 0.7), -1.8em 1.8em 0 0em rgb(${colorAnimation}),
        -2.6em 0em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2)`,
    },
    '75%': {
      boxShadow: `0em -2.6em 0em 0em rgba(${colorAnimation}, 0.2),
        1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2),
        2.5em 0em 0 0em rgba(${colorAnimation}, 0.2),
        1.75em 1.75em 0 0em rgba(${colorAnimation}, 0.2),
        0em 2.5em 0 0em rgba(${colorAnimation}, 0.5),
        -1.8em 1.8em 0 0em rgba(${colorAnimation}, 0.7), -2.6em 0em 0 0em rgb(${colorAnimation}),
        -1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2)`,
    },
    '87.5%': {
      boxShadow: `0em -2.6em 0em 0em rgba(${colorAnimation}, 0.2),
        1.8em -1.8em 0 0em rgba(${colorAnimation}, 0.2),
        2.5em 0em 0 0em rgba(${colorAnimation}, 0.2),
        1.75em 1.75em 0 0em rgba(${colorAnimation}, 0.2),
        0em 2.5em 0 0em rgba(${colorAnimation}, 0.2),
        -1.8em 1.8em 0 0em rgba(${colorAnimation}, 0.5),
        -2.6em 0em 0 0em rgba(${colorAnimation}, 0.7), -1.8em -1.8em 0 0em rgb(${colorAnimation})`,
    },
  },
})
