import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CityForecast = (): JSX.Element => {
    const { lat, lon } = useParams();
    const [forecastData, setForecastData] = useState<any>({});
    
    let url = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=b35ef7587dfa519e18d36e86584481a2`;

    function kelvinToCelsius(kelvin) {
        // Check if the input is a valid number
        if (typeof kelvin !== 'number' || isNaN(kelvin)) {
            return "Invalid input. Please provide a valid number.";
        }
        
        // Convert Kelvin to Celsius
        const celsius = kelvin - 273.15;
        
        return celsius.toFixed(1);
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log(response.data)
                setForecastData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData(); // Call the async function to fetch data when the component mounts
    }, []);

    return (
        <>
        <div>
            {forecastData.list && forecastData.list.map(forecast => 
            <li key={forecast.dt}>
                <>
                <div>{forecast.dt_txt}</div>
                <div>Temperature: {kelvinToCelsius(forecast.main?.temp)}</div>
                <div>Humidity: {forecast.main?.humidity}%</div>
                <div>Description: {forecast.weather[0]?.description}</div>
                <img src={`https://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`} />
                </>
            </li>
            )}
        </div> 
        </>
    )
}

export default CityForecast