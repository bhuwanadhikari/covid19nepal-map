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
                splitedArr[2] = 'rukumEast';
            }
            if (splitedArr[2].toLowerCase() == 'western rukum') {
                splitedArr[2] = 'rukumWest';
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


