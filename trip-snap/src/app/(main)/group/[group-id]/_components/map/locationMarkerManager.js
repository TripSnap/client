import { useEffect, useRef } from 'react'

export default function locationMarkerManager({ map, setAddress, setLatLng }) {
  const marker = useRef(null)
  const geocoder = useRef(null)

  useEffect(() => {
    if (map) {
      geocoder.current = new kakao.maps.services.Geocoder()

      const { Ma: lat, La: lng } = map.getCenter()
      setMarker({ lat, lng })

      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        const { Ma: lat, La: lng } = mouseEvent.latLng
        setMarker({ lat, lng })
      })
    }
  }, [map])

  const setMarker = ({ lat, lng }) => {
    getAddressByLatlng({ lat, lng })
    setLatLng({ lat, lng })
    if (marker.current) {
      marker.current.setMap(null)
    }
    marker.current = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      map: map,
    })
  }

  const getAddressByLatlng = ({ lat, lng }) => {
    geocoder.current.coord2RegionCode(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const [{ address_name: addressName }] = result.filter(
          (e) => e.region_type === 'B'
        )
        setAddress(addressName)
      }
    })
  }

  return { setMarker }
}
