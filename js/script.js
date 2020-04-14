let covidInfo = {}

$.ajax({
    url: 'https://raw.githubusercontent.com/Parajulibkrm/covid19-district-data-nepal/master/CoronaNepal.csv',
}).done((res)=>{
    covidInfo = getWholeData(res)
}).catch(err=>{
    console.log(err.responseText);
})

//@@@Helper functions@@@


//To show province wise
const showProvinceWise = () => {
    const allDistricts = $('.district')

    // console.log(allDistricts)
    Object.keys(allDistricts).forEach((item, index) => {
        try {
            const province = allDistricts[item].className.baseVal.split(' ')[2]
            allDistricts[item].style.fill = stateColors[province]
            allDistricts[item].style['stroke-width'] = 0
        } catch (err) {
            // console.log(err)
        }
    })
}

//To show district wise
const showDistrictWise = () => {
    const allDistricts = $('.district')

    // console.log(allDistricts)
    Object.keys(allDistricts).forEach((item, index) => {
        try {
            const province = allDistricts[item].className.baseVal.split(' ')[2]
            allDistricts[item].style.fill = stateColors[province]
            allDistricts[item].style['stroke-width'] = 1
        } catch (err) {
            // console.log(err)
        }
    })
}




//Show hovered area separately
const showHovered = (hoveredClass) => {
    if (hoveredClass == null) {
            $('.hover-title').text(`Nepal`)
        //update table by country
        updateTableData(hoveredClass, 'country', covidInfo.byCountry)
        return;
    }

    $('.hover-details').css('display', 'block');

    if (isProvinceWise) {
        $('.hover-title').text(`${hoveredClass[0].toUpperCase() + hoveredClass.slice(1)} Province`)
        //update table by province

        updateTableData(hoveredClass, 'province', covidInfo.byProvince)


    } else if (isDistricWise) {

        // console.log(hoveredClass, 'district', covidInfo.byDistrict);
        $('.hover-title').text(`${hoveredClass[0].toUpperCase() + hoveredClass.slice(1)} District`)
        //update table by district
        updateTableData(hoveredClass, 'district', covidInfo.byDistrict)

    }
}

var isDistricWise = false;
var isProvinceWise = false;

const stateColors = {
    "province-1": '#de98eb',
    "province-2": '#f2a55a',
    bagmati: '#6ac45b',
    gandaki: '#f2a55a',
    "province-5": '#de98eb',
    karnali: '#6ac45b',
    sudurpashchim: '#28a6f5'
}

const hoverStateColors = {
    "province-1": '#a668b7',
    "province-2": '#a3b925',
    bagmati: '#f1e900',
    gandaki: '#ffac26',
    "province-5": '#a668b7',
    karnali: '#f1e900',
    sudurpashchim: '#a3b925'
}


$('.district').hover((e) => {

    if (isProvinceWise) {
        const province = e.target.className.baseVal.split(' ')[2]
        $(`.${province}`).css('fill-opacity', '0.7')
        showHovered(province)
    } else {
        const districtName = e.target.className.baseVal.split(' ')[1]
        $(`.${districtName}`).css('fill-opacity', '0.7')
        showHovered(districtName)
    }
}, (e) => {
    if (isProvinceWise) {
        const province = e.target.className.baseVal.split(' ')[2]
        $(`.${province}`).css('fill-opacity', '1')
        showHovered(null)
    } else {
        const districtName = e.target.className.baseVal.split(' ')[1]
        $(`.${districtName}`).css('fill-opacity', '1')
        showHovered(null)


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

//State wise or district wise?
const mapWidth = $('.nepal-svg').width()
if (mapWidth > 500) {
    //show districts with their respective colors
    isDistricWise = true
    isProvinceWise = false
    showDistrictWise();
    $('#map-button-text').text('Show Province Wise')

} else {
    //show only states with respective colors\
    isDistricWise = false
    isProvinceWise = true
    showProvinceWise();
    $('#map-button-text').text('Show District Wise')
    // const province = e.target.className.baseVal.split(' ')[2] 
}




//Handle button press

$('.button-district').bind('click', (e) => {
    isDistricWise = !isDistricWise;
    isProvinceWise = !isProvinceWise;
    if (isProvinceWise) {
        $('#map-button-text').text('Show District Wise')
        showProvinceWise()
    } else {
        $('#map-button-text').text('Show Province Wise')
        showDistrictWise()
    }
})





