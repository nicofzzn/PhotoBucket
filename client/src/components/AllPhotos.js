import React from 'react'
import { Button } from 'react-bootstrap'
import { FolderPlus, Upload } from 'react-bootstrap-icons'

const AllPhotos = ({ createFolderModalShow, uploadModalShow }) => {
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
      </div>
    </>
  )
}

export default AllPhotos
