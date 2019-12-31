import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HallOfFamePageComponent } from './components/hall-of-fame-page-component/HallOfFamePageComponent';
import { store } from './store';

const App: React.FC = () => {
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Mutamon</code> and save to reload. new text. even newer test
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/test' component={HallOfFamePageComponent}></Route>
            <Route path='/' component={HallOfFamePageComponent}></Route>
          </Switch>
        </Router>
      </Provider>
>>>>>>> 23822bb89dea56d3306be3ad1145cd603b92a35c
    </div>
  );
}

export default App;