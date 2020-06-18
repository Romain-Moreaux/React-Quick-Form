import React, { useEffect, useReducer, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import withFormControl from './withFormControl'
import styles from './Form.module.css'
import Form from './Form'
import { newId, concatClasses } from '../../helpers'
import DefaultButton from './DefaultButton'
import { FiX } from 'react-icons/fi'

const initialState = []

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload.item]

    case 'delete':
      return state.filter((item) => item.id !== action.payload.id)

    case 'onchange':
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
    css,
    formComponent: Form,
    buttonComponent: Button,
    moreLabel,
    setValue,
    model,
    label,
    helptext,
    ...restProps
  } = props
  console.log('formgroup called', props)

  let isInitialised = useRef()

  const [items, dispatch] = useReducer(reducer, initialState)

  const newItem = useCallback(() => {
    console.log('newItem called')
    let item = {}
    let valueUndefined
    Object.values(fields).forEach((name) => {
      item[name] = valueUndefined
    })
    item.id = newId()
    return { item }
  }, [fields])

  const handleUpdate = (fieldsData) => {
    console.log('handleUpdate called')
    setValue(name, items, { model, fieldsData })
  }
  // const handleUpdate = useCallback(
  //   (fieldsData) => {
  //     console.log('handleUpdate called')
  //     setValue(name, items, { model, fieldsData })
  //   },
  //   [items, model, name, setValue]
  // )

  const handleDispatch = (e, action) => {
    e.preventDefault()
    dispatch(action)
  }

  // Add 1 item at the first render only
  useEffect(() => {
    const onInitialLoad = () => {
      console.log('onInitialLoad called')
      dispatch({
        type: 'add',
        payload: newItem(fields),
      })
      return true
    }
    if (!isInitialised.current) {
      isInitialised.current = onInitialLoad()
    }
  }, [newItem, fields])

  return (
    <div className={styles.formGroup}>
      {items.map((item, index) => {
        return (
          <Form
            fields={fields}
            {...restProps}
            key={item.id}
            component="fieldset"
            className={concatClasses([styles.fieldset, css])}
            onChange={(e) => {
              handleDispatch(e, {
                type: 'onchange',
                payload: { id: item.id, target: e.target },
              })
            }}
          >
            <legend className={styles.legend}>{label}</legend>
            {React.Children.map(children, (children) => {
              return React.cloneElement(
                children,
                { handleUpdate },
                { ...children }
              )
            })}
            {index !== 0 ? (
              <Button
                css={`
                  ${styles.btnRemove} ${styles.btnAction}
                `}
                onClick={(e) =>
                  handleDispatch(e, {
                    type: 'delete',
                    payload: { id: item.id },
                  })
                }
              >
                <FiX />
              </Button>
            ) : null}
            {helptext && <span className={styles.help}>{helptext}</span>}
          </Form>
        )
      })}
      <Button
        css={`
          ${styles.btnAction} ${styles.btnAdd}
        `}
        onClick={(e) =>
          handleDispatch(e, {
            type: 'add',
            payload: newItem(fields),
          })
        }
      >
        {moreLabel}
      </Button>
    </div>
  )
}

FormGroup.defaultProps = {
  model: 'formGroup',
  moreLabel: 'Add',
  formComponent: Form,
  buttonComponent: DefaultButton,
}
FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  moreLabel: PropTypes.string,
  model: PropTypes.oneOf(['formGroup']),
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonComponent: PropTypes.elementType,
  formComponent: PropTypes.elementType,
}

export default withFormControl(FormGroup)
