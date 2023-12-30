export const sharedOptions = {
  borderWidth: 3,
  pointRadius: 3,
  pointBorderWidth: 1,
  maintainAspectRatio: true,
  responsive: true,
  legend: {
    display: false,
  },
};

export const gridOptions = {
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

export const colors = [
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