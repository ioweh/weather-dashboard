import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
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

  it('should be able to move to the humidity tab', async () => {
    // Mount the component
    let container;
    await act( async () => ({container} = render(<TabsComponent tabsData={tabsData} />)));
    const tabs = container.getElementsByClassName('tabs-container__tabs__tab');
    const secondTab = tabs[1];
    fireEvent.click(secondTab);
    const currentTab = container.getElementsByClassName('tabs-container__tab-content')[0];

    expect(currentTab).toHaveTextContent("Humidity content");
  });

  it('should be able to move to the wind tab', async () => {
    // Mount the component
    let container;
    await act( async () => ({container} = render(<TabsComponent tabsData={tabsData} />)));
    const tabs = container.getElementsByClassName('tabs-container__tabs__tab');
    const secondTab = tabs[2];
    fireEvent.click(secondTab);
    const currentTab = container.getElementsByClassName('tabs-container__tab-content')[0];

    expect(currentTab).toHaveTextContent("Wind content");
  });
});
