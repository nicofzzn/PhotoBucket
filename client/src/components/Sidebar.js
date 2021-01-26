import { useContext } from 'react'
import { BiImages, BiFolder } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { UserContext } from './App'

const Sidebar = () => {
  const location = useLocation()
  const [user] = useContext(UserContext)

  if (
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    !user.id
  ) {
    return <></>
  }
  return (
    <div className='sidebar bg-light sm'>
      <li className='active nav-item'>
        <a className='nav-link ml-2' href='/'>
          <BiImages size='1.5rem' className='mr-3' /> All Photos
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link ml-2' href='/'>
          <BiFolder size='1.5rem' className='mr-3' /> Folders
        </a>
      </li>
    </div>
  )
}

export default Sidebar
