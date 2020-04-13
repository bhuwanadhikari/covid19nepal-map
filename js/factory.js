function getWholeData(inputCsv) {
    /* Split input string by `,` and clean up each item */
    const arrayCsv = inputCsv.split('\n').map(s => s.replace(/"/gi, '').trim())
    const outputJson = [];
    let i = 0;
    for (let districtData of arrayCsv) {
        if(i>arrayCsv.length-77-1){
             const splitedArr = districtData.split(',')
        outputJson.push({
            id: splitedArr[1],
            district: splitedArr[2].toLowerCase(),
            cases: parseInt(splitedArr[3]),
            deaths: parseInt(splitedArr[4]),
            recovered: parseInt(splitedArr[5])
        })
        }
       
        i++;
    }
    console.log(outputJson);

    const byProvince = {}

    const allDists = $('.district');
    for(let aDist of allDists){
        const classes = aDist.className.baseVal;
        console.log(classes);
        byProvince.append({
            ...byProvince,
            [classes[2]]: {
                
            }
        })
    }
    return outputJson;
}

function getByProvince(){

}
