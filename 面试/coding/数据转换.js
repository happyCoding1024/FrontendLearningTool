const dataFromBE = [
  {
    label: "时间",
    dataList: [
      "2020",
      "2020",
      "2020",
      "2021",
      "2021",
      "2021",
      "2022",
      "2022",
      "2022",
    ],
  },
  {
    label: "套餐类型",
    dataList: ["套餐1", "套餐2", "套餐3", "套餐1", "套餐2", "套餐3", "套餐1", "套餐2", "套餐3"],
  },
  {
    label: "收费金额",
    dataList: ["27.1", "45", "87", "47", "89", "125", "63.3", "145", "287"],
  },
];

function formatToBrokenLineData (data) {
  const res = [];
  const labelMap = {};
  const timeCountMap = {};

  // label mao
  for (const item of data) {
    labelMap[item.label] = item;
  }

  // 时间和对应的次数
  for (const time of labelMap['时间'].dataList) {
    if (!timeCountMap[time]) {
      timeCountMap[time] = 1;
    } else {
      timeCountMap[time] += 1;
    }
  }

  // 去重后的套餐类型
  const menuTypes = [...new Set(labelMap['套餐类型'].dataList)];

  // 处理成折线图需要的数据
  res.push(['时间', ...menuTypes]);

  const newDataList = labelMap['收费金额'].dataList.map(value => Math.floor(Number(value)));
  for (const year of Object.keys(timeCountMap)) {
    res.push([year, ...newDataList.slice(0, timeCountMap[year])]);
    newDataList.splice(0, timeCountMap[year]);
  }

  return res;
}

let res = formatToBrokenLineData(dataFromBE);


