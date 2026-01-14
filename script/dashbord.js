
let $ = document 
//window.localStorage.clear()
//change profile img
let imgInput = $.getElementById("profileImg")
let profileImg= $.getElementById("theUser")
function check(){
if(window.localStorage.getItem("userImg") === null){
profileImg.src ="style/assets/user/user.png"
}
else{
    profileImg.src =    window.localStorage.getItem("userImg") 
}
}
check()

//change user name
let nameInput = $.getElementById("inputName")
let nameDisplay = $.getElementById("userName")
function nameCheck(){
if(window.localStorage.getItem("user") === null){
nameDisplay.textContent = "unknow"
}
else{
nameDisplay.textContent = window.localStorage.getItem("user")
}
}
nameCheck()
//log out
let logoutBuuton = $.getElementById("logOut")
logoutBuuton.onclick = function(){
localStorage.removeItem("userImg")
localStorage.removeItem("user")
location.reload()
}
//uptade button
let uptade = $.getElementById("uptade")
uptade.onclick = function(){
//uptade img
if(imgInput.files[0] !== undefined){
const read = new FileReader()
read.onload = (_)=>{
read.result
window.localStorage.setItem("userImg",read.result)
}
read.readAsDataURL(imgInput.files[0])
check()
location.reload()
}
//uptade name
if(nameInput.value !== ""){
window.localStorage.setItem("user",nameInput.value)

}
nameCheck()
}
//back to home
let back = $.getElementById("back")
back.onclick = (_)=>{
    window.location.href = "index.html"
}
//style
//example
let exampleDiv=$.getElementById("example")
let colorValue = $.getElementById("color")
let uptadeTwo = $.getElementById("uptadeTwo") 
colorValue.onchange = (_)=>{
    exampleDiv.style.cssText = `background: color-mix(in srgb, ${colorValue.value} 60%, transparent 40%);`
}
if(localStorage.getItem("pboxBg") === null){
exampleDiv.style.cssText = "background: color-mix(in srgb, gold 60%, transparent 40%);"
}
else{
exampleDiv.style.cssText = `background: color-mix(in srgb, ${localStorage.getItem("pboxBg")} 60%, transparent 40%);`
colorValue.value = localStorage.getItem("pboxBg")
}
//fg
let timesNamee = $.querySelector(".timesNamee")
let fgValue = $.getElementById("fColor")
fgValue.onchange = (_)=>{
    timesNamee.style.color = fgValue.value
}

if(localStorage.getItem("fg") === null){
timesNamee.style.cssText = " color: #573617;"
}
else{
timesNamee.style.cssText = ` color: ${localStorage.getItem("fg")};`
fgValue.value = localStorage.getItem("fg")
}
//principal bg
let prince = $.getElementById("principalTime")
let pValue = $.getElementById("pColor")
pValue.onchange = (_)=>{
    prince.style.cssText = `    background: color-mix(in srgb, ${pValue.value} 60%, transparent 40%);`
}

if(localStorage.getItem("pBg") === null){
prince.style.cssText =     `background: color-mix(in srgb, #6B4423 60%, transparent 40%);`
}
else{
prince.style.cssText = `background: color-mix(in srgb, ${localStorage.getItem("pBg")} 60%, transparent 40%);`
pValue.value =     localStorage.getItem("pBg")
}
//bg
//setup buttons

