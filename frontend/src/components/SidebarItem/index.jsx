import React from 'react'
import { Container} from './styles'
import { Link } from 'react-router-dom'

const SidebarItem = ({ Icon, Text, to }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Container>
      <Icon />
      {Text}
    </Container>
    </Link>
  )
}

export default SidebarItem

// import React from 'react'
// import { Link } from 'react-router-dom'

// const SidebarItem = ({ Icon, Text, to }) => {
//   return (
//     <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
//       <div className="sidebar-item">
//         <Icon />
//         <span>{Text}</span>
//       </div>
//     </Link>
//   )
// }