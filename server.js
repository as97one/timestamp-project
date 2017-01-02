var express = require('express')
var strftime = require('strftime')
var app = express()

app.get('/:date', function (req, res) {
    var param_date = req.params.date
    var is_int = parseInt(req.params.date)
    if (is_int){
        param_date*=1000
    } 
    var potential_date = new Date(param_date)
    
    var to_return = {
            unix: null,
            natural: null
        }
        
    if (Date.parse(potential_date)) {
        to_return['unix']=parseInt(req.params.date)
        to_return['natural']=req.params.date
        if (is_int){
            to_return['natural']=strftime('%B %e, %Y', potential_date)
        }else{
            to_return['unix']=potential_date.getTime()/1000
        }
    }
    
    res.send(JSON.stringify(to_return))
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})