let b1 = $.getElementById("b1")
let b2 = $.getElementById("b2")
let b3 = $.getElementById("b3")
let b4 = $.getElementById("b4")
let b5 = $.getElementById("b5")
let b6 = $.getElementById("b6")
let b7 = $.getElementById("b7")
let b8 = $.getElementById("b8")
let b11 = $.getElementById("b11")
let b22 = $.getElementById("b22")
let b33 = $.getElementById("b33")
let b44 = $.getElementById("b44")
let b55 = $.getElementById("b55")
let b66 = $.getElementById("b66")
let b77 = $.getElementById("b77")
let b88 = $.getElementById("b88")
let allB = [b1,b2,b3,b4,b5,b6,b7,b8,b11,b22,b33,b44,b55,b66,b77,b88]
//setup imgs
let aqsa = "style/assets/bg/mosquesBg/aqsa.jpg"
let mecca1 = "style/assets/bg/mosquesBg/mecca.jpg"
let maddina = "style/assets/bg/mosquesBg/maddina.jpeg"
let mecca4 = "style/assets/bg/mosquesBg/mecca3.jpg"
let mecca5 = "style/assets/bg/mosquesBg/mecca4.jpg"
let mecca6 = "style/assets/bg/mosquesBg/mecca6.jpg"
let mosque = "style/assets/bg/mosquesBg/mosqe.jpg"
let turke = "style/assets/bg/mosquesBg/turk.jpg"
let nB1 = "style/assets/bg/normalBg/5960807393421626622.jpg"
let nB2 = "style/assets/bg/normalBg/a.jpg"
let nB3 = "style/assets/bg/normalBg/bg1.jpg"
let nb4 = "style/assets/bg/normalBg/b.jpg"
let nB5 = "style/assets/bg/normalBg/c.jpg"
let nB6 = "style/assets/bg/mosquesBg/mecca5.jpg"
let nB7 = "style/assets/bg/rayaBg/black.png"
let nB8 = "style/assets/bg/rayaBg/white.jpg"
let allImg = [aqsa,mecca1,maddina,mecca4,mecca5,mecca6,mosque,turke,nB1,nB2,nB3,nb4,nB5,nB6,nB7,nB8]
//loop
for(let i = 0;i<allImg.length;++i){
    bgImg(allB[i],allImg[i])

}

//img fucntion
function bgImg(button,backGround){
button.onclick =(_)=>{
$.body.style.cssText = `background: url(${backGround});background-repeat: no-repeat;background-size: cover;`    
localStorage.setItem("bgImg",backGround)
}
if(localStorage.getItem("bgImg") !== null){
$.body.style.cssText = `background: url(${localStorage.getItem("bgImg")});background-repeat: no-repeat;background-size: cover;`
}
}
//upload img
let imgFile = $.getElementById("imgFile")
imgFile.onchange  = (_)=>{
    
if(imgFile.files[0] !== undefined){
    const read = new FileReader()
read.onload = (_)=>{

localStorage.setItem("bgImg",read.result)
    $.body.style.background = `url(${localStorage.getItem("bgImg")})`
}
read.readAsDataURL(imgFile.files[0])
}
location.reload()
}
uptadeTwo.onclick = (_)=>{
localStorage.setItem("fg",fgValue.value)
localStorage.setItem("pboxBg",colorValue.value)
localStorage.setItem("pBg",pValue.value)
}
//resetbutton
let reset = $.getElementById("reset")
reset.onclick = (_)=>{
localStorage.setItem("fg","#2b1c11")
localStorage.setItem("pboxBg","#ffd700")
localStorage.setItem("pBg","#6B4423")
localStorage.removeItem("bgImg")
location.reload()
}
//method
let theMethod = $.getElementById("theMethods")
theMethod.onclick = (_)=>{
    let theM  = theMethod.value
    window.localStorage.setItem("id",theM)
    
}
//mosque name
let mName = $.getElementById("mName")
mName.onchange = (_)=>{
    localStorage.setItem("mName",mName.value)
}
//icamaValue
let FadjrIcama = $.getElementById("FadjrIcama")
let DhuhrIcama = $.getElementById("DhuhrIcama")
let AsrIcama = $.getElementById("AsrIcama")
let MaghribIcama = $.getElementById("MaghribIcama")
let IshaIcama = $.getElementById("IshaIcama")
let allTimes=[FadjrIcama,DhuhrIcama,AsrIcama,MaghribIcama,IshaIcama]
allTimes.forEach((e)=>{
e.oninput = (_)=>{
if(Number(e.value)<0 || Number(e.value) === NaN){
e.value = "0"
alert("You can add that value")
}
else{
localStorage.setItem(e.id,e.value)
}
}
})
"test"
//adkhar
let adhkars  = $.getElementById("adhkar")
adhkars.onchange = (_)=>{
    console.log(adhkars.value.split("\n"))
    localStorage.setItem("adhkar",adhkars.value.split("\n"))
}
//adkar period
let sec = $.getElementById("sec")
let mi = $.getElementById("mi")
let ho = $.getElementById("ho")
let allInputs = [sec,mi,ho]
allInputs.forEach((e)=>{
    e.oninput = (_)=>{
        if(e.id === "sec" ){
        localStorage.setItem("dur",parseInt(e.value)*1000)
        }
        else if(e.id=== "mi"){
        localStorage.setItem("dur",parseInt(e.value)*60*1000)
        }
        else if(e.id === "ho"){
        localStorage.setItem("dur",parseInt(e.value)*60*60*1000)
        }
    }
})
//adkar deplay 
let displayTime = $.getElementById("displayTime")
displayTime.oninput = (_)=>{
    let time = displayTime.value.split(":")
    let hourss = parseInt(time[0])*60*60*1000
    let mins = parseInt(time[1])*60*1000
    let allmillTime = hourss+mins
    localStorage.setItem("displayTime",allmillTime)
}
//even and mroning adhkar
let mornAdhkar = $.getElementById("mornAdhkar")
let evenAdhkar = $.getElementById("evenAdhkar")

