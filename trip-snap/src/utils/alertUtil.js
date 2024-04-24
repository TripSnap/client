import Swal from 'sweetalert2'

const alert = async (option = {}) => {
  const { message, button, icon, callback } = option
  await Swal.fire({
    text: message,
    icon,
    showCancelButton: false,
    showConfirmButton: button,
    showCloseButton: false,
    ...(button ? {} : { timer: 2000 }),
  })
  callback && callback()
}

export const successAlert = (option) => alert({ ...option, icon: 'success' })

export const errorAlert = (option) => alert({ ...option, icon: 'error' })

export const confirmAlert = async (option = {}) => {
  const { message, confirmCallback, cancelCallback, confirmText, cancelText } =
    option
  const result = await Swal.fire({
    text: message,
    icon: 'info',
    showCancelButton: true,
    cancelButtonText: cancelText || '아니오',
    showConfirmButton: true,
    confirmButtonText: confirmText || '예',
    showCloseButton: false,
  })
  if (result.isConfirmed) {
    confirmCallback && confirmCallback()
  }
  if (result.dismiss === Swal.DismissReason.cancel) {
    cancelCallback && cancelCallback()
  }
}
