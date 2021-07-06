import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes/index'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import Context,{ ToastProvider} from './context/toast';

const App: FC = () => {

  return (
    <Provider store={store}>
      <ToastProvider>
        <div className="App">
          <Router />

        </div>
      </ToastProvider>
    </Provider>
  );
}

export default App;
