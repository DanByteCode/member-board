export function errorHandler (err, req, res, next) {
  const details = req.app.get('env') === 'development' ? `: ${err.message}` : '...'
  console.error(err.message)
  res.status(err.status || 500)
  res.send('Server error' + details)
}
