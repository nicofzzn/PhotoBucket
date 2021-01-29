const express = require('express')
const router = express.Router()

const PhotoFolder = require('../models/PhotoFolder')

router.post('/api/folders', async (req, res) => {
  try {
    req.body.folderName = req.body.folderName.trim()
    const existingFolder = await PhotoFolder.findOne({
      userId: req.user.id,
      name: req.body.folderName,
    })
    if (existingFolder) {
      res.status(400)
      throw new Error('Folder name must be unique')
    }

    const newFolder = await new PhotoFolder({
      userId: req.user.id,
      name: req.body.folderName,
    }).save()

    res.json(newFolder)
  } catch (error) {
    console.log(error)
    if (res.statusCode === 400) return res.json({ message: error.message })
    if (error.errors.name.kind === 'required')
      return res.status(400).json({ message: 'Name required' })
  }
})

router.get('/api/folders', async (req, res) => {
  const folders = await PhotoFolder.find({ userId: req.user.id })
  res.json(folders)
})

module.exports = router
