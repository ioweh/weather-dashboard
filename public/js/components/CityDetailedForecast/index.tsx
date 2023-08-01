import React from 'react';
import { useLocation } from "react-router-dom";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

import TabsComponent from '../TabsComponent';
import './index.less';
import { kelvinToCelsius } from '../../utils';

const CityDetailedForecast = (): JSX.Element => {
    const location = useLocation();

    // get detailed forecast
    const { oneDayForecast, cityName } = location.state;

    const temperatureOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Temperature, °C',
            },
        },
    };

    const humidityOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Humidity, %',
            },
        },
    };

    const windOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Wind, m/s',
            },
        },
    };

    const labels = oneDayForecast.map(forecast => forecast.dt_txt);
    
    const temperatureData = {
        labels,
        datasets: [
            {
                label: cityName,
                data: oneDayForecast.map(forecast => kelvinToCelsius(forecast.main.temp)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const humidityData = {
        labels,
        datasets: [
            {
                label: cityName,
                data: oneDayForecast.map(forecast => forecast.main.humidity),
                backgroundColor: 'rgba(140, 155, 181, 0.5)',
            }
        ]
    }

    const windData = {
        labels,
        datasets: [
            {
                label: cityName,
                data: oneDayForecast.map(forecast => forecast.wind.speed),
                backgroundColor: 'rgba(171, 185, 162, 0.5)',
            }
        ]
    }

    const tabsData = [
    {
      label: 'Temperature',
      content: <Bar options={temperatureOptions} data={temperatureData} />,
    },
    {
      label: 'Humidity',
      content: <Bar options={humidityOptions} data={humidityData} />,
    },
    {
      label: 'Wind',
      content: <Bar options={windOptions} data={windData} />,
    },
  ];

    return (
        <TabsComponent tabsData={tabsData} />
    );
}

export default CityDetailedForecast
