let $ = document
//style
if(localStorage.getItem("bgImg")!==null){
$.body.style.background = `url(${localStorage.getItem("bgImg")}`
$.body.style.backgroundRepeat = "no-repeat"
$.body.style.backgroundSize = "cover"

}

setTimeout(() => {
$.getElementById("adhan").style.display = "none"
$.getElementById("afterAdhan").style.display = "flex"
}, 120000);
setTimeout(()=>{
$.getElementById("afterAdhan").style.display = "none"
$.getElementById("adhan1").style.display = "flex"
},180000)
setTimeout(() => {
window.location.href = "index.html"   
}, 240000);
//180000