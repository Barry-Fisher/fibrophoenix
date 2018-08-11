module.exports = function (req, res, next) {
  const Content = require('../index.js')
  const collectionData = Content.getCollectionData(req.url.substring(1))
  return res.end(JSON.stringify(collectionData, null, 4))
}