import React from 'react'
import { useParams } from 'react-router-dom'

const InsideFolder = ({ folders }) => {
  let { param } = useParams()
  return (
    <div>
      {folders.length > 0 &&
        folders
          .filter(item => item.name === param)[0]
          .photos.map(photo => <li key={photo._id}>{photo.url}</li>)
          .reverse()}
    </div>
  )
}

export default InsideFolder
