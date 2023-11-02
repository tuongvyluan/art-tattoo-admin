const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const chartData = (max) => {
  let data = [];
  for (let index = 0; index < max; index++) {
    data.push(randomNumber(30, 40));
  }
  return data;
};

const sharedOptions = {
  borderWidth: 2,
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false,
    labels: {
      usePointStyle: false,
      fontColor: 'red',
    },
  },
  hover: {
    mode: "index",
  },
  elements: {
    line: {
      tension: 0.5,
    },
    point: {
      radius: 0,
    },
  },
  tooltips: {
    enabled: true,
    intersect: false,
    mode: "nearest",
    bodySpacing: 5,
    yPadding: 10,
    xPadding: 10,
    caretPadding: 0,
    displayColors: false,
    titleFontColor: "#ffffff",
    cornerRadius: 4,
    footerSpacing: 0,
    titleSpacing: 0,
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
};

const gridOptions = {
  scales: {
    xAxes: [
      {
        display: false,
        scaleLabel: {
          display: false,
          labelString: "Month",
        },
        ticks: {
          display: false,
          beginAtZero: true,
        },
      },
    ],
    yAxes: [
      {
        display: false,
        scaleLabel: {
          display: false,
          labelString: "Value",
        },
        gridLines: {
          drawBorder: false,
          offsetGridLines: true,
          drawTicks: false,
        },
        ticks: {
          suggestedMax: 70,
          display: false,
          beginAtZero: true,
        },
      },
    ],
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const lineData = {
  labels,
  datasets: [
    {
      label: "Sales",
      fill: true,
      borderColor: "rgb(102, 126, 234)",
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
    },
  ],
};

const lineData2 = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: chartData(12),
      borderColor: "rgb(102, 126, 234)",
      borderWidth: 2,
    },
  ],
};

const lineData3 = {
  labels,
  datasets: [
    {
      label: "Sales",
      borderColor: "rgb(160,174,192)",
      borderWidth: 2,
      data: chartData(12),
    },
  ],
};

const dataPie = {
  labels,
  datasets: [
    {
      label: "Sales",
      borderColor: "rgb(245,101,101)",
      borderWidth: 2,
      data: chartData(12),
    },
  ],
};

const dashboardData = {
  chart: {
    type: "line",
    title: "Sales Analytics",
    subtitle: "Basic",
    data: lineData,
    height: 300,
    options: {
      ...sharedOptions,
      tooltips: {
        ...sharedOptions.tooltips,
        backgroundColor: "rgb(102, 126, 234)",
      },
      scales: {
        xAxes: [
          {
            categoryPercentage: 0.35,
            barPercentage: 0.7,
            display: true,
            scaleLabel: {
              display: false,
              labelString: "Month",
            },
            gridLines: false,
            ticks: {
              display: true,
              beginAtZero: true,

              fontSize: 13,
              padding: 10,
            },
          },
        ],
        yAxes: [
          {
            categoryPercentage: 0.35,
            barPercentage: 0.7,
            display: true,
            scaleLabel: {
              display: false,
              labelString: "Value",
            },
            gridLines: {
              drawBorder: false,
              offsetGridLines: false,
              drawTicks: false,
              borderDash: [3, 4],
              zeroLineWidth: 1,
              color: "rgba(102, 126, 234, 0.1)",
              zeroLineColor: "rgba(102, 126, 234, 0.1)",
              zeroLineBorderDash: [3, 4],
            },
            ticks: {
              max: 120,
              stepSize: 20,
              display: true,
              beginAtZero: true,

              fontSize: 13,
              padding: 10,
            },
          },
        ],
      },
    },
    gold: [60, 40, 60, 40, 60, 40, 80, 60, 80, 60, 100, 80],
    silver: [70, 50, 70, 50, 70, 50, 90, 70, 90, 70, 110, 90],
    bronze: [50, 30, 50, 30, 50, 30, 70, 50, 70, 50, 90, 70],
  },
  charts: [
    {
      type: "line",
      title: "Monthly Views",
      subtitle: "Basic",
      value: "65,000",
      data: lineData2,
      height: 120,
      options: {
        ...sharedOptions,
        ...gridOptions,
        tooltips: {
          ...sharedOptions.tooltips,
          backgroundColor: "rgb(102, 126, 234)",
        },
      },
    },
    {
      type: "line",
      title: "Revenue",
      subtitle: "Stacked",
      value: "45%",
      data: lineData3,
      height: 120,
      options: {
        ...sharedOptions,
        ...gridOptions,
        tooltips: {
          ...sharedOptions.tooltips,
          backgroundColor: "rgb(160,174,192)",
        },
      },
    },
    {
      type: "line",
      title: "Weekly visitors",
      subtitle: "Basic",
      value: "$20,000",
      data: dataPie,
      height: 120,
      options: {
        ...sharedOptions,
        ...gridOptions,
        tooltips: {
          ...sharedOptions.tooltips,
          backgroundColor: "rgb(245,101,101)",
        },
      },
    },
  ],
};

