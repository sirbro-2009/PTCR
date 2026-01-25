let $ = document
///
let icamLocal = localStorage.getItem("icamaCurtlly")
//prayer 
let fadjTime = localStorage.getItem("fadjTime")
let DhuhrTime = localStorage.getItem("DhuhrTime")
let Asr=localStorage.getItem("Asr")
let magreb = localStorage.getItem("magreb")
let Isha = localStorage.getItem("Isha")
let allTimes = [fadjTime,DhuhrTime,Asr,magreb,Isha]

//ishaIcama magIcama assrIcama dhurIcama fadjrIcama
let ishaIcama = localStorage.getItem("IshaIcama")||2
let magIcama=localStorage.getItem("MaghribIcama")||2
let assrIcama = localStorage.getItem("AsrIcama")||2
let dhurIcama = localStorage.getItem("DhuhrIcama")||2
let fadjrIcama = localStorage.getItem("FadjrIcama")||2
let allIcama = [fadjrIcama,dhurIcama,assrIcama,magIcama,ishaIcama]
///
setInterval(() => {
for (let i = 0; i < allTimes.length; i++) {
    counter(allTimes[i],allIcama[i])
    
}
///
function counter(time,icama){
let date = new Date(Date.now())
let hours = date.getHours()<10?`0${date.getHours()}`:date.getHours()
let mins = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()
let fhpChe =`${hours}:${mins}`    
if(fhpChe === time){
    localStorage.setItem("icamaCurtlly",icama)
}
}
}, 1);
//style
if(localStorage.getItem("bgImg")!==null){
$.body.style.background = `url(${localStorage.getItem("bgImg")}`

$.body.style.backgroundSize = "cover"

}

setTimeout(() => {
$.getElementById("adhan").style.display = "none"
$.getElementById("afterAdhan").style.display = "flex"
}, 12000);
setTimeout(()=>{
$.getElementById("afterAdhan").style.display = "none"
$.getElementById("adhan1").style.display = "flex"
},18000)
allIcama.forEach((e)=>{
    if(e===null){
setTimeout(() => {
window.location.href = "index.html"   
}, 24000);
    }
    else{
setTimeout(() => {
$.getElementById("adhan1").style.display =  "none"
$.getElementById("ikama").style.display = "flex"
}, 24000);


    }
})

icamaCounter(parseInt(localStorage.getItem("icamaCurtlly"))-1||4)


function icamaCounter(value){
let secoundTest = 60
let mins = parseInt(value)
let interva = setInterval(() => {
--secoundTest
if(secoundTest< 0){
secoundTest=59
if(mins>0){
    --mins
}
else{
mins = 0
}

}

setInterval(() => {
if( mins <=0 && secoundTest === 0){
    clearInterval(interva)
}
}, 1);
let secoundValue = secoundTest>=10?secoundTest:`0${secoundTest}`
let minsValue = mins>=10?mins:`0${mins}`
$.getElementById("theCounter").textContent = `${minsValue}:${secoundValue}`
setInterval(()=>{
if(`${minsValue}:${secoundValue}` === "00:00"){
$.getElementById("ikama").style.display = "none"
$.getElementById("alert").style.display = "flex"
}
},1)

}, 100);

}
    setTimeout(() => {
    localStorage.removeItem("icamaCurtlly")
    window.location.href = "index.html"
    }, (parseInt(icamLocal)*6000+1000)||36000);
