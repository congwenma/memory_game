import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import todoStore from './todoStore'
import TodoList from './TodoList'


import 'basscss'


ReactDOM.render(
  <TodoList store={ todoStore } />,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
