import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Images, Folder2Open } from 'react-bootstrap-icons'
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
          pathname === '/dashboard' || pathname === '/dashboard/'
            ? 'nav-item active'
            : 'nav-item '
        }
      >
        <Link className='nav-link ml-2' to='/dashboard'>
          <Images size='1.5rem' className='mr-3' /> All Photos
        </Link>
      </li>
      <li
        className={
          pathname.search('folders') > 0 ? 'nav-item active' : 'nav-item'
        }
      >
        <Link className='nav-link ml-2' to='/dashboard/folders'>
          <Folder2Open size='1.5rem' className='mr-3' /> Folders
        </Link>
      </li>
    </div>
  )
}

export default Sidebar
