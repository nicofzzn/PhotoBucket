module.exports = (error, req, res, next) => {
  console.log(error)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  })
}
