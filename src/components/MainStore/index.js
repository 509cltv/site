import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-bootstrap';
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
      <Row className="justify-content-center itemSections">
        <Col>
          <h1>{this.props.item}</h1>
          {oProducts}
        </Col>
      </Row>
      </div>
          
    );
  }
}

export default withRouter(connect((state) => state)(MainStore));
