import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HallOfFamePageComponent } from './components/hall-of-fame-page-component/HallOfFamePageComponent';
import { store } from './store';
import  UserPageComponet  from './components/user-page-component/UserPageContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/test' component={UserPageComponet}></Route>
            <Route path='/' component={HallOfFamePageComponent}></Route>
            
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;