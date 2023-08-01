import React, { useState } from 'react';

import './index.less';


const TabsComponent = ({ tabsData }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-container__tabs">
        {tabsData.map((tab, index) => (
          <div
            key={index}
            className={`tabs-container__tabs__tab ${activeTab === index ? 'tabs-container__tabs__tab--active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tabs-container__tab-content">{tabsData[activeTab].content}</div>
    </div>
  );
};

export default TabsComponent;
