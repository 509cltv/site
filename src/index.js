import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import './index.css';
import App from './components/App/index';
import * as serviceWorker from './serviceWorker';
import Client from 'shopify-buy';
import { Provider } from 'react-redux';
import store from './store';
import './styles/app.scss';
import history from './history.js';
import ItemPage from './components/ItemPage/index';
import MainStore from './components/MainStore/index';
import Home from './components/Home/index';
import './styles/global.scss';
import ReactGA from 'react-ga';


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

ReactGA.initialize("UA-154670614-1");
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        {/* <Home>
          <Route path="/item/:id" component={ItemPage}/>
        </Home> */}
        <App>
          <Route exact path="/" render={Home}/>
          <Route path="/item/:id" component={ItemPage}/>
          <Route path="/all" render={() => <MainStore item="All"/>}></Route>
          <Route path="/sweatshirts" render={() => <MainStore item="Sweatshirts"/>}/>
          <Route path="/shirts" render={() => <MainStore item="Shirts"/>}/>
          <Route path="/hats" render={() => <MainStore item="Hats"/>} />
          <Route path="/test" component={Home}/>
        </App>
      </Router>
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
