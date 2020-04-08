console.log("in another file!")
window.addEventListener("click", (e)=>{
    console.log(e.target.id, e.target.className.baseVal)
})