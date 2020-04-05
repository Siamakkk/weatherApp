console.log('fornt-end javascript working')

const searchInput = document.querySelector('input')
const renderForcast = document.querySelector('#forcastMsg')
const weatherForm = document.querySelector('#location')
document.querySelector('div').appendChild(renderForcast)

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(searchInput.value)
    renderForcast.innerHTML = 'loading...'

        fetch(`/weather?adress=${searchInput.value}`).then((response) => {
            response.json().then((data) => {
               if(data.err){
                     renderForcast.textContent = data.err
               }else{
                     renderForcast.innerHTML = `the weather right now in <strong>${data.cityName}</strong> is ${data.forcastData}`
               }
               console.log(data)
            })
        })
    
})

