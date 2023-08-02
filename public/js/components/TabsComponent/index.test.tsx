import React from 'react';
import { act, render } from '@testing-library/react';
import TabsComponent from './index';
import '@testing-library/jest-dom/extend-expect';


describe('TabsComponent', () => {
    // Mock the tabsData
    const tabsData = [
        {
            label: 'Temperature',
            content: <div>Temperature content</div>,
        },
        {
            label: 'Humidity',
            content: <div>Humidity content</div>,
        },
        {
            label: 'Wind',
            content: <div>Wind content</div>,
        },
    ];

  it('should select first tab by default', async () => {
    // Mount the component
    let container;
    await act( async () => ({container} = render(<TabsComponent tabsData={tabsData} />)));
    const activeTab = container.getElementsByClassName('tabs-container__tabs__tab--active')[0];

    expect(activeTab).toHaveTextContent("Temperature");
  });

  it('should render all the passed tabs', async () => {
    // Mount the component
    let container;
    await act( async () => ({container} = render(<TabsComponent tabsData={tabsData} />)));
    const tabs = container.getElementsByClassName('tabs-container__tabs__tab');

    expect(tabs).toHaveLength(3);
  });
});
