////بسم الله الرحمن الرحيم


let $ = document

//set time and date for principalTime
let theHours = $.getElementById("thehour")
let theDay = $.getElementById("theDate")
let code = localStorage.getItem("countryCode")||'sa'
let arrayCoce = ['om','jo','sy','eg','ly','dz','ma','tn']
let codeFinal
for(let i = 0;i<arrayCoce.length;++i){
    if(code === arrayCoce[i]){
        codeFinal = '-1'
    }
}
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
let sunRise = $.getElementById("sunRiseTime")
let wiriteAble = $.querySelectorAll(".theTime")
let allName = $.querySelectorAll(".timesName")
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
    let prayApilink = `https://api.aladhan.com/v1/timings/${fullgregorYear}?latitude=${lat}&longitude=${log}&method=${window.localStorage.getItem("id")||3}&school=${localStorage.getItem("madhabValue")||0}&tune=0,${localStorage.getItem("FadjrOffset")||0},${localStorage.getItem("SunriseOffset")||0},${localStorage.getItem("DhuhrOffset")||0},${localStorage.getItem("AsrOffset")||0},${localStorage.getItem("MaghribOffset")||(localStorage.getItem("countryName") ==="Algeria"?3:0)},0,${localStorage.getItem("IshaOffset")||0},0&calendarMethod=MATHEMATICAL&adjustment=${codeFinal}` 
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
    let state = data.address.state||``
    let country = data.address.country||``
    localStorage.setItem("countryName",country)
    let countryCode = data.address.country_code
    localStorage.setItem("countryCode",countryCode)
    console.log(countryCode)
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
        //suNrise
        let suNrise = dataTime.data.timings.Sunrise
        sunRise.textContent = suNrise
        
        //full date
        let hijriweekDay = dataTime.data.date.hijri.weekday.ar
        let hijriDay = dataTime.data.date.hijri.day
        let hijriMonth = dataTime.data.date.hijri.month.ar
        let hijriYear = dataTime.data.date.hijri.year
        let fullhijriDate = `${hijriYear} ${hijriweekDay} ${hijriDay} ${hijriMonth}`
        if(hijriMonth ==='رَمَضان'){$.getElementById("TheOccasion").textContent = 'رمضان مبارك'}
        if(hijriMonth ==='شَوّال' && hijriDay === '1'){$.getElementById("TheOccasion").textContent = 'عيد فطر  سعيد'}
        if(hijriMonth ==='ذوالحجة' && hijriDay === '10'){$.getElementById("TheOccasion").textContent = 'عيد اضحى  سعيد'}
        let time = [fullgregorYear,fullhijriDate]
        setInterval(() => {
        let rendomDate = time[parseInt(Math.random()*time.length)]
        theDay.textContent = rendomDate
        }, 3000);
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
whertherCode === 0  ?dayStatu ===1?"https://openweathermap.org/img/wn/01d@2x.png":"style/assets/weather/night/moon.png" :
whertherCode === 1  ?dayStatu ===1?"style/assets/weather/day/partly-cloudy.png":"style/assets/weather/night/partly-cloudy-night.png" :
whertherCode === 2  ?dayStatu ===1? "https://openweathermap.org/img/wn/02d@2x.png" :"https://openweathermap.org/img/wn/02n@2x.png" :
whertherCode === 3  ? "https://openweathermap.org/img/wn/03n@2x.png" :
whertherCode === 45 ? "https://openweathermap.org/img/wn/50d@2x.png" :
whertherCode === 48 ? "https://openweathermap.org/img/wn/50n@2x.png":
whertherCode === 51 ? "https://openweathermap.org/img/wn/10d@2x.png" :
whertherCode === 53 ? "https://openweathermap.org/img/wn/10d@2x.png" :
whertherCode === 55 ? "https://openweathermap.org/img/wn/09d@2x.png" :
whertherCode === 56 ? "https://openweathermap.org/img/wn/10n@2x.png" :
whertherCode === 57 ? "https://openweathermap.org/img/wn/10n@2x.png" :
whertherCode === 61 ? "style/assets/weather/others/rainy.png" :
whertherCode === 63 ? "style/assets/weather/others/rainy.png" :
whertherCode === 65 ? "https://openweathermap.org/img/wn/10d@2x.png" :
whertherCode === 66 ? "https://openweathermap.org/img/wn/10n@2x.png" :
whertherCode === 67 ? "https://openweathermap.org/img/wn/10n@2x.png" :
whertherCode === 71 ? "https://openweathermap.org/img/wn/13n@2x.png" :
whertherCode === 73 ? "https://openweathermap.org/img/wn/13n@2x.png" :
whertherCode === 75 ? "https://openweathermap.org/img/wn/13d@2x.png" :
whertherCode === 77 ? "https://openweathermap.org/img/wn/13n@2x.png" :
whertherCode === 80 ? "https://openweathermap.org/img/wn/10d@2x.png" :
whertherCode === 81 ? "https://openweathermap.org/img/wn/10d@2x.png" :
whertherCode === 82 ? "https://openweathermap.org/img/wn/11d@2x.png" :
whertherCode === 85 ? "https://openweathermap.org/img/wn/13n@2x.png" :
whertherCode === 86 ? "https://openweathermap.org/img/wn/13n@2x.png" :
whertherCode === 95 ? "https://openweathermap.org/img/wn/11d@2x.png" :
whertherCode === 96 ? "https://openweathermap.org/img/wn/11d@2x.png" :
whertherCode === 99 ? "https://openweathermap.org/img/wn/11d@2x.png" :
"style/assets/weather/others/thermometer.png";
            $.getElementById("theWeather").textContent = `${temperature}°C`
            $.getElementById("emojiofWheter").src = `${wetherEmoj}`
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
//for stable viues
let line  =$.getElementsByClassName("prayerTime")[0]
let theOptions= $.getElementsByClassName("theOptions")[0]
let bord= $.getElementsByClassName("bord")[0]
let allLines = [line,theOptions,bord]
let principaTime = $.getElementsByClassName("principalTime")[0]
let deviceCker = navigator.userAgent
let rerIphone = /iPhone/
let refAndroid= /Android/
let tv = /TV/
let styleElement = $.getElementById("styleType")
if(rerIphone.test(deviceCker) === true){
styleElement.href="style/stylePhone.css"
}
if(refAndroid.test(deviceCker) === true ){
    if(tv.test(deviceCker) === false){
styleElement.href="style/stylePhone.css"

}}
