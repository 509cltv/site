import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row, Col} from 'react-bootstrap';
import Cart from '../Cart/index';
import store from '../../store';
import '../../styles/animations.scss';
import {withRouter, Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
          <Container fluid={true}>
            <Row>
              <Row className="mobileMenu">
                <Col onClick={() => this.setState({sideBarOpen: true})}>
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                </Col>
                <p className="headerName">509</p>
                <i onClick={()=>store.dispatch({type: 'OPEN_CART' })} className="fa fa-shopping-cart cart_button justify-content-end"></i>
              </Row>
              <div className={this.state.sideBarOpen ? "openCover" : "closedCover"} onClick={() => this.setState({sideBarOpen: false})}></div>

              <Col className={this.state.sideBarOpen ? "sideBar openSide" : "sideBar"} lg="2">
                <Row className="d-flex justify-content-end">
                  <ul className="list-inline ">
                    <li className="name">509</li>
                    <li className="underName">cltv</li>
                  </ul>
                </Row>
                <Col className="spacer">&nbsp;</Col>
                <Row className="d-flex justify-content-end menu">
                  <ul className="list-inline">
                    <Link to="/"><li className={this.props.history.location.pathname === '/' ? "selected" : ""}>All</li></Link>
                    <Link to="/sweatshirts"><li className={this.props.history.location.pathname === '/sweatshirts' ? "selected" : ""}>Sweatshirts</li></Link>
                    <Link to="/shirts"><li className={this.props.history.location.pathname === '/shirts' ? "selected" : ""}>Shirts</li></Link>
                    <Link to="/hats"><li className={this.props.history.location.pathname === '/hats' ? "selected" : ""}>Hats</li></Link>
                  </ul>
                </Row>
                <Col className="spacer">&nbsp;</Col>

                <Row className="d-flex justify-content-end">
                  <i onClick={()=>store.dispatch({type: 'OPEN_CART' })} className="fa fa-shopping-cart cart_button"></i>
                </Row>
              </Col>
              <Col>
                <ReactCSSTransitionGroup
                  transitionName="content"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                    <div key={this.props.history.location.pathname}>
                      {this.props.children}
                    </div>
                </ReactCSSTransitionGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect((state) => state)(App));
