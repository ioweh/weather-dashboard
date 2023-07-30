import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './index.less';

const CityForecast = (): JSX.Element => {
    const { lat, lon, name, country } = useParams();
    const [forecastData, setForecastData] = useState<any>({});
    
    let url = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=b35ef7587dfa519e18d36e86584481a2`;

    function kelvinToCelsius(kelvin) {
        // Check if the input is a valid number
        if (typeof kelvin !== 'number' || isNaN(kelvin)) {
            return "Invalid input. Please provide a valid number.";
        }
        
        // Convert Kelvin to Celsius
        const celsius = kelvin - 273.15;
        
        return `${celsius.toFixed(1)}°C`;
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setForecastData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData(); // Call the async function to fetch data when the component mounts
    }, []);

    return (
        <>
            {forecastData.list &&
            <div className='forecast'>
                <div className='forecast__content'>
                    <h1 className='forecast__content__name'>{name ?? forecastData.city?.name}</h1>
                    <div className='forecast__content__date'>{forecastData.list[0].dt_txt}</div>
                    <img
                    src={`https://openweathermap.org/img/wn/${forecastData.list[0].weather[0]?.icon}@2x.png`}
                    className='forecast__content__picture'/>
                    <div className='forecast__content__temperature'>{kelvinToCelsius(forecastData.list[0].main?.temp)}</div>
                    <div className='forecast__content__description'>{forecastData.list[0].weather[0]?.description}</div>
                </div>
                <div className='forecast__footer'>
                    <div>{forecastData.list[0].main?.humidity}</div>
                    <div>{forecastData.list[0].wind.speed}</div>
                    <div>{forecastData.list[0].main?.pressure}</div>
                </div>
            </div>
            }
        </>
    )
}

export default CityForecast
