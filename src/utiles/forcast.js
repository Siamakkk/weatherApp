const request = require('request')

const forcast = function(latitude, longitude, callback){
    const url = `https://api.darksky.net/forecast/cdb3b43891366c64b8d8536f9590b9ef/${latitude},${longitude}`
    request({url, json: true}, (err, res) => {
        if(err){
            callback(`there is a problem`,undefined)
        }else if(res.body.error){
           callback("we couldn't find the location you are looking for !", undefined)
        }else {
           callback(undefined, res.body)
        }
    })
}

module.exports = forcast

