import React, { useEffect, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import withFormControl from './withFormControl'
import styles from './Form.module.css'
import Form, { FieldsContext } from './Form'
// import { formIsInvalid } from './helpers'
import { newId } from '../../helpers'
import DefaultButton from './DefaultButton'
import { FiX } from 'react-icons/fi'
import { formIsInvalid } from './helpers'

const reducer = (state, action) => {
  console.log('reducer', state)
  switch (action.type) {
    case 'add':
      console.log('dispatch add()', action.payload)
      return [...state, action.payload.item]

    case 'delete':
      console.log('dispatch delete()', action.payload.id)
      return state.filter((item) => item.id !== action.payload.id)

    case 'onchange':
      console.log('dispatch onchange()', state, action.payload)
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.value[action.payload.target.name] = action.payload.target.value
          item.validation = formIsInvalid(action.payload.context)
            ? 'error'
            : 'success'
        }
        return item
      })

    default:
      return state
  }
}

// pb validation du formulaire a la creation d'un nouvel item, ce qui passe le state validation en 'success'.
// Les states  remontees sont bonnes et la structure aussi, le pb doit venir d'un composant fils.

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
  // console.log('<Formgroup />', props)
  const context = useContext(FieldsContext)

  const newItem = () => {
    // console.log('newItem called')
    let item = {}
    let valueUndefined
    Object.values(fields).forEach((name) => {
      item.value = { ...item.value, [name]: valueUndefined }
    })
    item.validation = null
    item.id = newId()
    return item
  }

  // third argument is the lazy state, it return an array of 1 object
  const [items, dispatch] = useReducer(reducer, null, () => [newItem()])

  const handleDispatch = (e, action) => {
    e.preventDefault()
    dispatch(action)
  }

  useEffect(() => {
    console.log('items changed')
    setValue(name, items, { model })
  }, [items])

  return (
    <>
      {items?.map((item, index) => {
        return (
          <Form
            fields={fields}
            {...restProps}
            key={item.id}
            isFormGroup
            className={styles.group}
            // onChange={(e) => {
            //   console.log(' <Group /> changed', items)
            //   // setValue(
            //   //   name,
            //   //   handleDispatch(e, {
            //   //     type: 'onchange',
            //   //     payload: {
            //   //       id: item.id,
            //   //       target: e.target,
            //   //       context,
            //   //     },
            //   //   }),
            //   //   { model }
            //   // )
            //   // setValue(name, items, { model })
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
            {index !== 0 && (
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
            )}
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
            payload: { item: newItem(fields) },
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
