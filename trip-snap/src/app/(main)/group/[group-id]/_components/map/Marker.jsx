export default function Marker({ selected }) {
  const rootStyle = (style) => ({
    ...style,
    ...(selected ? { zoom: 1.4 } : {}),
  })

  return (
    <div
      style={rootStyle({
        position: 'relative',
        width: '4rem',
        height: '4rem',
      })}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '0.375rem',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          alt="Marker Image"
          src="https://blog.kakaocdn.net/dn/UMjP6/btqF5fjoMK2/CPrZnDDObB6mhOMMcFiLy0/img.png"
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '0.375rem',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          width: '0.75rem',
          height: '0.75rem',
          transform: 'translateX(-50%) translateY(50%) rotate(45deg)',
          backgroundColor: '#FFFFFF',
        }}
      />
    </div>
  )
}
