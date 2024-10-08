const mongoose = require('mongoose')
const { Schema } = mongoose

const photoFolderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  photos: [
    {
      url: String,
      uploadDate: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
})

const PhotoFolder = mongoose.model('PhotoFolder', photoFolderSchema)

module.exports = PhotoFolder
