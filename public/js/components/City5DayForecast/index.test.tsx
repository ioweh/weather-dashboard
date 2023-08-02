import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act, render } from '@testing-library/react';
import CityForecast from './index';
import * as validServerResponse from './mock40Results.json';

// Initialize the mock adapter instance
const mock = new MockAdapter(axios);

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast/?lat=undefined&lon=undefined&appid=undefined';

describe('CityForecast', () => {
  beforeEach(() => {
    // Reset the mock history before each test
    mock.reset();
  });

  it('should fetch data from the API and update the state with the forecast for 5 days', async () => {
    // Mock the response you want to receive from the API

    mock.onGet(apiUrl).reply(200, validServerResponse);

    // Mount the component
    let container;
    await act( async () => ({container} = render(<CityForecast />)));
    const searchResults = container.getElementsByClassName('forecast__content');

    expect(searchResults).toHaveLength(5);
  });
});
