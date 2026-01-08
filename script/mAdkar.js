let $ = document
if(localStorage.getItem("bgImg")!==null){
$.body.style.background = `url(${localStorage.getItem("bgImg")}`
$.body.style.backgroundRepeat = "no-repeat"
$.body.style.backgroundSize = "cover"

}
//adkar deplay
let countent1 = $.getElementById("countent1")
let countent = $.getElementById("countent")
setTimeout(() => {
countent1.style.display = "none"
countent.style.display = "flex"
window.scroll(100,100)
}, 10000);
setTimeout(() => {
window.location.href = "index.html"
}, 300000);