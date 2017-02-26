'use strict';
let express = require('express')
  , app = express()
  , strftime = require('strftime')
  ;

app.get('/', function(req, res) {
  res.send('<h1>This is the Timestamp Microservice</h1>' +
    "<p>Please append a date, such as 'March 14 1990', or " +
    "a unix timestamp, such as '637372800', to the URL " +
    'to use this service.</p>')
})

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