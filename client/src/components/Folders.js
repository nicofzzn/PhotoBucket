import React from 'react'
import { Button } from 'react-bootstrap'
import { Folder } from 'react-bootstrap-icons'

const Folders = ({ folders }) => {
  return (
    <div className='p-4 folder'>
      {folders &&
        folders.length !== 0 &&
        folders.map(folder => (
          <div key={folder._id} className='mb-4'>
            <Button variant='folder' className='p-2'>
              <Folder size='2.4rem' />
              <p className='m-0'>{folder.name}</p>
            </Button>
          </div>
        ))}
    </div>
  )
}

export default Folders
