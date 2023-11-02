const sharedOptions = {
  borderWidth: 3,
  pointRadius: 3,
  pointBorderWidth: 1,
  maintainAspectRatio: true,
  responsive: true,
  legend: {
    display: false,
  },
};

const gridOptions = {
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "rgba(0,0,0,0.02)",
          zeroLineColor: "rgba(0,0,0,0)",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: "rgba(0,0,0,0)",
          zeroLineColor: "rgba(0,0,0,0)",
        },
        position: "left",
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        },
      },
    ],
  },
};

const stackedGridOptions = {
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "rgba(0,0,0,0.02)",
          zeroLineColor: "rgba(0,0,0,0.02)",
        },
        stacked: true,
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: "rgba(0,0,0,0)",
          zeroLineColor: "rgba(0,0,0,0.02)",
        },
        stacked: true,
        position: "left",
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        },
      },
    ],
  },
};

const colors = [
  {
    backgroundColor: "#667EEA",
    borderColor: "#7F9CF5",
    pointBackgroundColor: "#667EEA",
    pointBorderColor: "#fff",
  },
  {
    backgroundColor: "#eeeeee",
    borderColor: "#eeeeee",
    pointBackgroundColor: "#eeeeee",
    pointBorderColor: "#fff",
  },
  {
    backgroundColor: "#5dcff3",
    borderColor: "#5dcff3",
    pointBackgroundColor: "#5dcff3",
    pointBorderColor: "#fff",
  },
];

const labels = ["1", "2", "3", "4", "5", "6", "7"];

const datasets = [
  {
    label: "Sales",
    ...colors[0],

    data: [6, 5, 8, 8, 5, 5, 4],
  },
  {
    label: "Views",
    ...colors[1],

    data: [5, 4, 4, 2, 6, 2, 5],
  },
];

const data = {
  labels,
  datasets,
};

const lineData = {
  labels,
  datasets: [
    {
      label: "Sales",
      ...colors[0],
      backgroundColor: "rgba(102,126,234, 0.05)",
      data: [6, 5, 8, 8, 5, 5, 4],
    },
    {
      label: "Views",
      ...colors[1],
      backgroundColor: "rgba(160,174,192, 0.05)",
      data: [5, 4, 4, 2, 6, 2, 5],
    },
  ],
};

const dataStepped = {
  labels,
  datasets: [
    {
      steppedLine: true,
      fill: false,
      label: "Sales",
      ...colors[0],
      data: [6, 5, 8, 8, 5, 5, 4],
    },
    {
      steppedLine: true,
      fill: false,
      label: "Views",
      ...colors[1],
      data: [5, 4, 4, 2, 6, 2, 5],
    },
  ],
};

const dataPoints = {
  labels,
  datasets: [
    {
      fill: false,
      pointRadius: 10,
      pointHoverRadius: 15,
      showLine: false,
      label: "Sales",
      ...colors[0],
      data: [6, 5, 8, 8, 5, 5, 4],
    },
    {
      fill: false,
      pointRadius: 10,
      pointHoverRadius: 15,
      showLine: false,
      label: "Views",
      ...colors[1],
      data: [5, 4, 4, 2, 6, 2, 5],
    },
  ],
};

const dataMixed = {
  labels,
  datasets: [
    {
      label: "Sales",
      type: "line",
      data: [6, 5, 6, 8, 5, 5, 4],
      ...colors[0],
      yAxisID: "y-axis-2",
    },
    {
      type: "bar",
      label: "Visitor",
      data: [5, 6, 4, 3, 6, 4, 5],
      ...colors[1],
      yAxisID: "y-axis-1",
    },
  ],
};

const options = {
  responsive: true,
  tooltips: {
    mode: "label",
  },
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false,
        },
        labels,
      },
    ],
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
        gridLines: {
          display: false,
        },
        labels: {
          show: true,
        },
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
        gridLines: {
          display: false,
        },
        labels: {
          show: true,
        },
      },
    ],
  },
};

const dataBubble = {
  labels: ["January"],
  datasets: [
    {
      label: "Sales",
      fill: true,
      lineTension: 0.1,
      ...colors[0],
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        {
          x: 6,
          y: 5,
          r: 15,
        },
        {
          x: 5,
          y: 4,
          r: 10,
        },
        {
          x: 8,
          y: 4,
          r: 6,
        },
        {
          x: 8,
          y: 4,
          r: 6,
        },
        {
          x: 5,
          y: 14,
          r: 14,
        },
        {
          x: 5,
          y: 6,
          r: 8,
        },
        {
          x: 4,
          y: 2,
          r: 10,
        },
      ],
      borderWidth: 0.5,
    },
  ],
};

