import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import Header from './components/layout/Header';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import { Provider } from './context';
import About from './components/pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <Provider>
      <Router>
        <div className='App'>
          <Header name='Header Component' />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Contacts} />
              <Route exact path='/contact/add' component={AddContact} />
              <Route exact path='/contact/edit/:id' component={EditContact} />
              <Route exact path='/about' component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
