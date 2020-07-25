import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Store, { persistor } from './authentificatedPages/store';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
/*
// Structure
Amplify.configure({
  aws_project_region
  aws_cognito_identity_pool_id
  aws_cognito_region
  aws_user_pools_id
  aws_user_pools_web_client_id
  aws_cloud_logic_custom: [
    {
      name
      endpoint
      region
    },
  ],
  API: {
    endpoints: [
      {
        name
        endpoint
      },
    ],
  },
});
*/

function render() {
  const App = require('./authentificatedPages/App').default;
  // const Header = require('./components/Header').default;
  // const Navigation = require('./components/Navigation').default;
  const HomePage = require('./unauthentificatedPages/HomePage').default;

  ReactDOM.render(
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  );
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./authentificatedPages/App', render);
  // module.hot.accept('./components/Header', render);
  // module.hot.accept('./components/Navigation', render);
  module.hot.accept('./unauthentificatedPages/HomePage', render);
}
