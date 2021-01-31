import React, { useState } from 'react'
import Folders from './Folders'
import AllPhotos from './AllPhotos'
import ModalDashboard from './ModalDashboard'
import { Route, Switch, useLocation } from 'react-router-dom'

const Dashboard = ({ folders, setFolders }) => {
  const [showModal, setShowModal] = useState({
    upload: false,
    createNewFolder: false,
  })
  const { pathname } = useLocation()

  const createFolderModalShow = () =>
    setShowModal({ upload: false, createNewFolder: true })
  const uploadModalShow = () =>
    setShowModal({ upload: true, createNewFolder: false })
  const setModalClose = () =>
    setShowModal({ upload: false, createNewFolder: false })

  return (
    <div className='content'>
      <Switch>
        <Route exact path='/dashboard'>
          <AllPhotos
            createFolderModalShow={createFolderModalShow}
            uploadModalShow={uploadModalShow}
          />
        </Route>

        <Route path='/dashboard/folders'>
          <Folders
            folders={folders}
            createFolderModalShow={createFolderModalShow}
            uploadModalShow={uploadModalShow}
          />
        </Route>
        <Route path='*'>
          <h3 className='font-weight-light p-4'>{`Can't find ${pathname}`}</h3>
        </Route>
      </Switch>

      <ModalDashboard
        show={showModal}
        handleClose={setModalClose}
        setFolders={setFolders}
        folders={folders}
      />
    </div>
  )
}

export default Dashboard
