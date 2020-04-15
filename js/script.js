let covidInfo = {}
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

const updateBox = (covidData) => {

    //Empty the table first
    $('.corona-box-body').html('');

    //Appending the box title
    $('.corona-box-body').append(`
        <tr class="table-header tuple">
            <td class="row-content col0 ">S.N.</td>
            <td class="row-content col1 ">${isDistricWise ? 'Districts' : 'Provinces'}</td>
            <td class="row-content col2 ">Cases </td>
            <td class="row-content col3 ">Deaths </td>
            <td class="row-content col4  ">Recovered </td>
        </tr>`
    )


    if (isDistricWise) {
        let allDistData = covidData.byDistrict;
        allDistData = allDistData.sort((a, b) => b.cases - a.cases)

        for (let aDist of allDistData) {
            $('.corona-box-body').append(`
                 <tr class="tuple">
                    <td class="row-content col0 ">${allDistData.indexOf(aDist) + 1}</td>
                    <td class="row-content col1 district-name ">${aDist.district[0].toUpperCase() + aDist.district.slice(1)}</td>
                    <td class="row-content col2 cases-num ">${aDist.cases}</td>
                    <td class="row-content col3 deaths-num ">${aDist.deaths}</td>
                    <td class="row-content col4 recovered-num  ">${aDist.recovered}</td>
                </tr>
        `)
        }
    } else {
        let allProvinceData = covidData.byProvince;
        let allProvData = []
        for (let i in allProvinceData) {
            allProvData.push(allProvinceData[i]);
        }
        allProvData = allProvData.sort((a, b) => b.cases - a.cases);
        for (let aProv of allProvData) {

            $('.corona-box-body').append(`
                <tr class="tuple">
                    <td class="row-content col0 ">${allProvData.indexOf(aProv) + 1}</td>
                    <td class="row-content col1 province-name ">${aProv.province[0].toUpperCase() + aProv.province.slice(1)}</td>
                    <td class="row-content col2 cases-num ">${aProv.cases}</td>
                    <td class="row-content col3 deaths-num ">${aProv.deaths}</td>
                    <td class="row-content col4 recovered-num  ">${aProv.recovered}</td>
                </tr>
            `);
        }
    }


    //Appending the total footer
    $('.corona-box-body').append(`
        <tr class="table-footer tuple">
        <td class="row-content col0 ">${' '}</td>
            <td class="row-content col1 total">Total</td>
            <td class="row-content col2 cases-total ">${covidData.byCountry.cases}</td>
            <td class="row-content col3 deaths-total ">${covidData.byCountry.deaths}</td>
            <td class="row-content col4 recovered-total  ">${covidData.byCountry.recovered}</td>
        </tr>`
    )

}

$.ajax({
    url: 'https://raw.githubusercontent.com/Parajulibkrm/covid19-district-data-nepal/master/CoronaNepal.csv',
}).done((res) => {
    covidInfo = getWholeData(res)
    updateTableData(null, 'country', covidInfo.byCountry)
    updateBox(covidInfo);

}).catch(err => {
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

    //update the big
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




$('.district').hover((e) => {

    if (isProvinceWise) {
        const province = e.target.className.baseVal.split(' ')[2]
        $(`.${province} `).css('fill-opacity', '0.7')
        showHovered(province)
    } else {
        const districtName = e.target.className.baseVal.split(' ')[1]
        $(`.${districtName} `).css('fill-opacity', '0.7')
        showHovered(districtName)
    }
}, (e) => {
    if (isProvinceWise) {
        const province = e.target.className.baseVal.split(' ')[2]
        $(`.${province} `).css('fill-opacity', '1')
        showHovered(null)
    } else {
        const districtName = e.target.className.baseVal.split(' ')[1]
        $(`.${districtName} `).css('fill-opacity', '1')
        showHovered(null)


    }
})



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
    updateBox(covidInfo);
    if (isProvinceWise) {
        $('#map-button-text').text('Show District Wise')
        showProvinceWise()
    } else {
        $('#map-button-text').text('Show Province Wise')
        showDistrictWise()
    }
})





