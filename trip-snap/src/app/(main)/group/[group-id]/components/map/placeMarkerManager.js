import { useEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import Marker from './Marker'

// TODO: 클릭 이벤트 -> selected 활성화
// TODO: selected만 활성화 시키는 경우도 추가해야함 (PlaceList secondary button)
export default function placeMarkerManager({ map, clickHandler }) {
  const [selected, setSelected] = useState(null)
  const markers = useRef([])

  useEffect(() => {
    if (map) {
      markers.current = Array(10)
        .fill(0)
        .map((e, i) => createMarker(i + 1))
    }
  }, [map])

  useEffect(() => {
    markers.current.forEach(({ marker, dom }) => {
      setMarker(marker, dom, false)
    })
    if (selected) {
      const { marker, dom } = markers.current[selected - 1]
      setMarker(marker, dom, true)
    }
  }, [selected])

  const createMarker = (i, lat, lng, selected) => {
    const dom = document.createElement('div')
    dom.innerHTML = renderToString(<Marker selected={selected} />)

    const marker = new kakao.maps.CustomOverlay({
      map: map,
      content: dom,
      clickable: true,
      position: new kakao.maps.LatLng(
        37.56646 + i / 3000,
        126.97761 + i / 3000
      ),
      xAnchor: 0.5,
      yAnchor: 1.2,
    })
    marker.setMap(map)

    dom.addEventListener('click', () => {
      setSelected(i)
      clickHandler(i)
    })

    return { marker, dom }
  }

  const setMarker = (marker, dom, selected) => {
    dom.innerHTML = renderToString(<Marker selected={selected} />)
    marker.setContent(null)
    marker.setContent(dom)
    marker.setZIndex(selected ? 10 : 0)
  }

  return {}
}
