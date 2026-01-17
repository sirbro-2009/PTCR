////بسم الله الرحمن الرحيم

//set time and date for principalTime
let $ = document
let theHours = $.getElementById("thehour")
let theDay = $.getElementById("theDate")
//hours
let date = new Date(Date.now())
let hours = date.getHours()<10?`0${date.getHours()}`:date.getHours()
let mins = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()
let sec = date.getSeconds()<10?`0${date.getSeconds()}`:date.getSeconds()
let fullHour = `${hours}:${mins}:${sec}`
let fhpCheck =`${hours}:${mins}`
//console.log(parseInt(hours)-21,parseInt(mins)-10)
//appand
setInterval((_) => {
let date = new Date(Date.now())
let hours = date.getHours()<10?`0${date.getHours()}`:date.getHours()
let mins = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()
let sec = date.getSeconds()<10?`0${date.getSeconds()}`:date.getSeconds()
let fullHour = `${hours}:${mins}:${sec}`
    theHours.textContent = fullHour
}, 1000);
//day
let Day= date.getDate()<10?`0${date.getDate()}`:date.getDate()
let month= date.getMonth()+1<10?`0${date.getMonth()+1}`:date.getMonth()+1
let year= date.getFullYear()
let fullgregorYear = `${Day}-${month}-${year}`
//appand

