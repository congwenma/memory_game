import React from 'react';
import ReactDOM from 'react-dom';
import "basscss/css/basscss.css";
import "flexboxgrid";
import './index.scss';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import todoStore from './todoStore'
import TodoList from './TodoList'


ReactDOM.render(
  <TodoList store={ todoStore } />,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
