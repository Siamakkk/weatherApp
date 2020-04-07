console.log('fornt-end javascript working')

//importing dependencies
const searchInput = document.querySelector('input')
const renderForcastsummary = document.querySelector('#forcastMsg')
const weatherForm = document.querySelector('#location')
const weatherCity = document.querySelector('#city')
const renderForcastHourly = document.querySelector('#hourly')
const hourlyImg = document.querySelector('#hourly-img')

//rendering forcast resualt
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(searchInput.value)
    renderForcastsummary.innerHTML = 'loading...'
    weatherCity.textContent = ''
    renderForcastHourly.textContent = ''
    hourlyImg.src= ''

        fetch(`/weather?adress=${searchInput.value}`).then((response) => {
            response.json().then((data) => {
               if(data.err){
                    renderForcastsummary.textContent = data.err
               }else{
                    weatherCity.textContent = data.cityName
                    renderForcastsummary.textContent =`now : ${data.forcastData.currently.summary}`
                    renderForcastHourly.textContent = data.forcastData.hourly.summary
                    iconRender(data.forcastData.currently.icon)
                    
                     
                     
               }
               console.log(data)
            })
        })
    
})

//a function for seting forcast icon src
const iconRender = function(icon){
    if(icon === ('clear-day'||'clear')){
        hourlyImg.src = "./img/sun.png"
    }else if(icon === 'rain'){
        hourlyImg.src = "./img/rain.png"
    }else if(icon === 'snow'){
        hourlyImg.src = "./img/snow.png"
    }else if(icon === 'sleet'){
        hourlyImg.src = "./img/sleet.png"
    }else if(icon === 'wind'){
        hourlyImg.src = "./img/wind.png"
    }else if(icon === 'fog'){
        hourlyImg.src = "./img/fog.png"
    }else if(icon === 'cloudy'){
        hourlyImg.src = "./img/cloudy.png"
    }else if(icon === 'partly-cloudy-day'){
        hourlyImg.src = "./img/partly-cloudy-day.png"
    }else if(icon === 'partly-cloudy-night'){
        hourlyImg.src = "./img/partly-cloudy-night.png"
    }else{
        hourlyImg.src = "./img/general.png"
    }
}