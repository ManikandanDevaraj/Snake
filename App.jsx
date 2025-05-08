import React from 'react';
import ReactDOM from 'react-dom';
import SnakeGame from './SnakeGame.jsx';

const screen = document.getElementById('screen');

ReactDOM.render(
    <React.Fragment>
        <SnakeGame rows={30} columns={30}/>
    </React.Fragment>,
   screen
)
