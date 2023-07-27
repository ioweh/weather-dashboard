import React from 'react';
import ReactDOM from 'react-dom';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import CityList from 'components/CityList';
import CityForecast from 'components/CityForecast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CityList />,
  },
  {
    path: "/forecast/:lat/:lon",
    element: <CityForecast />,
  },
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('container'));
