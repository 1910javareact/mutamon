import React from 'react';
import './App.css';
import { BattleComponent } from './components/battle-component/BattleComponents';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HallOfFamePageComponent } from './components/hall-of-fame-page-component/HallOfFamePageComponent';
import { store } from './store';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/battle' component={BattleComponent}></Route>
            <Route path='/test' component={HallOfFamePageComponent}></Route>
            <Route path='/' component={HallOfFamePageComponent}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;