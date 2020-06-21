import React, {
  useEffect,
  useReducer,
  useCallback,
  useRef,
  useContext,
} from 'react'
import PropTypes from 'prop-types'
import withFormControl from './withFormControl'
import styles from './Form.module.css'
import Form, { FieldsContext } from './Form'
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
      console.log('onchange', action.payload)

      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.value[action.payload.target.name] = action.payload.target.value
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
    fieldsData,
    ...restProps
  } = props

  let isInitialised = useRef()

  // const [items, dispatch] = useReducer(reducer, fieldsData[name])
  console.log('formgroup called', fieldsData[name])

  const newItem = useCallback(() => {
    let item = {}
    let valueUndefined

    Object.values(fields).forEach((name) => {
      item.value = {
        ...item.value,
        [name]: valueUndefined,
        validation: null,
        id: newId(),
      }
    })
    // item.validation = null
    // item.id = newId()

    console.log('newItem called:', { item })
    return item
  }, [fields])

  // const handleUpdate = (fieldsData) => {
  //   console.log('handleUpdate', fieldsData)
  //   setValue(name, items, { model, fieldsData })
  // }
  // const handleUpdate = useCallback(
  //   (fieldsData) => {
  //     console.log('handleUpdate called')
  //     setValue(name, items, { model })
  //     // setValue(name, items, { model, fieldsData })
  //   },
  //   [items, model, name, setValue]
  // )
  const handleUpdate = useCallback(
    (context) => {
      console.log('handleUpdate called', context)
      // setValue(name, items, { model })
      setValue(name, fieldsData[name], { model, context })
    },
    [fieldsData, model, name, setValue]
  )

  // useEffect(() => {
  //   handleUpdate()
  // }, [handleUpdate])

  // const handleDispatch = (e, action) => {
  //   e.preventDefault()
  //   dispatch(action)
  // }

  // Add 1 item at the first render only
  useEffect(() => {
    const onInitialLoad = () => {
      setValue(name, { ...fieldsData[name].value, ...newItem() }, { model })
      return true
    }
    if (!isInitialised.current) {
      isInitialised.current = onInitialLoad()
    }
  }, [newItem, fields, fieldsData, name, model, setValue])
  // useEffect(() => {
  //   const onInitialLoad = () => {
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

  return (
    <div className={styles.formGroup}>
      {/* {fieldsData[name].map((item, index) => {
        return (
          <Form
            fields={fields}
            {...restProps}
            key={item.id}
            component="fieldset"
            className={concatClasses([styles.fieldset])}
            onChange={(e) => {
              handleDispatch(e, {
                type: 'onchange',
                payload: { id: item.id, target: e.target, fieldsData },
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
      })} */}
      <Button
        css={`
          ${styles.btnAction} ${styles.btnAdd}
        `}
        // onClick={(e) =>
        //   handleDispatch(e, {
        //     type: 'add',
        //     payload: newItem(fields),
        //   })
        // }
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
  fieldsData: {},
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
  fieldsData: PropTypes.object,
}

export default withFormControl(React.memo(FormGroup))
