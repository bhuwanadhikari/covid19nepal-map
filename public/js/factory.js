function getWholeData(inputCsv) {
    /* Split input string by `,` and clean up each item */
    const arrayCsv = inputCsv.split('\n').map(s => s.replace(/"/gi, '').trim())
    const byDistrict = [];
    let i = 0;
    for (let districtData of arrayCsv) {
        if (i > arrayCsv.length - 77 - 1) {
            const splitedArr = districtData.split(',')
            //Edit the districtName of Rukums
            if (splitedArr[2].toLowerCase() == 'eastern rukum') {
                splitedArr[2] = 'eastRukum';
            }
            if (splitedArr[2].toLowerCase() == 'western rukum') {
                splitedArr[2] = 'westRukum';
            }
            byDistrict.push({
                id: splitedArr[1],
                district: splitedArr[2][0].toLowerCase() + splitedArr[2].slice(1),
                cases: parseInt(splitedArr[3]),
                deaths: parseInt(splitedArr[4]),
                recovered: parseInt(splitedArr[5])
            })
        }

        i++;
    }

    let byProvince = {}

    const allDists = $('.district');
    for (let aDist of allDists) {
        const classes = aDist.className.baseVal;
        const [, distName, provinceName] = classes.split(' ');


        const temp = byProvince[provinceName]
        const cases = byDistrict.find(el => el.district == distName).cases;
        const deaths = byDistrict.find(el => el.district == distName).deaths;
        const recovered = byDistrict.find(el => el.district == distName).recovered;
        byProvince = {
            ...byProvince,
            [provinceName]: {
                ...temp,
                province: provinceName,
                cases: temp ? temp.cases + cases : cases,
                deaths: temp ? temp.deaths + deaths : deaths,
                recovered: temp ? temp.recovered + recovered : recovered
            }
        }
    }

    const byCountry = {
        cases: 0,
        deaths: 0,
        recovered: 0

    }

    for (let i in byProvince) {
        byCountry.cases += byProvince[i].cases;
        byCountry.deaths += byProvince[i].deaths;
        byCountry.recovered += byProvince[i].recovered;
    }


    // console.log(cases);
    // byProvince = {
    //     ...byProvince,
    //     :
    // }

    return {
        byCountry,
        byProvince,
        byDistrict
    };
}

const updateTableData = (className, whatWise, data) => {


    if (whatWise === 'district') {
        const districtData = data.find(el => el.district == className);
        $('.cases-value').text(districtData.cases)
        $('.death-value').text(districtData.deaths)
        $('.recovered-value').text(districtData.recovered)
    }
    if (whatWise === 'province') {
        $('.cases-value').text(data[className].cases)
        $('.death-value').text(data[className].deaths)
        $('.recovered-value').text(data[className].recovered)
    }
    if (whatWise === 'country') {

        $('.cases-value').text(data.cases)
        $('.death-value').text(data.deaths)
        $('.recovered-value').text(data.recovered)

    }
}

const getMaxValue = (data, displayType) => {

    console.log(data);
    let maxVal = 0;
    if (displayType === 'district') {
        const distData = data.byDistrict;
        //get max-cases distirct
        for (let aDistrict of distData) {
            if (maxVal < aDistrict.cases) {
                maxVal = aDistrict.cases;
            }
        }

    } else {
        const provData = data.byProvince;
        for (let aProv of provData) {
            if (maxVal < aProv.cases) {
                maxVal = aProv.cases;
            }
        }
    }
    return maxVal
}


const concertrationColors = {
    zero: '#f8f8f8',
    low: '#ef9c86',
    medium: '#eb706b',
    high: '#e64952',
    higher: '#af3435'
}

const getConcColor = (data, displayType, regionName, maxVal) => {



    let fillColor = 'white';
    if (displayType === 'district') {
        //if shown disrict wise
        const distData = data.byDistrict;
        const district = distData.find(el => el.district === regionName)
        const q = district.cases / maxVal * 100;
        $(`.${regionName}-label`)[0].style.fill = 'black'

        if (q > 0 && q <= 25) {
            fillColor = concertrationColors.low;
        } else if (q > 25 && q <= 50) {
            fillColor = concertrationColors.medium;
        } else if (q > 50 && q <= 75) {
            fillColor = concertrationColors.high;
        } else if (q > 75 && q <= 100) {
            fillColor = concertrationColors.higher;
        } else {
            $(`.${regionName}-label`)[0].style.fill = 'black'
        }

        $(`.${district.district}`)[0].style.fill = fillColor;

    } else {
        //if shown  province wise
        const provData = data.byProvince;
        const province = provData.find(el => provData[el] === regionName)
        const p = province.cases / maxVal * 100;

        $(`.${regionName}-label`)[0].style.fill = 'white'
        if (p > 0 && p <= 25) {
            fillColor = concertrationColors.low;
        } else if (p > 25 && p <= 50) {
            fillColor = concertrationColors.medium;
        } else if (p > 50 && p <= 75) {
            fillColor = concertrationColors.high;
        } else if (p > 75 && p <= 100) {
            fillColor = concertrationColors.higher;
        } else {
            $(`.${regionName}-label`)[0].style.fill = 'black'
        }

        $(`.${province.province}`)[0].style.fill = fillColor;
    }
}


