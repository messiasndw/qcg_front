import React, {FC} from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes/index'
const App: FC = () => {
  return (
      <div className="App">
        <Router />
        
      </div>
  );
}

export default App;
