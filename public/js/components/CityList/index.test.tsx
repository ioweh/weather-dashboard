import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act, render } from '@testing-library/react';
import CityList from './index';

// Initialize the mock adapter instance
const mock = new MockAdapter(axios);

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=undefined';

describe('CityList', () => {
  beforeEach(() => {
    // Reset the mock history before each test
    mock.reset();
  });

  it('should fetch data from the API and update the state', async () => {
    // Mock the response you want to receive from the API
    const mockData = [
        {"name":"London","lat":51.5073219,"lon":-0.1276474,"country":"GB","state":"England"},
        {"name":"City of London","lat":51.5156177,"lon":-0.0919983,"country":"GB","state":"England"},
        {"name":"London","lat":42.9832406,"lon":-81.243372,"country":"CA","state":"Ontario"},
        {"name":"Chelsea","lat":51.4875167,"lon":-0.1687007,"country":"GB","state":"England"},
        {"name":"London","lat":37.1289771,"lon":-84.0832646,"country":"US","state":"Kentucky"}];
    mock.onGet(apiUrl).reply(200, mockData);

    // Mount the component
    let container;
    await act( async () => ({container} = render(<CityList/>)));
    const searchResults = container.getElementsByClassName('searchResult');

    expect(searchResults).toHaveLength(5);
  });

  it('should handle API error and update the state accordingly', async () => {
    // Mock an API error response
    mock.onGet(apiUrl).reply(500, { message: 'Server Error' });

    // Mount the component
    let container;
    await act( async () => ({container} = render(<CityList/>)));
    const searchResults = container.getElementsByClassName('searchResult');

    expect(searchResults).toHaveLength(0);
  });
});
