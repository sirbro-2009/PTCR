let $ = document
if(localStorage.getItem("adhkar") !==null){
localStorage.getItem("adhkar").split(",").forEach((e)=>{
let h1 = $.createElement("h1")
h1.id = "h1"
h1.textContent = e
$.getElementById("adkars").appendChild(h1)
})
}


if(localStorage.getItem("bgImg")!==null){
$.body.style.background = `url(${localStorage.getItem("bgImg")}`

$.body.style.backgroundSize = "cover"

}
setTimeout((_)=>{
        window.location.href = "index.html"
    },localStorage.getItem("dur")||10000)