const allStates = [
  {
    id: "AL",
    val: "01",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Alabama",
  },
  {
    id: "AK",
    val: "02",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Alaska",
  },
  {
    id: "AS",
    val: "60",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "American Samoa",
  },
  {
    id: "AZ",
    val: "04",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Arizona",
  },
  {
    id: "AR",
    val: "05",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Arkansas",
  },
  {
    id: "CA",
    val: "06",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "California",
  },
  {
    id: "CO",
    val: "08",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Colorado",
  },
  {
    id: "CT",
    val: "09",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Connecticut",
  },
  {
    id: "DE",
    val: "10",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Delaware",
  },
  {
    id: "DC",
    val: "11",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Washington DC",
  },
  {
    id: "FL",
    val: "12",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "florida",
  },
  {
    id: "FM",
    val: "64",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Federated States of Micronesia",
  },
  {
    id: "GA",
    val: "13",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Georgia",
  },
  {
    id: "GU",
    val: "66",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Guam",
  },
  {
    id: "HI",
    val: "15",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Hawaii",
  },
  {
    id: "ID",
    val: "16",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Idaho",
  },
  {
    id: "IL",
    val: "17",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Illinois",
  },
  {
    id: "IN",
    val: "18",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Indiana",
  },
  {
    id: "IA",
    val: "19",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Iowa",
  },
  {
    id: "KS",
    val: "20",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Kansas",
  },
  {
    id: "KY",
    val: "21",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Kentucky",
  },
  {
    id: "LA",
    val: "22",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Louisiana",
  },
  {
    id: "ME",
    val: "23",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Maine",
  },
  {
    id: "MH",
    val: "68",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Marshall Islands",
  },
  {
    id: "MD",
    val: "24",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Maryland",
  },
  {
    id: "MA",
    val: "25",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Massachusetts",
  },
  {
    id: "MI",
    val: "26",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Michigan",
  },
  {
    id: "MN",
    val: "27",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Minnesota",
  },
  {
    id: "MS",
    val: "28",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Mississippi",
  },
  {
    id: "MO",
    val: "29",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Missouri",
  },
  {
    id: "MT",
    val: "30",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Montana",
  },
  {
    id: "NE",
    val: "31",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Nebraska",
  },
  {
    id: "NV",
    val: "32",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Nevada",
  },
  {
    id: "NH",
    val: "33",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "New Hampshire",
  },
  {
    id: "NJ",
    val: "34",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "New Jersey",
  },
  {
    id: "NM",
    val: "35",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "New Mexico",
  },
  {
    id: "NY",
    val: "36",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "New York",
  },
  {
    id: "NC",
    val: "37",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "North Carolina",
  },
  {
    id: "ND",
    val: "38",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "North Dakota",
  },
  {
    id: "MP",
    val: "69",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Northern Mariana Islands",
  },
  {
    id: "OH",
    val: "39",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Ohio",
  },
  {
    id: "OK",
    val: "40",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Oklahoma",
  },
  {
    id: "OR",
    val: "41",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Oregon",
  },
  {
    id: "PW",
    val: "70",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Palau",
  },
  {
    id: "PA",
    val: "42",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Pennsylvania",
  },
  {
    id: "PR",
    val: "72",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Puerto Rico",
  },
  {
    id: "RI",
    val: "44",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Rhode Island",
  },
  {
    id: "SC",
    val: "45",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "South Carolina",
  },
  {
    id: "SD",
    val: "46",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "South Dakota",
  },
  {
    id: "TN",
    val: "47",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Tennessee",
  },
  {
    id: "TX",
    val: "48",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Texas",
  },
  {
    id: "UM",
    val: "74",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Minor Outlying Islands",
  },
  {
    id: "UT",
    val: "49",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Utah",
  },
  {
    id: "VT",
    val: "50",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Vermont",
  },
  {
    id: "VA",
    val: "51",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Virginia",
  },
  {
    id: "VI",
    val: "78",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Virgin Islands",
  },
  {
    id: "WA",
    val: "53",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Washington",
  },
  {
    id: "WV",
    val: "54",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "West Virginia",
  },
  {
    id: "WI",
    val: "55",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Wisconsin",
  },
  {
    id: "WY",
    val: "56",
    value1: randomNumber(5000, 50000),
    value2: randomNumber(5000, 50000),
    name: "Wyoming",
  },
];

export default (req, res) => res.json({ dashboardData, allStates });
