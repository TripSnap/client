import Swal from 'sweetalert2'

export const loadingPopup = (fn, message) =>
  new Promise((res, rej) => {
    Swal.fire({
      html: '<span></span>',
      didOpen: async (popup) => {
        try {
          Swal.showLoading()
          popup.querySelector('span').textContent = message
          await fn()
          res()
        } catch (e) {
          rej(e)
        } finally {
          Swal.close()
        }
      },
    })
  })
