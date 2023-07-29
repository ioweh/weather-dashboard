import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CityList = (): JSX.Element => {
    const [citiesWithForecast, setCitiesWithForecast] = useState<any>([]);
    const [cityName, setCityName] = useState("London");

    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=b35ef7587dfa519e18d36e86584481a2`;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log(response.data)
                setCitiesWithForecast(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData(); // Call the async function to fetch data when the component mounts
    }, [cityName]);

    return (
    <>
    <input
    type="text"
    placeholder="Search"
    value={cityName}
    onChange={(e) => setCityName(e.target.value)} />
    <ul>
        {citiesWithForecast.map(cityWithForecast => 
            <li
            key={cityWithForecast.lat * cityWithForecast.lon}>
                <Link
                to={`forecast/${cityWithForecast.lat}/${cityWithForecast.lon}`}>
                    {cityWithForecast.name}
                </Link>
            </li>
        )}
    </ul>
    </>
    );
}

export default CityList
