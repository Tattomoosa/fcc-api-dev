'use strict';
let express = require('express')
  , app = express()
  , strftime = require('strftime')
  ;

app.get('/:date', function(req, res) {
  //let timeStr = req.params.date;
  let date = req.params.date
  date = (function() {
    let parseDate = new Date(date)
    if (parseDate == 'Invalid Date') {
      parseDate = new Date(date*1000)
      if (parseDate == 'Invalid Date') {
        return null
      }
    }
    return parseDate
  })()
  let stringTime = null, unixTime = null
  if (date !== null) {
    stringTime = strftime('%B %d, %Y', date);
    unixTime = Math.floor(date.getTime() / 1000)
  }
  res.send({
      natural: stringTime
    , unix: unixTime
    })
})

//app.listen(8080, function() {
//  console.log('example app listening on port 8080')
//})
app.set('port', process.env.PORT || 3000)

app.listen( app.get( 'port' ), function() {
  console.log('example app listening on port 3000')
})