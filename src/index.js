import React from 'react';
import ReactDOM from 'react-dom';
import "basscss/css/basscss.css";
import "flexboxgrid";
import './index.scss';

import App from './test/App';
import DevTools from 'mobx-react-devtools'
import registerServiceWorker from './registerServiceWorker';
import todoStore from './test/todoStore'
import TodoList from './test/TodoList'
import memoryGameStore from './memoryGameStore'
import MemoryGame from "./MemoryGame";
import theme from './theme'

// material ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

ReactDOM.render(
  <MuiThemeProvider muiTheme={theme}>
    <div className="app">
      {/* <TodoList store={todoStore} /> */}
      {/* <App/> */}
      <MemoryGame store={memoryGameStore} />
      <DevTools />
    </div>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

