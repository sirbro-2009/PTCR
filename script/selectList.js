//بسم الله الرحمن الرحيم
let countriesSelect = $.getElementById("countriesSelect")
let statesSelect = $.getElementById("statesSelect")
let citiesSelect = $.getElementById("citiesSelect")
fetch('https://api.countrystatecity.in/v1/countries',{
    headers:{
        'X-CSCAPI-KEY':'cc085ed5c629d147d2bb27ae4391ef18a0ed7285876178b5a3d09ceef6b25ba3'
    }
}).then((e)=>{
    return e.json()
}).then((e)=>{
    for(let i = 0;i<e.length;++i){
        let option = $.createElement("option")
        option.textContent = e[i].name
        option.value = e[i].iso2
        countriesSelect.append(option)
       // console.log(e[i])
    }
})
countriesSelect.onchange = ()=>{
statesSelect.innerHTML = `
<option disabled selected>choice your state</option>
`
citiesSelect.innerHTML = `
<option disabled selected>choice your city</option>`
fetch(`https://api.countrystatecity.in/v1/countries/${countriesSelect.value}/states`,{
    headers:{
        'X-CSCAPI-KEY':'cc085ed5c629d147d2bb27ae4391ef18a0ed7285876178b5a3d09ceef6b25ba3'
    }
}).then((e)=>{
    return e.json()
}).then((e)=>{
    for(let i = 0;i<e.length;++i){
        let option = $.createElement("option")
        option.textContent = e[i].name
        option.value = e[i].iso2
        statesSelect.append(option)
        //console.log(e[i])
    }
})
}
statesSelect.onchange = ()=>{
citiesSelect.innerHTML = `
<option disabled selected>choice your city</option>`
fetch(`https://api.countrystatecity.in/v1/countries/${countriesSelect.value}/states/${statesSelect.value}/cities`,{
    headers:{
        'X-CSCAPI-KEY':'cc085ed5c629d147d2bb27ae4391ef18a0ed7285876178b5a3d09ceef6b25ba3'
    }
}).then((e)=>{
    return e.json()
}).then((e)=>{
    for(let i = 0;i<e.length;++i){
        let option = $.createElement("option")
        option.textContent = e[i].name
        option.value = e[i].name
        citiesSelect.append(option)
        //console.log(e[i])
    }
    
})
}
let theError = $.getElementById("theError")
let counterNumber = 3
citiesSelect.onclick = ()=>{

    setTimeout(() => {
    let selectedCity = citiesSelect.value.toLocaleLowerCase().replaceAll(' ','_')
    fetch(`https://nominatim.openstreetmap.org/search?q=${selectedCity}&format=json`,{
        headers: { "User-Agent": "MyAppName/1.0 (myemail@example.com)" }}).then(
        (data)=>{
        let userData = data.json()
        return userData
        }
    ).then(
        (allData)=>{
            let lon = allData[0].lon
            localStorage.setItem("log",lon||``)
            let lat = allData[0].lat
            localStorage.setItem("lat",lat||``)
            let cityName = allData[0].name
            localStorage.setItem("nameCity",cityName||``)
        }).catch((e)=>{
            theError.textContent = 'error:( try again!'
            console.log(e)
            setTimeout(() => {
            theError.textContent = ''
            }, 3000);
        })
            if(theError.textContent !== 'error:( try again!'){
                let counter = setInterval(() => {
                --counterNumber
                theError.textContent = `${counterNumber} wait`
                if(counterNumber = 1){
                    counterNumber-1
                    clearInterval(counter)
                    theError.textContent = 'Changed succesfuly!'
                }
                }, 1000);
            }
        
    }, 5000);
}