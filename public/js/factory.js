function getWholeData(inputCsv) {
  const byDistrict = [];

  // const arrayCsv = inputCsv.split('\n').map(s => s.replace(/"/gi, '').trim())
  const arrayCsv = inputCsv;
  let i = 0;
  for (let districtData of arrayCsv) {
    // if (i > arrayCsv.length - 77 - 1) {
    const splitedArr = districtData.split(",");
    //Edit the districtName of Rukums
    if (splitedArr[2].toLowerCase() == "eastern rukum") {
      splitedArr[2] = "eastRukum";
    }
    if (splitedArr[2].toLowerCase() == "western rukum") {
      splitedArr[2] = "westRukum";
    }
    byDistrict.push({
      id: splitedArr[1],
      district: splitedArr[2][0].toLowerCase() + splitedArr[2].slice(1),
      cases: parseInt(splitedArr[3]),
      deaths: parseInt(splitedArr[4]),
      recovered: parseInt(splitedArr[5]),
    });
    // }

    i++;
  }

  let byProvince = {};

  const allDists = $(".district");
  for (let aDist of allDists) {
    const classes = aDist.className.baseVal;
    const [, distName, provinceName] = classes.split(" ");

    const temp = byProvince[provinceName];
    const cases = byDistrict.find((el) => el.district == distName).cases;
    const deaths = byDistrict.find((el) => el.district == distName).deaths;
    const recovered = byDistrict.find((el) => el.district == distName)
      .recovered;
    byProvince = {
      ...byProvince,
      [provinceName]: {
        ...temp,
        province: provinceName,
        cases: temp ? temp.cases + cases : cases,
        deaths: temp ? temp.deaths + deaths : deaths,
        recovered: temp ? temp.recovered + recovered : recovered,
      },
    };
  }

  const byCountry = {
    cases: 0,
    deaths: 0,
    recovered: 0,
  };

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
    byDistrict,
  };
}

const updateTableData = (className, whatWise, data) => {
  if (whatWise === "district") {
    const districtData = data.find((el) => el.district == className);
    $(".cases-value").text(districtData.cases.toLocaleString());
    $(".deaths-value").text(districtData.deaths.toLocaleString());
    $(".recovered-value").text(districtData.recovered.toLocaleString());
    $(".active-value").text(
      (
        districtData.cases -
        districtData.deaths -
        districtData.recovered
      ).toLocaleString()
    );
  }
  if (whatWise === "province") {
    $(".cases-value").text(data[className].cases.toLocaleString());
    $(".deaths-value").text(data[className].deaths.toLocaleString());
    $(".recovered-value").text(data[className].recovered.toLocaleString());
    $(".active-value").text(
      (
        data[className].cases -
        data[className].deaths -
        data[className].recovered
      ).toLocaleString()
    );
  }
  if (whatWise === "country") {
    $(".cases-value").text(data.cases.toLocaleString());
    $(".deaths-value").text(data.deaths.toLocaleString());
    $(".recovered-value").text(data.recovered.toLocaleString());
    $(".active-value").text(
      (data.cases - data.deaths - data.recovered).toLocaleString()
    );
  }
};

const getMaxValue = (data, displayType) => {
  let maxVal = 0;
  if (displayType === "district") {
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
  return maxVal;
};

const concertrationColors = {
  infinity: "#fff",
  zero: "#fbf4b8",
  two: "#fbc286",
  four: "#f48560",
  six: "#e65163",
  eight: "#b94879",
  ten: "#894381",
};

const getConcColor = (data, displayType, regionName, maxVal) => {
  // let fillColor = 'white';

  const fillColor = (qVal) => {
    if (qVal === 0) return concertrationColors.zero;
    if (qVal === 1) return concertrationColors.two;
    if (qVal === 2) return concertrationColors.four;
    if (qVal === 3) return concertrationColors.six;
    if (qVal === 4) return concertrationColors.eight;
    if (qVal === 5) return concertrationColors.ten;

    return concertrationColors.zero;
  };

  if (displayType === "district") {
    //if shown disrict wise
    const distData = data.byDistrict;
    const district = distData.find((el) => el.district === regionName);
    let q = Math.ceil((district.cases / maxVal) * 100);

    let logVal = Math.ceil(Math.log(q) / Math.log(3));

    console.log(logVal, regionName, q);

    $(`.${regionName}-label`)[0].style.fill = "black";
    return fillColor(logVal);
  } else {
    //if shown  province wise
    let province = null;
    const provData = data.byProvince;
    for (let prov in provData) {
      if (provData[prov].province === regionName) {
        province = provData[prov];
      }
    }
    let q = Math.ceil((province.cases / maxVal) * 100);
    let logVal = Math.ceil(Math.log(q) / Math.log(3));

    return fillColor(logVal);
  }
};