//fetch api for hejri year and 
//set vars
let fadj = $.getElementById("fadjr")
let dhour = $.getElementById("dhour")
let assr = $.getElementById("assr")
let moughrib = $.querySelectorAll("#moughrib")
let isha = $.getElementById("isha")
let Imsak = $.getElementById("Imsak")
let thePLace =$.getElementById("thePlace")
let theWeather = $.getElementById("theWeather")
//get times and wether see it function 
function all(){
navigator.permissions.query({ name: 'geolocation' })
  .then(result => {
    if(result.state === "granted"){
        navigator.geolocation.getCurrentPosition((po)=>{     
        localStorage.setItem("lat1",po.coords.latitude)
        localStorage.setItem("log1",po.coords.longitude)
        })
        let lat = localStorage.getItem("lat1")
        let log = localStorage.getItem("log1")
        localStorage.setItem("latF",lat)
        localStorage.setItem("logF",log)
    }
    else if(result.state === "denied" || result.state === "prompt"){
        let lat = localStorage.getItem("lat")||21.3891
        let log = localStorage.getItem("log")||39.8579
        localStorage.setItem("latF",lat)
        localStorage.setItem("logF",log)

    }
    
    if(localStorage.getItem("lat") !== null && localStorage.getItem("log") !== null){
        let lat = localStorage.getItem("lat")
        let log = localStorage.getItem("log")
        localStorage.setItem("latF",lat)
        localStorage.setItem("logF",log)
    }
let lat = localStorage.getItem("latF")
let log = localStorage.getItem("logF")
    let prayApilink = `https://api.aladhan.com/v1/timings/${fullgregorYear}?latitude=${lat}&longitude=${log}&method=${window.localStorage.getItem("id")||3}&school=${localStorage.getItem("madhabValue")||0}&tune=${localStorage.getItem("ImsakOffset")||0},${localStorage.getItem("FadjrOffset")||0},0,${localStorage.getItem("DhuhrOffset")||0},${localStorage.getItem("AsrOffset")||0},${localStorage.getItem("MaghribOffset")||0},0,${localStorage.getItem("IshaOffset")||0},0` 
    let waetherApiLink = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${log}&current_weather=true&timezone=auto`
    let placeApiLink = `https://us1.locationiq.com/v1/reverse.php?key=pk.c1726c6a2a12b42ad99a440efb52627d&lat=${lat}&lon=${log}&format=json`
    console.log(prayApilink,placeApiLink)
     //fetch placeApi
    fetch(placeApiLink).then(
    (res)=>{
        let resData = res.json()
    
        return resData
    }
).then(
(data)=>{
    let city = data.address.city||localStorage.getItem("nameCity")||``
    let state = data.address.state
    let country = data.address.country
    let fullAdrees = `${city}-${state}-${country}`
    thePLace.textContent = fullAdrees
    }
)
    //fetch prayer Api
    fetch(prayApilink).then(
        (data)=>{
            let allData = data.json()
            return allData
        }
    ).then(
        (dataTime)=>{
        //Fadj time
        let fadjTime = dataTime.data.timings.Fajr
        fadj.textContent = fadjTime
        localStorage.setItem("fadjTime",fadjTime)
        //Dhur time
        let DhuhrTime = dataTime.data.timings.Dhuhr
        dhour.textContent = DhuhrTime
        localStorage.setItem("DhuhrTime",DhuhrTime)       
        //assr time
        let Asr = dataTime.data.timings.Asr
        assr.textContent = Asr
        localStorage.setItem("Asr",Asr)
        //magreb
        let magreb = dataTime.data.timings.Maghrib
        moughrib.forEach((element)=>{
            element.textContent = magreb
        })
        localStorage.setItem("magreb",magreb)
        //Isha
        let Isha = dataTime.data.timings.Isha
        isha.textContent = Isha
        localStorage.setItem("Isha",Isha)
        //Imsak
        let imsak = dataTime.data.timings.Imsak
        Imsak.textContent = imsak
        
        //full date
        let hijriweekDay = dataTime.data.date.hijri.weekday.ar
        let hijriDay = dataTime.data.date.hijri.day
        let hijriMonth = dataTime.data.date.hijri.month.ar
        let hijriYear = dataTime.data.date.hijri.year
        let fullhijriDate = `${hijriYear} ${hijriweekDay} ${hijriDay} ${hijriMonth}`
        let time = [fullgregorYear,fullhijriDate]
        setInterval(() => {
        let rendomDate = time[parseInt(Math.random()*time.length)]
        theDay.textContent = rendomDate
        }, 5000);
        }
    )
    //fetch wherther API
    fetch(waetherApiLink).then(
    (res)=>{
        let resData = res.json()
        
        return resData
    }
    ).then(
        (data)=>{
            let temperature =Math.round(data.current_weather.temperature)
            let whertherCode = data.current_weather.weathercode
            let dayStatu = data.current_weather.is_day
            
let wetherEmoj =
whertherCode === 0  ?dayStatu ===1?"☀️":"🌑" :
whertherCode === 1  ?dayStatu ===1?"🌤️":"🌑☁️" :
whertherCode === 2  ?dayStatu ===1? "⛅" :"🌑☁️" :
whertherCode === 3  ? "☁️" :
whertherCode === 45 ? "🌫️" :
whertherCode === 48 ? "🌫️❄️" :
whertherCode === 51 ? "🌦️" :
whertherCode === 53 ? "🌦️" :
whertherCode === 55 ? "🌧️" :
whertherCode === 56 ? "🌧️❄️" :
whertherCode === 57 ? "🌧️❄️" :
whertherCode === 61 ? "🌧️" :
whertherCode === 63 ? "🌧️🌧️" :
whertherCode === 65 ? "🌧️⛈️" :
whertherCode === 66 ? "🌧️❄️" :
whertherCode === 67 ? "🌧️❄️" :
whertherCode === 71 ? "🌨️" :
whertherCode === 73 ? "🌨️🌨️" :
whertherCode === 75 ? "❄️❄️" :
whertherCode === 77 ? "🌨️" :
whertherCode === 80 ? "🌦️" :
whertherCode === 81 ? "🌦️🌧️" :
whertherCode === 82 ? "🌧️⛈️" :
whertherCode === 85 ? "🌨️" :
whertherCode === 86 ? "❄️🌨️" :
whertherCode === 95 ? "⛈️" :
whertherCode === 96 ? "⛈️🧊" :
whertherCode === 99 ? "⛈️🧊🧊" :
"🌡️";
            theWeather.textContent = `${temperature}°C${wetherEmoj}`
        }
    )
});

}
all()
//style background 
let prayeBox = $.querySelectorAll("#prayBOX")
if(localStorage.getItem("pboxBg") === null){
prayeBox.forEach((e)=>{
e.style.cssText = "background: color-mix(in srgb, gold 60%, transparent 40%);"
})

}
else if(localStorage.getItem("pboxBg") !== null){
prayeBox.forEach((e)=>{
    e.style.cssText = `background: color-mix(in srgb, ${localStorage.getItem("pboxBg")} 60%, transparent 40%);`
})
}
//style fg
let timesName = $.querySelectorAll(".timesName")
let theTime = $.querySelectorAll(".theTime")
let icama = $.querySelectorAll(".theIcama")
let fg = localStorage.getItem("fg")
if(localStorage.getItem("fg") === null){
timesName.forEach((e)=>{
e.style.color = "#573617"
})
theTime.forEach((e)=>{
e.style.color = "#573617"    
})
icama.forEach((e)=>{
e.style.color = "#573617"    
})
}
else if(localStorage.getItem("fg") !== null){
timesName.forEach((e)=>{
e.style.color = fg
})
theTime.forEach((e)=>{
e.style.color = fg    
})
icama.forEach((e)=>{
e.style.color = fg   
})
}
//style p 
let principalTime = $.querySelector(".principalTime")
if(localStorage.getItem("pBg") !== null){
principalTime.style.cssText = `background: color-mix(in srgb, ${localStorage.getItem("pBg")} 60%, transparent 40%);`
}
//style bgImg
let bgLocalstorage = localStorage.getItem("bgImg")
if(bgLocalstorage !== null){
$.body.style.cssText = `background: url(${localStorage.getItem("bgImg")});background-repeat: no-repeat;background-size: cover;`
}
//Icama time
let FadjrIcama = $.getElementById("fadjrIcama")
let DhuhrIcama = $.getElementById("dhurIcama")
let AsrIcama = $.getElementById("assrIcama")
let MaghribIcama = $.getElementById("magIcama")
let IshaIcama = $.getElementById("ishaIcama")
//
let fadjIcamatime =localStorage.getItem("FadjrIcama")||" "
let DhuhrIcamatime =localStorage.getItem("DhuhrIcama")||" "
let AsrIcamatime =localStorage.getItem("AsrIcama")||" "
let MagIcamatime =localStorage.getItem("MaghribIcama")||" "
let IshaIcamatime =localStorage.getItem("IshaIcama")||" "
FadjrIcama.textContent = `${"+"+fadjIcamatime}`
DhuhrIcama.textContent = `${"+"+DhuhrIcamatime}`
AsrIcama.textContent = `${"+"+AsrIcamatime}`
MaghribIcama.textContent = `${"+"+MagIcamatime}`
IshaIcama.textContent = `${"+"+IshaIcamatime}`
//mosqueName
let mosqueName = $.getElementById("mosqueName")
mosqueName.textContent = localStorage.getItem("mName")|| " "
//
let setTimeoutme =localStorage.getItem("displayTime")===null?500000:localStorage.getItem("displayTime") 
setInterval(() => {
window.location.href = "adkar.html"
}, parseInt(setTimeoutme))
let adkarValue = localStorage.getItem("adhkarValue")
let adhkarValue2 = localStorage.getItem("adhkarValue2")
//
let fadjTime = localStorage.getItem("fadjTime").split(":")||alert("Enable location permtion")
let Hours = parseInt(fadjTime[0])
let FdjMins = parseInt(fadjTime[1])
let fadjIcama = parseInt(localStorage.getItem("FadjrIcama"))||0
let Mins = fadjIcama+FdjMins+15
adkarCheck(Mins,Hours)
//
let AsrTime = localStorage.getItem("Asr").split(":")
let Hours2 = parseInt(AsrTime[0])
let AsrMins = parseInt(AsrTime[1])
let AsrIcamaa = parseInt(localStorage.getItem("AsrIcama"))||0
let Mins2 = AsrIcamaa+AsrMins+15
adkarCheck2(Mins2,Hours2)
//
function adkarCheck(Mins,Hours){
if(Mins>=60){
let minCodetion = Mins-60<10?`0${Mins-60}`:Mins-60
let allData = `${Hours+1}:${minCodetion}`
localStorage.setItem("adkarMorningtime",allData)
}
else if(Mins<60){
let allData = `${Hours}:${Mins}`
localStorage.setItem("adkarMorningtime",allData)
}
}
function adkarCheck2(Mins,Hours){
if(Mins>=60){
let minCodetion = Mins-60<10?`0${Mins-60}`:Mins-60
let allData = `${Hours+1}:${minCodetion}`
localStorage.setItem("adkarEveningtime",allData)
}
else if(Mins<60){
let allData = `${Hours}:${Mins}`
localStorage.setItem("adkarEveningtime",allData)
}
}
//prayer come functions
let fadjTime1 = localStorage.getItem("fadjTime")
let DhuhrTime = localStorage.getItem("DhuhrTime")
let Asr = localStorage.getItem("Asr")
let magreb = localStorage.getItem("magreb")
let Isha = localStorage.getItem("Isha")
let allParayers =[fadjTime1,DhuhrTime,Asr,magreb,Isha]

