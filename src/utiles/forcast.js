const request = require('request')
// const geoCode = require('./geoCode')

const forcast = function(latitude, longitude, callback){
    const url = `https://api.darksky.net/forecast/cdb3b43891366c64b8d8536f9590b9ef/${latitude},${longitude}`
    request({url, json: true}, (err, res) => {
        if(err){
            callback(`there is a problem`,undefined)
        }else if(res.body.error){
           callback("we couldn't find the location you are looking for !", undefined)
        }else {
           callback(undefined, res.body.currently.summary)
        }
    })
}

module.exports = forcast

// geoCode("berlin",(err, data)=>{
//     if(err){
//         console.log(`error : ${err}`)
//     }else{
//         forcast(data.latitude, data.longitude, (error, forcastData) => {
//             if(error){
//                 console.log(`Error : ${error}`)
//             }else{
//                 const cityName = data.location.split(',')
//                 console.log(`the wather in ${cityName[0]} is ${forcastData} right now.`)
//             }
//         })
//     }
// })