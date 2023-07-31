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
  Legend
);

import './index.less';

const CityDetailedForecast = (): JSX.Element => {
    const location = useLocation();

    // get detailed forecast
    const data = location.state;
    console.log(data);

    function kelvinToCelsius(kelvin) {
        // Check if the input is a valid number
        if (typeof kelvin !== 'number' || isNaN(kelvin)) {
            return "Invalid input. Please provide a valid number.";
        }
        
        // Convert Kelvin to Celsius
        const celsius = kelvin - 273.15;
        
        return celsius.toFixed(1);
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Temperature Chart',
            },
        },
    };

    const labels = data.list.map(forecast => forecast.dt_txt);
    
    const chartData = {
        labels,
        datasets: [
            {
                label: data.city.name,
                data: data.list.map(forecast => kelvinToCelsius(forecast.main.temp)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Bar options={options} data={chartData} />
    );
}

export default CityDetailedForecast
