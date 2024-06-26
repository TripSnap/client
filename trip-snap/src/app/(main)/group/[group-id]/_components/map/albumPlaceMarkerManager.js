import { useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import Marker from './Marker'
import { usePlaceListContext } from './PlaceListProvider'

export default function albumPlaceMarkerManager({ map }) {
  const { placeList, selected, setSelected, setOpenDetailModal } =
    usePlaceListContext()
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    setMarkers((prevMarkers) => {
      prevMarkers.map(removeMarker)
      return placeList.map(createMarker)
    })
  }, [placeList, map])

  useEffect(() => {
    if (map && markers.length) {
      markers.forEach(({ marker, dom }) => {
        setMarker(marker, dom, false)
      })
      if (selected) {
        const [{ marker, dom, data }] = markers.filter(
          ({ data }) => data.id == selected
        )
        setMarker(marker, dom, true)
        map.panTo(new kakao.maps.LatLng(data.lat, data.lng))
      }
    }
  }, [selected, map])

  const createMarker = (data) => {
    const { lat, lng, photo, id } = data
    const dom = document.createElement('div')
    dom.innerHTML = renderToString(<Marker selected={id == selected} />)

    const marker = new kakao.maps.CustomOverlay({
      map: map,
      content: dom,
      clickable: true,
      position: new kakao.maps.LatLng(lat, lng),
      xAnchor: 0.5,
      yAnchor: 1.2,
    })
    marker.setMap(map)

    dom.addEventListener('click', () => {
      setSelected(id)
      setOpenDetailModal(true)
    })

    return { marker, dom, data }
  }

  const setMarker = (marker, dom, selected) => {
    dom.innerHTML = renderToString(<Marker selected={selected} />)
    marker.setContent(null)
    marker.setContent(dom)
    marker.setZIndex(selected ? 10 : 0)
  }

  const removeMarker = ({ marker }) => {
    marker.setMap(null)
  }

  return { clearSelected: () => setSelected(null) }
}
