import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import withFormControl from './withFormControl'
import styles from './Form.module.css'
import Form from './Form'
import { formIsInvalid } from './helpers'

const initialState = []
const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      console.log('add', action)
      return [...state, action.payload.item]

    case 'delete':
      console.log('delete', action.payload.id)
      return state.filter((item) => item.id !== action.payload.id)

    case 'onchange':
      console.log('onchange', action.payload.id, action.payload.target)
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item[action.payload.target.name] = action.payload.target.value
        }
        return item
      })

    default:
      return state
  }
}
function FormGroup(props) {
  const {
    name,
    children,
    fields,
    component: Component,
    setValue,
    model,
    groupLabel,
  } = props
  console.log('FormGroup called', props)

  const [items, dispatch] = useReducer(reducer, initialState)

  const createItem = () => {
    let item = {}
    Object.values(fields).forEach((name) => {
      item[name] = undefined
    })
    item.id = generateItemId()
    return item
  }

  useEffect(() => {
    const runOnInitialLoad = () => {
      console.log('runOnInitialLoad')
      dispatch({
        type: 'add',
        payload: { item: createItem(fields) },
      })
    }
    runOnInitialLoad()
  }, [])

  function generateItemId() {
    return (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10)
  }

  const handleDispatch = (e, action) => {
    e.preventDefault()
    dispatch(action)
  }

  const handleValidation = (fields) => {
    return formIsInvalid(fields)
  }

  return (
    <div>
      {items.map((item) => {
        return (
          <Component
            fields={fields}
            key={item.id}
            isFormGroup
            className={styles.formGroup}
            onChange={(e) => {
              handleDispatch(e, {
                type: 'onchange',
                payload: { id: item.id, target: e.target },
              })
              setValue(name, items, { model })
            }}
          >
            <legend className={styles.legend}>{groupLabel}</legend>

            {/* {children} */}
            {React.Children.map(children, (children, index) => {
              return React.cloneElement(
                children,
                { handleValidation },
                { ...children }
              )
            })}
            <button
              onClick={(e) =>
                handleDispatch(e, { type: 'delete', payload: { id: item.id } })
              }
            >
              Delete
            </button>
          </Component>
        )
      })}
      <button
        onClick={(e) =>
          handleDispatch(e, {
            type: 'add',
            payload: { item: createItem(fields) },
          })
        }
      >
        Add
      </button>
    </div>
  )
}

FormGroup.defaultProps = {
  model: 'formGroup',
  component: Form,
}
FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['formGroup']),
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(FormGroup)
