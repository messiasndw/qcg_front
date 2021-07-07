import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes/index'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { ToastProvider } from './context/toast';
import { WebSocketContextProvider } from './context/websocket';

const App: FC = () => {

  return (
    <Provider store={store}>
      <WebSocketContextProvider>
        <ToastProvider>
          <div className="App">
            <Router />

          </div>
        </ToastProvider>
      </WebSocketContextProvider>
    </Provider>
  );
}

export default App;
