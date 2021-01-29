import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FolderPlus, ArrowLeft, Upload } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Folders from './Folders'
import AllPhotos from './AllPhotos'
import ModalDashboard from './ModalDashboard'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const Dashboard = () => {
  const { pathname } = useLocation()
  const [folders, setFolders] = useState([])
  const [showModal, setShowModal] = useState({
    upload: false,
    createNewFolder: false,
  })

  const getFolders = async () => {
    try {
      const dataFolders = await axios.get('/api/folders')
      return dataFolders
    } catch (error) {
      return []
    }
  }

  const createFolderModalShow = () =>
    setShowModal({ upload: false, createNewFolder: true })
  const uploadModalShow = () =>
    setShowModal({ upload: true, createNewFolder: false })
  const setModalClose = () =>
    setShowModal({ upload: false, createNewFolder: false })

  useEffect(() => {
    getFolders().then(res => setFolders(res.data))
  }, [])

  return (
    <div className='content'>
      <div className='head'>
        <Button
          variant='custom'
          className='right'
          onClick={createFolderModalShow}
        >
          <FolderPlus className='mr-1' />
          <span> Create new Folder</span>
        </Button>
        <Button
          variant='custom'
          className='right mr-2'
          onClick={uploadModalShow}
        >
          <Upload className='mr-2' />
          <span>Upload</span>
        </Button>
        {pathname === '/dashboard/folders' ||
        pathname === '/dashboard/folders/' ? (
          <>
            <Link to='/dashboard/folders'>
              <ArrowLeft
                size='1.3rem'
                className='mr-2'
                style={{ color: '#3a3a3a' }}
              />
            </Link>
            <span>/myfolder</span>
          </>
        ) : (
          <></>
        )}
      </div>
      {pathname === '/dashboard' || pathname === '/dashboard/' ? (
        <AllPhotos />
      ) : pathname === '/dashboard/folders' ||
        pathname === '/dashboard/folders/' ? (
        <Folders folders={folders} />
      ) : (
        <p className='p-4'>{`Can't find ${pathname}`}</p>
      )}
      <ModalDashboard
        show={showModal}
        handleClose={setModalClose}
        getFolders={getFolders}
        setFolders={setFolders}
        folders={folders}
      />
    </div>
  )
}

export default Dashboard