function prayerTime(fhpChe,time){
if(fhpChe === time){
window.location.href = "adhan.html"    
}
}
setInterval(()=>{
let date = new Date(Date.now())
let hours = date.getHours()<10?`0${date.getHours()}`:date.getHours()
let mins = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()
let fhpChe =`${hours}:${mins}`    
for (let index = 0; index < allParayers.length; index++) {
prayerTime(fhpChe,allParayers[index])
}
},1000)
//
setInterval(() => {
let date = new Date(Date.now())
let hours = date.getHours()<10?`0${date.getHours()}`:date.getHours()
let mins = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()
let fhpChe =`${hours}:${mins}`
//
let hoursWithout0 = date.getHours()
let fullDAtecheck = `${hoursWithout0}:${mins}`
if(localStorage.getItem("adhkarValue") === "true"){
if(fhpChe === localStorage.getItem("adkarMorningtime")|| fullDAtecheck ===localStorage.getItem("adkarMorningtime")){
location.href = "morningAdkar.html"
}
}
//
if(localStorage.getItem("adhkarValue2") === "true"){
if(fhpChe === localStorage.getItem("adkarEveningtime") || fullDAtecheck === localStorage.getItem("adkarEveningtime")){
location.href = "masaAdkar.html"
}}
//
}, 1000);
//