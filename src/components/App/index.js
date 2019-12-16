import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row, Col} from 'react-bootstrap';
import Cart from '../Cart/index';
import store from '../../store';
import '../../styles/animations.scss';
import {withRouter} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Footer from '../Footer/index';
import Topbar from '../Topbar/index';   
import './styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false,
    };
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.handleCartOpen = this.handleCartOpen.bind(this);
  };

  updateQuantityInCart(lineItemId, quantity) {
    const state = store.getState(); // state from redux store
    const checkoutId = state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]
    state.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      store.dispatch({type: 'UPDATE_QUANTITY_IN_CART', payload: {checkout: res}});
    });
  }
  removeLineItemInCart(lineItemId) {
      const state = store.getState(); // state from redux store
      const checkoutId = state.checkout.id
      state.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
        store.dispatch({type: 'REMOVE_LINE_ITEM_IN_CART', payload: {checkout: res}});
      });
  }
  addVariantToCart(variantId, quantity) {
    const state = store.getState(); // state from redux store
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: {isCartOpen: true, checkout: res}});
    });
  }
  handleCartClose() {
      store.dispatch({type: 'CLOSE_CART'});
  }
  handleCartOpen() {
      store.dispatch({type: 'OPEN_CART'});
  }

  render() {
    const states = store.getState();
    return (
      <React.Fragment>
        <div>
          <Cart
            checkout={states.checkout}
            isCartOpen={states.isCartOpen}
            handleCartClose={this.handleCartClose}
            updateQuantityInCart={this.updateQuantityInCart}
            removeLineItemInCart={this.removeLineItemInCart}
          />
          <Col>
            <Container fluid={true}>
              <Topbar></Topbar>
              <Row className="justify-content-center">
                <ReactCSSTransitionGroup
                  className="transitionGroup"
                  transitionName="content"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                    <div key={this.props.history.location.pathname}>
                      {this.props.children}
                    </div>
                </ReactCSSTransitionGroup>
              </Row>
            <Footer></Footer>
            </Container>
          </Col>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect((state) => state)(App));
