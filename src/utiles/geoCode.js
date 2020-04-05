const request = require('request')




const geoCode = function(location, callback){
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/`+ location + `.json?access_token=pk.eyJ1Ijoic2lhbWFra2siLCJhIjoiY2s4NzhqNWt2MDFqdjNrbTY3bHp5N2RlbSJ9.sOCt6YjszKgucLU1N_dO9w`
    request({url:url, json: true},(err, res) => {
        if(err){
            callback(`unable to connect to server`, undefined)
        }else if (res.body.features.length===0){
           callback('unable to locate youre location', undefined)
        }else{
            const latitude = res.body.features[0].center[1]
            const longitude = res.body.features[0].center[0]
            const location = res.body.features[0].place_name
            const data =  {
                latitude,
                longitude,
                location
            }
            callback(undefined, data)
        }
    })
}

// geoCode("shiraz",(err, data)=>{
//     if(err){
//         console.log(`error : ${err}`)
//     }else{
//         console.log(data)
//     }
// })


module.exports = geoCode