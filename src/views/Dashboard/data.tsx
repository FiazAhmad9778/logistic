import { Chart as ChartJS, ChartOptions, registerables } from 'chart.js';
ChartJS.register(...registerables);

export const Barchart1 = {
  type: 'line',
  responsive: true,
};
export const barchart1data = {
  labels: [...Array(30).keys()],
  datasets: [
    {
      label: 'Number of Vehicle',
      data: [10, 24, 20, 25, 35, 50, 12, 14, 50, 12, 0, 0, 0, 50],
      borderColor: '#f74f75',
      backgroundColor: '#f74f75',
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,
    },
    {
      label: 'Number of Driver',
      data: [0, 24, 20, 25, 35, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 115],
      borderColor: '#38cab3',
      backgroundColor: '#38cab3',
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,
    },
  ],
};

export const piechart = {
  labels: ['Delivery', 'Collection'],
  datasets: [
    {
      data: [120, 1220],
      backgroundColor: ['#6d26be', '#1a9c86'],
    },
  ],
  hoverOffset: 4,
};
export const fuelEfficiencyData = {
  labels: ['Actual Distance', 'Excess Distance'],
  datasets: [
    {
      data: [1420, 1220],
      backgroundColor: ['#6d26be', '#1a9c86'],
    },
  ],
  hoverOffset: 4,
};
export const temperatureData = {
  labels: ['Chilled', 'Frozen', 'Hot', 'Ambient'],
  datasets: [
    {
      data: [150, 15, 45, 120],
      backgroundColor: ['#6d26be', 'rgb(201, 203, 207)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
    },
  ],
  hoverOffset: 4,
};
export const pieChartOption = {
  type: 'pie',
  responsive: true,
  plugins: {
    legend: {
      position: 'left',
    },
  },
};
export const dchart = {
  labels: ['Late', 'Early', 'On Time', 'Cancelled'],
  datasets: [
    {
      data: [20, 20, 30, 5],
      backgroundColor: ['#6d26be', '#ffbd5a', '#4ec2f0', '#1a9c86', '#f74f75'],
    },
  ],
  hoverOffset: 4,
};

export const Horizontalbarchart2: ChartOptions<'bar'> = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '',
    },
  },
};

export const Horizontalbarchartdata2 = {
  type: 'bar',
  labels: [...Array(30).keys()],
  datasets: [
    {
      label: 'Orders',
      data: [
        12, 39, 20, 10, 25, 18, 12, 39, 20, 10, 25, 18, 12, 39, 20, 66, 45, 21, 10, 25, 18, 66, 45, 21, 12, 39, 20, 10,
        25, 18,
      ],
      backgroundColor: 'rgb(153, 102, 255)',
    },
    {
      label: 'Complete Orders',
      data: [
        22, 30, 25, 30, 20, 10, 66, 45, 21, 25, 18, 12, 39, 66, 45, 21, 20, 10, 25, 18, 20, 40, 70, 12, 39, 20, 18, 12,
        18, 12, 39,
      ],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Items Missing from Order',
      data: [
        22, 30, 25, 30, 20, 12, 39, 66, 45, 21, 20, 10, 25, 66, 45, 21, 18, 12, 39, 20, 10, 25, 18, 40, 70, 12, 39, 20,
        10, 25, 18,
      ],
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ],
};

export const ordersOptions: ChartOptions<'bar'> = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '',
    },
  },
};
export const ordersData = {
  type: 'bar',
  labels: [...Array(10).keys()],
  datasets: [
    {
      label: 'Total',
      data: [12, 39, 20, 10, 25, 18, 12, 39, 20, 10, 25, 18, 12, 39, 20, 66],
      backgroundColor: 'rgb(153, 102, 255)',
    },
    {
      label: 'Delivered Orders',
      data: [22, 30, 25, 30, 20, 10, 66, 45, 21, 25, 18, 12, 39, 66, 45, 21],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Failed Orders',
      data: [22, 30, 25, 30, 20, 12, 39, 66, 45, 21, 20, 10, 25, 66, 45, 21],
      backgroundColor: 'rgb(255, 159, 64)',
    },
    {
      label: 'Cancelled Orders',
      data: [22, 30, 25, 30, 20, 12, 39, 66, 45, 21, 20, 10, 25, 66, 45, 21, 18],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Unfulfilled Orders',
      data: [22, 30, 25, 30, 20, 12, 39, 66, 45, 21, 20, 10, 25, 66, 45, 21, 18],
      backgroundColor: 'rgb(201, 203, 207)',
    },
  ],
};

export const carbonEmissionEfficiencyOption: ChartOptions<'bar'> = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '',
    },
  },
};
export const carbonEmissionEfficiencyData = {
  type: 'bar',
  labels: [...Array(30).keys()],
  datasets: [
    {
      label: 'Carbon Efficiency',
      data: [
        -22, -30, -25, -30, -20, -10, -66, -45, -21, 25, 18, 12, 39, 66, 45, 21, 20, 10, 25, -18, 20, 40, -70, 12, -39,
        -20, 18, 12, 18, 12, 39,
      ],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

// Solid Color
export const SolidColor = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
  },
};
export const SolidColordata = {
  type: 'bar',
  labels: [...Array(30).keys()],
  datasets: [
    {
      label: 'Total Working Hours',
      data: [12, 20, 10, 18, 12, 20, 10, 18, 12, 20, 21, 10, 20, 10, 18, 12, 20, 10, 18, 12, 12],
      backgroundColor: '#38cab3',
    },
  ],
};
