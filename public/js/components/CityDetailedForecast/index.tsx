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

import './index.less';
import TabsComponent from '../TabsComponent';

const CityDetailedForecast = (): JSX.Element => {
    const location = useLocation();

    // get detailed forecast
    const data = location.state;

    function kelvinToCelsius(kelvin) {
        // Check if the input is a valid number
        if (typeof kelvin !== 'number' || isNaN(kelvin)) {
            return "Invalid input. Please provide a valid number.";
        }
        
        // Convert Kelvin to Celsius
        const celsius = kelvin - 273.15;
        
        return celsius.toFixed(1);
    }

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

    const labels = data.list.map(forecast => forecast.dt_txt);
    
    const temperatureData = {
        labels,
        datasets: [
            {
                label: data.city?.name,
                data: data.list.map(forecast => kelvinToCelsius(forecast.main.temp)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const humidityData = {
        labels,
        datasets: [
            {
                label: data.city?.name,
                data: data.list.map(forecast => forecast.main.humidity),
                backgroundColor: 'rgba(140, 155, 181, 0.5)',
            }
        ]
    }

    const windData = {
        labels,
        datasets: [
            {
                label: data.city?.name,
                data: data.list.map(forecast => forecast.wind.speed),
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
