import React, { Component } from 'react';
import Product from '../Product/index';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom';

class Products extends Component {
  render() {
    let products = this.props.products.map((product) => {
      if (this.props.item === "all") {
        return (
          <Product
            client={this.props.client}
            key={product.id.toString()}
            product={product}
          />
        );
      }
      if (product.productType === this.props.item) {
        return (
          <Product
            client={this.props.client}
            key={product.id.toString()}
            product={product}
          />
        );
      }
      else {
        return(<div></div>);
      }
    });
    return (
      <div className="ProductWrapper">
        {products}
      </div>
    );
  }
}

export default withRouter(connect((state) => state)(Products));