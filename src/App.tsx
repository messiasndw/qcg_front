import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes/index'
import { Provider } from 'react-redux'
import { store } from './redux/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router />

      </div>
    </Provider>
  );
}

export default App;
