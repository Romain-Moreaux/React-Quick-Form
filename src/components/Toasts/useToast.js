import { useContext } from 'react'
import ToastContext from './context'

function useToast() {
  const context = useContext(ToastContext)

  const toast = context.toast
  toast.success = context.success
  toast.error = context.error
  toast.warning = context.warning
  toast.info = context.info
  toast.remove = context.remove

  return toast
}

export default useToast
