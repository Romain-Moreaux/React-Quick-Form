import React, { useEffect, useReducer, useCallback } from 'react'
import PropTypes from 'prop-types'
import withFormControl from './withFormControl'
import styles from './Form.module.css'
import Form from './Form'
// import { formIsInvalid } from './helpers'
import { newId } from '../../helpers'
import DefaultButton from './DefaultButton'
import { FiX } from 'react-icons/fi'
import { formIsInvalid } from './helpers'

const initialState = []

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      console.log('add =>', action.payload.item)
      return [...state, action.payload.item]

    case 'delete':
      console.log('delete =>', action.payload.id)
      return state.filter((item) => item.id !== action.payload.id)

    case 'onchange':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.value[action.payload.target.name] = action.payload.target.value
          item.validation = formIsInvalid(action.payload.context)
            ? 'error'
            : 'success'
        }
        console.log('onChange =>', item)
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
    formComponent: Form,
    buttonComponent: Button,
    moreLabel,
    setValue,
    model,
    label,
    ...restProps
  } = props
  // console.log('formgroup called', props)

  const [items, dispatch] = useReducer(reducer, initialState)
  // const [formIsValid, setFormIsValid] = useState()

  const newItem = useCallback(() => {
    // console.log('newItem called')
    let item = {}
    let valueUndefined
    Object.values(fields).forEach((name) => {
      item.value = { ...item.value, [name]: valueUndefined }
    })
    item.validation = null
    item.id = newId()
    return { item }
  }, [fields])

  // const onUpdate = useCallback(
  //   (context) => {
  //     console.log('onUpdate called')
  //     setValue(name, items, { model, context })
  //   },
  //   [items, model, name, setValue]
  // )

  const handleDispatch = (e, action) => {
    e.preventDefault()
    dispatch(action)
  }

  // const handleValidation = (fields) => {
  //   console.log('handleValidation')

  //   setFormIsValid(!formIsInvalid(fields))
  // }

  useEffect(() => {
    const onInitialLoad = () => {
      console.log('onInitialLoad called')
      dispatch({
        type: 'add',
        payload: newItem(fields),
      })
    }
    onInitialLoad()
  }, [newItem, fields])

  useEffect(() => {
    console.log('items changed', items)
    setValue(name, items, { model })
  }, [name, items, model, setValue])

  return (
    <>
      {items.map((item, index) => {
        return (
          <Form
            fields={fields}
            {...restProps}
            key={item.id}
            isFormGroup
            className={styles.group}
            // onChange={(e) => {
            //   handleDispatch(e, {
            //     type: 'onchange',
            //     payload: { id: item.id, target: e.target },
            //   })
            // }}
          >
            <legend className={styles.legend}>{label}</legend>
            {React.Children.map(children, (children) => {
              return React.cloneElement(
                children,
                { handleDispatch, item },
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
    </>
  )
}

FormGroup.defaultProps = {
  model: 'group',
  moreLabel: 'Add',
  formComponent: Form,
  buttonComponent: DefaultButton,
}
FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  moreLabel: PropTypes.string,
  model: PropTypes.oneOf(['group']),
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonComponent: PropTypes.elementType,
  formComponent: PropTypes.elementType,
}

export default withFormControl(FormGroup)
