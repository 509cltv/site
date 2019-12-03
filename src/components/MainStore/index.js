import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter} from 'react-router-dom';
import Products from '../shopify/Products';
import './styles.sass';

class MainStore extends Component {
  
  render() {
    const state = store.getState();
    let oProducts = <Products 
      products={state.products}
      client={state.client}
      addVariantToCart={this.addVariantToCart}
      item={this.props.item}
    />;
    return (
      <div>
        {oProducts}
      </div>
          
    );
  }
}

export default withRouter(connect((state) => state)(MainStore));
