console.log("in another file!")
window.addEventListener("click", (e) => {
    // console.log(e.target.id, e.target.className.baseVal)
})
const stateColors = {
    ekk: '#e6b9f2',
    dui: '#e2f284',
    bagmati: '#fffc9a',
    gandaki: '#ffca75',
    lumbini: '#e6b9f2',
    karnali: '#fffc9a',
    sudurpashchim: '#e2f284'
}

const hoverStateColors = {
    ekk: '#a668b7',
    dui: '#a3b925',
    bagmati: '#f1e900',
    gandaki: '#ffac26',
    lumbini: '#a668b7',
    karnali: '#f1e900',
    sudurpashchim: '#a3b925'
}


//Hovering over the state when the zoom is low
$('.district').hover((e) => {

    const mapWidth = $('.nepal-svg').width()
    if (mapWidth < 500) {
        const province = e.target.className.baseVal.split(' ')[2]
        $(`.${province}`).css('fill', '#ff4500')
    }
}, (e) => {

    const mapWidth = $('.nepal-svg').width()
    if (mapWidth < 500) {

        const province = e.target.className.baseVal.split(' ')[2]
        $(`.${province}`).css('fill', stateColors[province])
    }
})

// //management of margin
// $(window).bind('resize', (e) => {
//     //change the margin
//     const mapWidth = $('.nepal-svg').width()
//     const windowWidth = $(window).width()
//     const marginValue = (windowWidth - mapWidth) / 2
//     console.log(mapWidth, windowWidth, marginValue);
//     $('.nepal-svg').css({
//         'left': `${marginValue}px`,
//     })
// })


const mapWidth = $('.nepal-svg').width()
if (mapWidth > 500) {
    //show districts with their respective colors

} else {
    //show only states with respective colors\
    const allDistricts = $('.district')
    
    // console.log(allDistricts)
    Object.keys(allDistricts).forEach((item, index)=>{
        try{
            const province = allDistricts[item].className.baseVal.split(' ')[2]
            allDistricts[item].style.fill = stateColors[province]
        }catch(err){
            console.log(err)
        }
    })

    // const province = e.target.className.baseVal.split(' ')[2] 
}

//Handle the clicking of zoom plus
$('.plus').bind('click', (e)=>{
    console.log('zoom clicked');
})


