import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'better-react-carousel'

import './index.less';

const CityForecast = (): JSX.Element => {
    const { lat, lon, name, country } = useParams();
    const [forecastData, setForecastData] = useState<any>({});
    
    let url = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=b35ef7587dfa519e18d36e86584481a2`;

    const navigate = useNavigate();

    function kelvinToCelsius(kelvin) {
        // Check if the input is a valid number
        if (typeof kelvin !== 'number' || isNaN(kelvin)) {
            return "Invalid input. Please provide a valid number.";
        }
        
        // Convert Kelvin to Celsius
        const celsius = kelvin - 273.15;
        
        return `${celsius.toFixed(1)}°C`;
    }

    function isIn24HoursInterval(city, currentCity) {
        // e.q., the date time ends in 00:00:00; we find all the similar forecasts
        return city.dt_txt.endsWith(currentCity.dt_txt.slice(-8));
    }

    function cityDetailsPage() {
        navigate("/city-details", {state: forecastData});
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
            <Carousel>
                {forecastData.list.filter(forecast => isIn24HoursInterval(forecast, forecastData.list[0])).map(forecast => <Carousel.Item>
            <div className='forecast'>
                <div className='forecast__content'>
                    <h1 className='forecast__content__name'>{name ?? forecastData.city?.name}</h1>
                    <div className='forecast__content__date'>{forecast.dt_txt}</div>
                    <img
                    onClick={cityDetailsPage}
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`}
                    className='forecast__content__picture'/>
                    <div className='forecast__content__temperature'>{kelvinToCelsius(forecast.main?.temp)}</div>
                    <div className='forecast__content__description'>{forecast.weather[0]?.description}</div>
                </div>
                <div className='forecast__footer'>
                    <div className='forecast__footer__humidity'>
                        <img src='/humidity.png' className='forecast__footer__humidity__picture' />
                        <div>Humidity:</div>
                        <div>{forecast.main?.humidity}%</div>
                    </div>
                    <div className='forecast__footer__wind-speed'>
                        <img src='/wind.png' className='forecast__footer__wind-speed__picture' />
                        <div>Wind:</div>
                        <div>{forecast.wind.speed}m/s</div>
                    </div>
                    <div className='forecast__footer__pressure'>
                        <img src='/pressure.png' className='forecast__footer__pressure__picture' />
                        <div>Pressure:</div>
                        <div>{forecast.main?.pressure}hPa</div>
                    </div>
                </div>
            </div>
            </Carousel.Item>)}
            </Carousel>
            }
        </>
    )
}

export default CityForecast
