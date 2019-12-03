import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import './index.css';
import App from './components/App/index';
import * as serviceWorker from './serviceWorker';
import Client from 'shopify-buy';
import { Provider } from 'react-redux';
import store from './store';
import './styles/app.css';
import history from './history.js';
import ItemPage from './components/ItemPage/index';
import MainStore from './components/MainStore/index';
import './styles/global.sass';


const client = Client.buildClient({
  storefrontAccessToken: process.env.REACT_APP_STOREFRONT_ACCESS,
  domain: '509cltv.myshopify.com'
});
store.dispatch({type: 'CLIENT_CREATED', payload: client});

// buildClient() is synchronous, so we can call all these after!
client.product.fetchAll().then((res) => {
  store.dispatch({type: 'PRODUCTS_FOUND', payload: res});
});
client.checkout.create().then((res) => {
  store.dispatch({type: 'CHECKOUT_FOUND', payload: res});
});
client.shop.fetchInfo().then((res) => {
  store.dispatch({type: 'SHOP_FOUND', payload: res});
});

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <App>
          <Route exact path="/" render={() => <MainStore item="all"/>}/>
          <Route path="/item/:id" component={ItemPage}/>
          <Route path="/sweatshirts" render={() => <MainStore item="Sweatshirt"/>}/>
          <Route path="/shirts" render={() => <MainStore item="Shirt"/>}/>
          <Route path="/hats" render={() => <MainStore item="Hat"/>} />
        </App>
      </Router>
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
