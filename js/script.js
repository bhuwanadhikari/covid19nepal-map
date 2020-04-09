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


//Hovering over the state when the zoom is low
$('.district').hover((e) => {
    const province = e.target.className.baseVal.split(' ')[2]
    $(`.${province}`).css('fill', 'green')
}, (e) => {
    const province = e.target.className.baseVal.split(' ')[2]
    $(`.${province}`).css('fill', stateColors[province])
})

//
$(window).bind('resize', (e) => {
    //change the margin
    const mapWidth = $('.nepal-svg').width()
    const windowWidth = $(window).width()
    const marginValue = (windowWidth - mapWidth) / 2
    console.log(mapWidth, windowWidth, marginValue);
    $('.nepal-svg').css({
         'left': `${marginValue}px`,
         })
})