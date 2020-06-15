

function getWholeData(inputCsv) {
    // function getWholeData(inputJson) {
    /* Split input string by `,` and clean up each item */
    // console.log(inputJson);
    const byDistrict = [];


    // const jillaharu = []
    // const jillEls = $('.district');
    // for (let jilla of jillEls){
    //     const jillaName = jilla.className.baseVal.split(' ')[1];
    //     for( let aP of inputJson){
    //         for(let aD of aP.districtData){
    //             if(aD.confirmed>0){
    //                 byDistrict.push({
    //                     id: 10,
    //                     district: aD.district,
    //                     cases: aD.confirmed,
    //                     deaths: ,
    //                     recovered: ,
    //                 })
    //             }
    //         }
    //     }
    // }


    // const arrayCsv = inputCsv.split('\n').map(s => s.replace(/"/gi, '').trim())
    const arrayCsv = inputCsv
    let i = 0;
    for (let districtData of arrayCsv) {
        // if (i > arrayCsv.length - 77 - 1) {
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
        // }

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
        $('.deaths-value').text(districtData.deaths)
        $('.recovered-value').text(districtData.recovered)
    }
    if (whatWise === 'province') {
        $('.cases-value').text(data[className].cases)
        $('.deaths-value').text(data[className].deaths)
        $('.recovered-value').text(data[className].recovered)
    }
    if (whatWise === 'country') {


        console.log(" showing country wise")
        console.log(data.deaths)
        $('.cases-value').text(data.cases)
        $('.deaths-value').text(data.deaths)
        $('.recovered-value').text(data.recovered)

    }
}

const getMaxValue = (data, displayType) => {

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
        for (let i in provData) {
            if (maxVal < provData[i].cases) {
                maxVal = provData[i].cases;
            }
        }
    }
    return maxVal
}


const concertrationColors = {
    zero: '#fff',
    green: '#8BFBC6',
    grey: '#E5D139',
    a:"#FBEEE6",
    b:"#F6DDCC",
    c:"#EDBB99",
    d:"#E59866",
    e:"#DC7633",
    f:"#D35400",
    g:"#BA4A00",
    h:"#A04000",
    i:"#873600",
    j:"#6E2C00",
    grey: '#D2B4DE '
}



const getConcColor = (data, displayType, regionName, maxVal) => {
    // let fillColor = 'white';


const fillColor = (qVal, rVal, dVal) => {
        if (qVal === 0) return concertrationColors.zero;
        if (qVal === rVal+dVal) return concertrationColors.green;
        if (qVal === dVal) return concertrationColors.grey;
        if (qVal > 0 && qVal <= 1) return concertrationColors.a;
        if (qVal > 1 && qVal <= 2) return concertrationColors.b;
        if (qVal > 2 && qVal <= 4) return concertrationColors.c;
        if (qVal > 4 && qVal <= 8) return concertrationColors.d;
        if (qVal > 8 && qVal <= 16) return concertrationColors.e;
        if (qVal > 16 && qVal <= 32) return concertrationColors.f;
        if (qVal > 32 && qVal <= 64) return concertrationColors.g;
        if (qVal > 64 && qVal <= 128) return concertrationColors.h;
        if (qVal > 128 && qVal <= 256) return concertrationColors.i;
        if (qVal > 256 && qVal <= 512) return concertrationColors.j;
        return concertrationColors.zero;
    }



    if (displayType === 'district') {
        //if shown disrict wise
        const distData = data.byDistrict;
        const district = distData.find(el => el.district === regionName)
        const q = district.cases / maxVal * 100;
        const r = district.recovered / maxVal * 100;
        const d = district.deaths / maxVal * 100;
        $(`.${regionName}-label`)[0].style.fill = 'black';
        return fillColor(q, r, d)

    } else {
        //if shown  province wise
        let province = null
        const provData = data.byProvince;
        for (let prov in provData) {
            if (provData[prov].province === regionName) {
                province = provData[prov]
            }
        }
        const p = province.cases / maxVal * 100;
        const r = province.recovered / maxVal * 100;
        const d = province.deaths / maxVal * 100;
        return fillColor(p, r, d)
    }
}




