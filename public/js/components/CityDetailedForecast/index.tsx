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

import TabsComponent, { TabsDataInterface } from '../TabsComponent';
import './index.less';
import { kelvinToCelsius } from '../../utils';


export interface ForecastInterface {
    dt_txt: string;
    main: {
        temp: number;
        humidity: number;
        pressure?: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        description: string,
        icon: string
    }[];
}


const CityDetailedForecast = (): JSX.Element => {
    const location = useLocation();

    // get detailed forecast
    const { oneDayForecast, cityName }:
    { oneDayForecast: ForecastInterface[], cityName: string} = location.state;

    const temperatureColor = 'rgba(255, 99, 132, 0.5)';
    const humidityColor = 'rgba(140, 155, 181, 0.5)';
    const windColor = 'rgba(171, 185, 162, 0.5)';

    const createChartOptions = (header: string) => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: header,
                },
            },
        }
    }

    const createChartData = (data: number[], backgroundColor: string) => {
        return {
            labels,
            datasets: [
                {
                    label: cityName,
                    data,
                    backgroundColor,
                }
            ]
        }
    }

    const temperatureOptions = createChartOptions('Temperature, °C')

    const humidityOptions = createChartOptions('Humidity, %');

    const windOptions = createChartOptions('Wind, m/s');

    const labels = oneDayForecast.map(forecast => forecast.dt_txt);

    const temperatureData = createChartData(
        oneDayForecast.map(forecast => kelvinToCelsius(forecast.main.temp)),
        temperatureColor,
    )

    const humidityData = createChartData(
        oneDayForecast.map(forecast => forecast.main.humidity),
        humidityColor,
    );

    const windData = createChartData(
        oneDayForecast.map(forecast => forecast.wind.speed),
        windColor,
    );

    const tabsData: TabsDataInterface[] = [
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
