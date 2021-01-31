import React from 'react'
import { Button } from 'react-bootstrap'
import { ArrowLeft, Folder, FolderPlus, Upload } from 'react-bootstrap-icons'
import { useRouteMatch, Route, Link, Switch } from 'react-router-dom'

import InsideFolder from './InsideFolder'

const Folders = ({ folders, createFolderModalShow, uploadModalShow }) => {
  const { path, url } = useRouteMatch()
  return (
    <>
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
        <Link to='/dashboard/folders'>
          <ArrowLeft
            size='1.3rem'
            className='mr-2'
            style={{ color: '#3a3a3a' }}
          />
        </Link>
        <span>/myfolder</span>
      </div>
      <Switch>
        <Route exact path={path}>
          <div className='p-4 folder'>
            {folders &&
              folders.length !== 0 &&
              folders.map(folder => (
                <div key={folder._id} className='mb-4'>
                  <Link to={`${url}/${folder.name}`}>
                    <Button variant='folder' className='p-2'>
                      <Folder size='2.4rem' />
                      <p className='m-0'>{folder.name}</p>
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </Route>
        <Route path={`${path}/:param`}>
          <InsideFolder folders={folders} />
        </Route>
      </Switch>
    </>
  )
}

export default Folders