const dataDoughnut = {
  labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
  datasets: [
    {
      data: [350, 450, 100],
      backgroundColor: ["#667EEA", "#eeeeee", "#5cad66"],
    },
  ],
};

const dataPie = {
  labels: ["Download Sales", "In-Store Sales", "Mail Sales"],
  datasets: [
    {
      data: [350, 450, 100],
      backgroundColor: ["#667EEA", "#eeeeee", "#5cad66"],
    },
  ],
};

const dataPolar = {
  datasets: [
    {
      data: [350, 450, 100],
      backgroundColor: ["#667EEA", "#eeeeee", "#5cad66"],
    },
  ],
  labels: ["Download Sales", "In-Store Sales", "Mail Sales"],
};

const dataRadar = {
  labels: [
    "Eating",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ],
  datasets: [
    {
      label: "Sales",
      backgroundColor: "rgba(102,126,234, 0.05)",
      borderColor: "rgba(102,126,234, 1)",
      pointBackgroundColor: "rgba(102,126,234, 1)",
      pointBorderColor: "#fff",
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: "Views",
      backgroundColor: "rgba(160,174,192, 0.05)",
      borderColor: "rgba(160,174,192, 1)",
      pointBackgroundColor: "rgba(160,174,192, 1)",
      pointBorderColor: "#fff",
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const height = 200;

const chartData = [
  {
    type: "bar",
    title: "Bar",
    subtitle: "Basic",
    data,
    height,
    options: {
      ...sharedOptions,
      ...gridOptions,
    },
  },
  {
    type: "horizontalbar",
    title: "Bar",
    subtitle: "Horizontal",
    data,
    height,
    options: {
      ...sharedOptions,
      ...gridOptions,
    },
  },
  {
    type: "bar",
    title: "Bar",
    subtitle: "Stacked",
    data: data,
    height: height,
    options: {
      ...sharedOptions,
      ...gridOptions,
      ...stackedGridOptions,
    },
  },
  {
    type: "line",
    title: "Line",
    subtitle: "Basic",
    data: lineData,
    height: height,
    options: {
      ...sharedOptions,
      ...gridOptions,
    },
  },
  {
    type: "line",
    title: "Line",
    subtitle: "Stepped",
    data: dataStepped,
    height: height,
    options: {
      ...sharedOptions,
      ...gridOptions,
    },
  },
  {
    type: "line",
    title: "Line",
    subtitle: "Points",
    data: dataPoints,
    height: height,
    options: {
      ...sharedOptions,
      ...gridOptions,
      responsive: true,
      elements: {
        point: {
          pointStyle: "rectRot",
        },
      },
    },
  },
  {
    type: "bar",
    title: "Line and Bar",
    subtitle: "Mixed",
    data: dataMixed,
    height: height,
    options: {
      ...sharedOptions,
      ...gridOptions,
      ...options,
    },
  },
  {
    type: "bubble",
    title: "Misc",
    subtitle: "Bubble",
    data: dataBubble,
    height: height,
    options: {
      ...sharedOptions,
      ...gridOptions,
    },
  },
  {
    type: "doughnut",
    title: "Misc",
    subtitle: "Doughnut",
    data: dataDoughnut,
    height: height,
    options: {
      ...sharedOptions,
      elements: {
        arc: {
          borderWidth: 0.5,
        },
      },
    },
  },
  {
    type: "pie",
    title: "Misc",
    subtitle: "Pie",
    data: dataPie,
    height: height,
    options: {
      ...sharedOptions,
      elements: {
        arc: {
          borderWidth: 0.5,
        },
      },
    },
  },
  {
    type: "polar",
    title: "Misc",
    subtitle: "Polar",
    data: dataPolar,
    height: height,
    options: {
      ...sharedOptions,
      elements: {
        arc: {
          borderWidth: 0.5,
        },
      },
    },
  },
  {
    type: "radar",
    title: "Misc",
    subtitle: "Radar",
    data: dataRadar,
    height: height,
    options: {
      ...sharedOptions,
    },
  },
];

export default (req, res) => res.json(chartData);
