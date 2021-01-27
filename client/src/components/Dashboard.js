import React from 'react'
import { useLocation } from 'react-router-dom'
import { FolderPlus, ArrowLeft, Upload } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Folders from './Folders'

const Dashboard = () => {
  const { pathname } = useLocation()

  return (
    <div className='content'>
      <div className='head'>
        <Link className='right' to='#'>
          <FolderPlus className='mr-1' />
          <span> Create new Folder</span>
        </Link>
        <Link className='right mr-4' to='#'>
          <Upload className='mr-2' />
          <span>Upload</span>
        </Link>
        <Link to='/folders'>
          <ArrowLeft
            size='1.3rem'
            className='mr-2'
            style={{ color: '#3a3a3a' }}
          />
        </Link>
        /myfolder
      </div>
      {pathname === '/' ? 'All' : <Folders />}
    </div>
  )
}

export default Dashboard
