import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter} from 'react-router-dom';
import Products from '../Products/index';
import './styles.scss';

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
