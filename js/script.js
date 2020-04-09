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

$('.district').hover((e) => {
    console.log(e.target.className.baseVal)
    const province = e.target.className.baseVal.split(' ')[2]
    console.log(province)
    $(`.${province}`).css('fill', 'green')
}, (e) => {
    console.log(e.target.className.baseVal)
    const province = e.target.className.baseVal.split(' ')[2]
    console.log(province)
    $(`.${province}`).css('fill', stateColors[province])
})