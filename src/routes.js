import React from 'react';
import { Route } from 'react-router-dom';

import ItemPage from './components/ItemPage/index';


export default (
  <Route exact path="/" component={App}>
    <Route path="item/:id" component={ItemPage} />
  </Route>
);