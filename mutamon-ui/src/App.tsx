import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  HallOfFamePageComponent  from './components/hall-of-fame-page-component/HallOfFamePageContainer';
import { store } from './store';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/test' component={HallOfFamePageComponent}></Route>
            <Route path='/hof' component={HallOfFamePageComponent}></Route>
            <Route path='/' component={HallOfFamePageComponent}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;