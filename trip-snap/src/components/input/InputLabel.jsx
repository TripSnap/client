export default function InputLabel({ name, required, level, bold }) {
  const Tag = ({ children, ...props }) => {
    switch (level) {
      case 2:
        return <h2 {...props}>{children}</h2>
      case 4:
        return <h4 {...props}>{children}</h4>
      default:
        return <h5 {...props}>{children}</h5>
    }
  }
  return (
    <Tag style={{ margin: 0, ...(bold ? {} : { fontWeight: 500 }) }}>
      {name}
      {required && <span style={{ color: 'red' }}>&nbsp;*</span>}
    </Tag>
  )
}
