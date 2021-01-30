const express = require('express')
const S3 = require('aws-sdk/clients/s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { v4: uuidv4 } = require('uuid')

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

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'nicofzbucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const ext = file.mimetype.split('/')
      cb(null, `${uuidv4()}.${ext[1]}`)
    },
  }),
})

router.post('/api/photos', upload.array('files'), async (req, res) => {
  const photos = req.files.map(file => ({ url: file.location }))
  if (photos.length === 0) {
    res.status(400).json({ message: 'You upload nothing' })
  }

  const folderName = req.files[0].originalname

  try {
    const photoFolder = await PhotoFolder.findOne({ name: folderName })

    photoFolder.photos.push(...photos)
    photoFolder.save()
    res.json(photoFolder)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
