import React, { useEffect, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import Form from './Form'
import DefaultButton from './DefaultButton'
import styles from './Form.module.css'
import { newId } from '../../helpers'
import { initiateFormFields } from './helpers'
import { FiX } from 'react-icons/fi'

const reducer = (state, action) => {
  console.log('reducer', state)
  switch (action.type) {
    case 'add':
      console.log('dispatch add()', action.payload)
      return [...state, action.payload.item]

    case 'delete':
      console.log('dispatch delete()', action)
      return state.filter((item, index) => item.id !== action.payload.id)

    case 'onchange':
      console.log('dispatch onchange()', state, action.payload)
      break

    default:
      return state
  }
}

function FormGroup(props) {
  // console.log('<Formgroup />', props)

  const {
    component: Component,
    children,
    label,
    name,
    moreLabel,
    fields,
    buttonComponent: ButtonComponent,
    ...restProps
  } = props

  const newItem = (fields) => {
    let item = {
      group: fields,
      id: newId(),
    }

    console.log('newItem', item)
    return item
  }

  // third argument is the lazy state, it return an array of 1 object
  const [items, dispatch] = useReducer(reducer, null, () => [newItem(fields)])

  const handleDispatch = (e, action) => {
    e.preventDefault()
    dispatch(action)
  }

  const handleChange = (e) => {
    console.log('handleChange', e)
  }

  console.log('items', items)
  return (
    <>
      {items?.map((item, index) => {
        console.log('item', item)
        return (
          <Component
            isFormGroup
            fields={fields}
            className={styles.group}
            key={item.id}
            {...restProps}
            onChange={handleChange}
          >
            {children}
            {index !== 0 && (
              <ButtonComponent
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
              </ButtonComponent>
            )}
          </Component>
        )
      })}
      <ButtonComponent
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
      </ButtonComponent>
    </>
  )
}

FormGroup.defaultProps = {
  model: 'group',
  moreLabel: 'Add',
  component: Form,
  buttonComponent: DefaultButton,
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  moreLabel: PropTypes.string,
  model: PropTypes.oneOf(['group']),
  children: PropTypes.node.isRequired,
  buttonComponent: PropTypes.elementType,
  component: PropTypes.elementType,
  fields: PropTypes.array,
  allRequired: PropTypes.bool,
}

export default FormGroup
