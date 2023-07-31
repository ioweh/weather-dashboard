import React from 'react';
import ReactDOM from 'react-dom';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import CityList from './components/CityList';
import CityForecast from './components/City5DayForecast';
import CityDetailedForecast from './components/CityDetailedForecast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CityList />,
  },
  {
    path: "/forecast/:lat/:lon",
    element: <CityForecast />,
  },
  {
    path: "/forecast/:lat/:lon/:name/:country",
    element: <CityForecast />,
  },
  {
    path: "/city-details",
    element: <CityDetailedForecast />,
  },
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('container'));