mornAdhkar.onchange = (_)=>{
let value= mornAdhkar.checked
localStorage.setItem("adhkarValue",value)
}
evenAdhkar.onchange = (_)=>{
let value= evenAdhkar.checked
localStorage.setItem("adhkarValue2",value)
}
//dashbord elemnt selects
let div1 = $.getElementById("accont")
let div2 = $.getElementById("styles")
let div3 = $.getElementById("method")
let div4 = $.getElementById("smI")
let div5 = $.getElementById("values")
let div6 = $.getElementById("questions")
let everyDiv = [div1,div2,div3,div4,div5,div6]

//
let li1 = $.querySelector('[data="one"]')
let li2 = $.querySelector('[data="two"]')
let li3 = $.querySelector('[data="three"]')
let li4 = $.querySelector('[data="four"]')
let li5 = $.querySelector('[data="five"]')
let li6 = $.querySelector('[data="six"]')
let allLi = [li1,li2,li3,li4,li5,li6]
for(let i = 0;i<allLi.length;++i){
    clicker(allLi[i],everyDiv[i])
}
function clicker(liName,divName){

liName.onclick = (_)=>{
divName.classList.add("Setup")
divName.classList.remove("desactive")
everyDiv.forEach((e)=>{
    if(e !== divName){
            e.classList.add("desactive")
    e.classList.remove("Setup")
    }

})
}
}

//offset pray time
let FadjrOffset = $.getElementById("FadjrOffset")
let DhuhrOffset = $.getElementById("DhuhrOffset")
let AsrOffset = $.getElementById("AsrOffset")
let MaghribOffset = $.getElementById("MaghribOffset")
let IshaOffset = $.getElementById("IshaOffset")
let ImsakOffset = $.getElementById("ImsakOffset")
let listOffset = [FadjrOffset,DhuhrOffset,AsrOffset,MaghribOffset,IshaOffset,ImsakOffset]
listOffset.forEach((e)=>{
e.oninput= ()=>{
localStorage.setItem(e.id,e.value)
}
})
//madhab
let optionsMadhab = $.getElementById("madhab")
optionsMadhab.onchange = ()=>{
    localStorage.setItem("madhabValue",optionsMadhab.value)
}
//place
let localPlace = $.getElementById("localPlace")
localPlace.oninput = ()=>{
    fetch(`https://nominatim.openstreetmap.org/search?q=${localPlace.value}&format=json`).then(
        (data)=>{
        let userData = data.json()
        return userData
        }
    ).then(
        (allData)=>{
            let lon = allData[0].lon
            localStorage.setItem("log",lon)
            let lat = allData[0].lat
            localStorage.setItem("lat",lat)
            let cityName = allData[0].name
            localStorage.setItem("nameCity",cityName)
        })
}
let theReset = $.getElementById("theReset")
theReset.onclick = ()=>{
remove("log")
remove("lat")
remove("nameCity")
}
function remove(para){
    localStorage.removeItem(para)
}
