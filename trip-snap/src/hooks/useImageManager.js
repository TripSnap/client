import { useState } from 'react'

/**
 *
 * @param readBlobCallback (list, setter, prevList) => void
 * @param readDataUrlCallback (list, setter, prevList) => void
 * @returns {{dataURL: unknown, setDataURL: (value: unknown) => void, blobData: unknown, uploadEvent: ((function(*): Promise<void>)|*), removeData: removeData, setBlobData: (value: unknown) => void}}
 */
export default function useImageManager({
  readBlobCallback,
  readDataUrlCallback,
}) {
  const [blobData, setBlobData] = useState(null)
  const [dataURL, setDataURL] = useState(null)

  const uploadEvent = async (event) => {
    const {
      target: { files },
    } = event

    // TODO: 파일 타입 검사 필요
    const idPrefix = Date.now()
    const id = (index) => `${idPrefix}${String(index).padStart(2, '0')}`

    if (readBlobCallback) {
      const promiseResult = await Promise.allSettled(
        [...files].map((file, index) => readBlobData(id(index), file))
      )
      const newBlobData = promiseResult
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value }) => value)
      readBlobCallback(newBlobData, setBlobData, blobData || [])
    }

    if (readDataUrlCallback) {
      const promiseResult = await Promise.allSettled(
        [...files].map((file, index) => readDataURL(id(index), file))
      )
      const newDataURL = promiseResult
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value }) => value)
      readDataUrlCallback(newDataURL, setDataURL, dataURL || [])
    }
  }

  const readBlobData = (id, file) =>
    new Promise((res, rej) => {
      const blobReader = new FileReader()
      blobReader.addEventListener('load', async (event) => {
        res({ id, data: event.target.result, type: file.type })
      })
      blobReader.addEventListener('error', () => {
        rej()
      })
      blobReader.readAsArrayBuffer(file)
    })

  const readDataURL = (id, file) =>
    new Promise((res, rej) => {
      const dataURLReader = new FileReader()
      dataURLReader.addEventListener('load', async (event) => {
        res({ id, data: event.target.result })
      })
      dataURLReader.addEventListener('error', () => {
        rej()
      })
      dataURLReader.readAsDataURL(file)
    })

  const removeData = (removeId) => {
    const removeBlobDataIndex = blobData?.findIndex(({ id }) => removeId === id)
    const removeDataURLIndex = dataURL?.findIndex(({ id }) => removeId === id)
    if (removeBlobDataIndex > -1) {
      setBlobData([
        ...blobData.slice(0, removeBlobDataIndex),
        ...blobData.slice(removeBlobDataIndex + 1),
      ])
    }
    if (removeDataURLIndex > -1) {
      setDataURL([
        ...dataURL.slice(0, removeDataURLIndex),
        ...dataURL.slice(removeDataURLIndex + 1),
      ])
    }
  }

  return {
    blobData,
    dataURL,
    setBlobData,
    setDataURL,
    uploadEvent,
    removeData,
  }
}
