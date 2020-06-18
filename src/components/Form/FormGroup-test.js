import React, {
  useEffect,
  useReducer,
  useState,
  useCallback,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import withFormControl from './withFormControl'
import styles from './Form.module.css'
import Form, { FormConsumer } from './Form'
import { formIsInvalid } from './helpers'
import { newId } from '../../helpers'
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
    formComponent: Form,
    buttonComponent: Button,
    moreLabel,
    // setValue,
    model,
    label,
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

  const handleDispatch = (e, action) => {
    e.preventDefault()
    dispatch(action)
  }

  // Add 1 item at the first render only
  // useEffect(() => {
  //   const onInitialLoad = () => {
  //     console.log('onInitialLoad called')
  //     dispatch({
  //       type: 'add',
  //       payload: newItem(fields),
  //     })
  //     return true
  //   }
  //   if (!isInitialised.current) {
  //     isInitialised.current = onInitialLoad()
  //   }
  // }, [newItem, fields])

  const handleUpdate = useCallback(
    (fieldsData, setValue) => {
      console.log('handleUpdate called', fieldsData, setValue)
      setValue(name, items, { model, fieldsData })
    },
    [items, model, name]
  )

  const GroupComponent = (props) => {
    console.log('groupComponent', props)
    const { item, index, ...restProps } = props
    return (
      <Form {...restProps}>
        <legend className={styles.legend}>{label}</legend>
        {/* {React.Children.map(children, (children) => {
          return React.cloneElement(
            children,
            // { handleUpdate: (setValue) => handleUpdate(setValue) },
            { handleUpdate },
            { ...children }
          )
        })} */}
        {children}
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
  }

  return (
    <>
      <FormConsumer>
        {() =>
          items.map((item, index) => {
            return (
              <GroupComponent
                required={true}
                item={item}
                index={index}
                fields={fields}
                {...restProps}
                key={item.id}
                isFormGroup
                className={styles.formGroup}
                onChange={(e) => {
                  handleDispatch(e, {
                    type: 'onchange',
                    payload: { id: item.id, target: e.target },
                  })
                }}
              />
            )
          })
        }
      </FormConsumer>
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
  // setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonComponent: PropTypes.elementType,
  formComponent: PropTypes.elementType,
}

export default FormGroup
