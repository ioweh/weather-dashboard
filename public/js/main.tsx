import React from 'react';
import ReactDOM from 'react-dom';

const MainComponent = (): JSX.Element => {
    return (
    <div>Weather dashboard</div>
    );
}

ReactDOM.render(<MainComponent />, document.getElementById('container'));
