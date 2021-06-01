import React from 'react';
import { render } from 'react-dom';
import 'todomvc-app-css/index.css';
import { App } from './components/app';

render(<App />, document.getElementsByTagName('app-root')[0]);
