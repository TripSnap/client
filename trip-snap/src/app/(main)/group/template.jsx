export default function Template({ children }) {
  return (
    <>
      {children}
      {/* kakao map API */}
      <script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&libraries=services,drawing`}
      ></script>
    </>
  )
}
