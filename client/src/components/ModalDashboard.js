import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

const CreateFolderModal = ({
  show,
  handleClose,
  getFolders,
  setFolders,
  folders,
}) => {
  const [files, setFiles] = useState([])
  const [onLoading, setOnLoading] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [rejected, setRejected] = useState(false)
  const [alert, setAlert] = useState('')
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setRejected(false)
      setFiles(acceptedFiles)
    },
    onDropRejected: () => setRejected(true),
  })
  const inputRef = useRef()
  const history = useHistory()

  const onUpload = () => {}

  const onCreateFolderSave = () => {
    setOnLoading(true)
    axios
      .post('/api/folders', { folderName })
      .then(res => {
        console.log(res.data)
        getFolders().then(res => setFolders(res.data))
        handleClose()
        setFolderName('')
        setAlert('')
        history.push('/dashboard/folders')
      })
      .catch(err => {
        setAlert(err.response.data.message)
      })

    setOnLoading(false)
  }

  if (show.upload) {
    return (
      <Modal
        className='upload mt-3'
        show={show.upload}
        onHide={() => {
          setRejected(false)
          setFiles([])
          handleClose()
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload an image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId='exampleForm.ControlSelect1'>
            <Form.Label>Select folder</Form.Label>
            <Form.Control as='select'>
              {folders.length > 0 &&
                folders.map(folder => (
                  <option key={folder._id}>{folder.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input name='inputFiles' {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            {rejected && <Alert variant='danger'>Unsuported file type</Alert>}
            <h5>Files</h5>
            <ul>
              {files.map(file => (
                <li key={file.path}>
                  {file.path} - {file.size} bytes
                </li>
              ))}
            </ul>
          </aside>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={rejected}
            variant='primary'
            onClick={() => {
              onUpload()
              handleClose()
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } else if (show.createNewFolder) {
    return (
      <Modal
        className='mt-5'
        show={show.createNewFolder}
        onEntered={() => inputRef.current.focus()}
        onHide={() => {
          handleClose()
          setFolderName('')
          setAlert('')
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <Alert variant='danger'>{alert}</Alert>}
          <Form.Control
            type='string'
            value={folderName}
            placeholder='Enter folder name'
            onChange={e => setFolderName(e.target.value)}
            ref={inputRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={onCreateFolderSave}
            disabled={onLoading}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return <></>
  }
}

export default CreateFolderModal
