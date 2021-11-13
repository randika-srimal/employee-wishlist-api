const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.sendFile('views/index.html', { root: __dirname })
})

app.listen(4000, () => {
    console.log(`Example app listening at http://localhost:4000`)
})
