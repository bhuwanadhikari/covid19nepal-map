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

const updateFillColors = (dWise, pWise) => {

    if (dWise) {
        const maxVal = getMaxValue(covidInfo, 'district')
        console.log('woring from here');
        const allDistricts = $('.district')
        for (let el in allDistricts) {
            if (el < 77) {
                allDistricts[el].style.fill = getConcColor(covidInfo, 'district', allDistricts[el].className.baseVal.split(' ')[1], maxVal)
            }
        }

    }
    if (pWise) {
        const maxVal = getMaxValue(covidInfo, 'province')
        console.log(maxVal);
        console.log('woring from here');
        const allDistricts = $('.district')
        for (let el in allDistricts) {
            if (el < 77) {
                allDistricts[el].style.fill = getConcColor(covidInfo, 'province', allDistricts[el].className.baseVal.split(' ')[2], maxVal)
            }
        }
    }
}

//Fetch csv data
$.ajax({
    url: 'https://raw.githubusercontent.com/Parajulibkrm/covid19-district-data-nepal/master/CoronaNepal.csv',
}).then((res) => {
    covidInfo = getWholeData(res)
    updateTableData(null, 'country', covidInfo.byCountry)
    updateBox(covidInfo);

    updateFillColors(isDistricWise, isProvinceWise)
}).catch(err => {
    console.log(err.responseText);
})



//To show province wise
const showProvinceWise = () => {
    const allDistricts = $('.district')

    // console.log(allDistricts)
    Object.keys(allDistricts).forEach((item, index) => {
        try {
            const province = allDistricts[item].className.baseVal.split(' ')[2]
            allDistricts[item].style.fill = stateColors[province]
            allDistricts[item].style['stroke-width'] = '0px'
            $('.district-label').css('display', 'none')
            $('.province-label').css('display', 'block')

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
            allDistricts[item].style['stroke-width'] = '1px'
            $('.province-label').css('display', 'none')
            $('.district-label').css('display', 'block')

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








function addDistrictLabel(p, textVal, dName) {
    var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var b = p.getBBox();


    let trY = 0
    let trX = 0;

    if (textVal === 'DR' ||
        textVal === 'BU' ||
        textVal === 'MG' ||
        textVal === 'WR' ||
        textVal === 'CH' ||
        textVal === 'SY' ||
        textVal === 'MY' ||
        textVal === 'BG' ||
        textVal === 'NU') { trY = 7; }

    if (textVal === 'DH') { trY = 25; trX = -10 }
    if (textVal === 'RS') { trX = -15 }
    if (textVal === 'NW') { trX = -10 }
    if (textVal === 'DK') { trY = 10; trX = -10 }
    if (textVal === 'RM') { trY = 20; trX = -15 }
    if (textVal === 'AC') { trX = -10; }
    if (textVal === 'AR') { trX = 10; }
    if (textVal === 'TR') { trX = -10; }
    if (textVal === 'WR') { trX = -10; }
    if (textVal === 'OK') { trX = -10; }
    if (textVal === 'SI') { trY = -10; }
    if (textVal === 'MH') { trX = -5; }
    if (textVal === 'DN') { trX = -10; }
    if (textVal === 'RT') { trX = -10; }
    if (textVal === 'UD') { trY = 15; }
    if (textVal === 'KH') { trY = -5; }
    if (textVal === 'PB') { trY = -5; }
    if (textVal === 'PR') { trX = 5; }


    t.setAttribute("transform", "translate(" + (b.x + b.width / 2 - 5 + trX) + " " + (b.y + b.height / 2 + 5 + trY) + ")");

    if (textVal != 'KTM' && textVal != 'LL' && textVal != 'BK') {
        t.textContent = textVal;

    }

    t.setAttribute("fill", "black");
    t.setAttribute("class", `district-label ${dName}-label`);
    t.setAttribute("font-size", "0.9em");
    p.parentNode.insertBefore(t, p.nextSibling);
}




function addProvinceLabel(p, textVal, pName) {



    var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var b = p.getBBox();


    let trY = 0;
    let trX = 0;
    let provinceLabel = '';
    if (textVal === '1') { trY = 40; trX = 40;; provinceLabel = 'Province 1' }
    if (textVal === '2') { trY = 0; trX = -100; provinceLabel = 'Province 2' }
    if (textVal === '3') { trY = 25; trX = 80; provinceLabel = 'Bagmati' }
    if (textVal === '4') { trY = 0; trX = 10; provinceLabel = 'Gandaki' }
    if (textVal === '5') { trY = 80; trX = 10; provinceLabel = 'Province 5' }
    if (textVal === '6') { trY = -95; trX = -30; provinceLabel = 'Karnali' }
    if (textVal === '7') { trY = -30; trX = -120; provinceLabel = 'Sudurpashim' }

    t.setAttribute("transform", "translate(" + (b.x + b.width / 2 + trX) + " " + (b.y + b.height / 2 + trY) + ")");
    t.textContent = provinceLabel;



    t.setAttribute("fill", "black");
    t.setAttribute("class", `province-label ${pName}-label`);
    p.parentNode.insertBefore(t, p.nextSibling);
}
var districtPaths = $('.district');
for (var p of districtPaths) {
    addDistrictLabel(p, p.className.baseVal.split(' ')[3], p.className.baseVal.split(' ')[1])
}



var provincePaths = $('.state-boundary');
for (var p of provincePaths) {
    addProvinceLabel(p, p.className.baseVal.split(' ')[1], p.className.baseVal.split(' ')[2])
}


//State wise or district wise?
const mapWidth = $('.nepal-svg').width()

$('.state-boundary').css('stroke', '#87a0e9')
$('.nation_boundary').css('stroke', '#87a0e9')
$('.nation_boundary').css('stroke-width', '2px')
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
    updateFillColors(isDistricWise, isProvinceWise)

})





