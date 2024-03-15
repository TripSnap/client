import { useEffect, useRef, useState } from 'react'
import MarkerManager from './MarkerManager'
import { Button } from '@mui/material'
import { LocationSearching } from '@mui/icons-material'

// TODO: props 위도 경도 받기..
export default function Map({ markerClickHandler }) {
  const container = useRef(null)
  const [map, setMap] = useState(null)
  MarkerManager({ map, clickHandler: markerClickHandler })

  const initMap = (lat, lng) => {
    setMap(
      new kakao.maps.Map(container.current, {
        // center: new kakao.maps.LatLng(lat ?? 37.5664056, lng ?? 126.9778222),
        center: new kakao.maps.LatLng(37.56646, 126.97761),
        level: 3,
        mapTypeId: kakao.maps.MapTypeId.ROADMAP,
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
        initMap(lat, lng)
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
    } catch (e) {
      // 위치정보를 불러올수 없으요
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {map && (
        <Button
          variant="contained"
          color="success"
          sx={{
            position: 'absolute',
            zIndex: 100,
            right: 5,
            top: 5,
            minWidth: 0,
            padding: 1,
          }}
          onClick={setCurrentLocation}
        >
          <LocationSearching />
        </Button>
      )}
      <div
        id="map"
        style={{ width: '100%', height: '100%' }}
        ref={container}
      ></div>
    </div>
  )
}
