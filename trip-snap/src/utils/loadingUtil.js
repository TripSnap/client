import Swal from 'sweetalert2'

export const loadingPopup = async (fn, message) => {
  return Swal.fire({
    html: '<span></span>',
    didOpen: async (popup) => {
      Swal.showLoading()
      popup.querySelector('span').textContent = message
      await fn()
      Swal.close()
    },
  })
}
