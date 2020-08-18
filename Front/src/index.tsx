import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import axios from 'axios';

import Store, { persistor } from './authentificatedPages/store';

import './App.scss';

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

axios.defaults.headers.post['Content-Type'] = 'application/json';

const render = (): void => {
  const App = require('./authentificatedPages/App').default;

  ReactDOM.render(
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./authentificatedPages/App', render);
}
