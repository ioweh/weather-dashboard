import React from 'react';
import ReactDOM from 'react-dom';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import CityList from 'components/CityList';
import CityForecast from 'components/City5DayForecast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CityList />,
  },
  {
    path: "/forecast/:lat/:lon/:name/:country",
    element: <CityForecast />,
  },
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('container'));
