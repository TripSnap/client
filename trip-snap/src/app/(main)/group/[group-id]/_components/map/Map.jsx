import { LocationSearching } from '@mui/icons-material'
import { Button, ButtonGroup } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import placeMarkerManager from './placeMarkerManager'
import locationMarkerManager from './locationMarkerManager'

// TODO: props 위도 경도 받기..
export default function Map({
  usePlaceMarker,
  useMarker,
  setAddress,
  setLatLng,
}) {
  const container = useRef(null)
  const [map, setMap] = useState(null)
  const placeMarker = usePlaceMarker && placeMarkerManager({ map })
  const locationMarker =
    useMarker && locationMarkerManager({ map, setAddress, setLatLng })

  const initMap = ({ lat, lng } = {}) => {
    setMap(
      new kakao.maps.Map(container.current, {
        // center: new kakao.maps.LatLng(lat ?? 37.5664056, lng ?? 126.9778222),
        center: new kakao.maps.LatLng(37.56646, 126.97761),
        level: 3,
        mapTypeId: kakao.maps.MapTypeId.ROADMAP,
        tileAnimation: false,
      })
    )
  }

  const getCurrentPosition = () =>
    new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          res({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        },
        (e) => {
          rej(e)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    })

  useEffect(() => {
    const init = async () => {
      try {
        const { lat, lng } = await getCurrentPosition()
        initMap({ lat, lng })
      } catch (e) {
        // 위치정보를 불러올수 없으요
        initMap()
      }
    }
    if (kakao) {
      // TODO: props 좌표 없을때 위치정보
      init()
    }
  }, [])

  const setCurrentLocation = async () => {
    try {
      const { lat, lng } = await getCurrentPosition()
      map.setCenter(new kakao.maps.LatLng(lat, lng))
      locationMarker && locationMarker.setMarker({ lat, lng })
    } catch (e) {
      // 위치정보를 불러올수 없으요
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {map && (
        <ButtonGroup
          variant="outlined"
          color="primary"
          sx={{
            position: 'absolute',
            zIndex: 100,
            right: 5,
            top: 5,
            background: 'white',
          }}
        >
          {/* {useMarker && (
            <Button
              sx={{
                minWidth: 0,
                padding: 1,
              }}
              onClick={setCurrentLocation}
            >
              <Search />
            </Button>
          )} */}
          <Button
            sx={{
              minWidth: 0,
              padding: 1,
            }}
            onClick={setCurrentLocation}
          >
            <LocationSearching />
          </Button>
        </ButtonGroup>
      )}
      <div style={{ width: '100%', height: '100%' }} ref={container}></div>
    </div>
  )
}
