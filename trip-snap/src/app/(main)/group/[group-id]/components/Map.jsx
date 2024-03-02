import { useEffect, useRef } from 'react'

// TODO: props 위도 경도 받기..
export default function Map() {
  const container = useRef(null)
  const initMap = (lat, lng) => {
    new kakao.maps.Map(container.current, {
      center: new kakao.maps.LatLng(lat ?? 37.5664056, lng ?? 126.9778222),
      level: 3,
    })
  }

  useEffect(() => {
    if (kakao) {
      // TODO: props 좌표 없을때 위치정보
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          initMap(pos.coords.latitude, pos.coords.longitude)
        },
        (e) => {
          initMap()
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    }
  }, [])

  return (
    <div
      id="map"
      style={{ width: '100%', height: '100%' }}
      ref={container}
    ></div>
  )
}
