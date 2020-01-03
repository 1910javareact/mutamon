import React from 'react';
import './App.css';
import  BattleComponent  from './components/battle-component/BattleContainer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  HallOfFamePageComponent  from './components/hall-of-fame-page-component/HallOfFamePageContainer';
import { store } from './store';
import  UserPageComponet  from './components/user-page-component/UserPageContainer';
import  LoginComponent  from './components/login-component/LoginContainer';
import  MutationSelectionPageComponent  from './components/mutation-selection-page-component/MutationSelectionPageContainer';
import  SignUpComponent  from './components/sign-up-component/SignUpContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/users' component={UserPageComponet}></Route>
            <Route path='/battle' component={BattleComponent}></Route>
            <Route path='/test' component={HallOfFamePageComponent}></Route>
            <Route path='/hof' component={HallOfFamePageComponent}></Route>
            <Route path='/login' component={LoginComponent}></Route>
            <Route path='/signup' component={SignUpComponent}></Route>
            <Route path='/mutate' component={MutationSelectionPageComponent}></Route>
            <Route path='/' component={LoginComponent}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;