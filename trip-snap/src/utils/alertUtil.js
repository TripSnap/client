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
