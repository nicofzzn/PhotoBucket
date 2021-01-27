import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BiImages, BiFolder } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { UserContext } from './App'

const Sidebar = () => {
  const { pathname } = useLocation()
  const [user] = useContext(UserContext)

  if (pathname === '/login' || pathname === '/signup' || !user.id) {
    return <></>
  }
  return (
    <div className='sidebar bg-light sm'>
      <li
        className={
          pathname === '/dashboard/folders' ? 'nav-item' : 'nav-item active'
        }
      >
        <Link className='nav-link ml-2' to='/dashboard'>
          <BiImages size='1.5rem' className='mr-3' /> All Photos
        </Link>
      </li>
      <li
        className={
          pathname === '/dashboard/folders' ? 'nav-item active' : 'nav-item'
        }
      >
        <Link className='nav-link ml-2' to='/dashboard/folders'>
          <BiFolder size='1.5rem' className='mr-3' /> Folders
        </Link>
      </li>
    </div>
  )
}

export default Sidebar
