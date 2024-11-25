import React, { useState } from 'react'
import { Header } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSiderbar = () => setSidebar(!sidebar)

  return (
    <Header>
      <FaBars onClick={showSiderbar} />
      {sidebar && <Sidebar active={setSidebar} />}
    </Header>
  )
}

export default Navbar