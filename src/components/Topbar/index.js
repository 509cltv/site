import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Row,Col} from 'react-bootstrap';
import {ReactComponent as Logo} from '../../static/logo.svg';
import {ReactComponent as Shop} from '../../static/shopping-bag.svg';
import './styles.scss';
import store from '../../store';


class Topbar extends Component {
  render() {
    return(
      <Col>
        <Row className="topbar justify-content-center">
          <Link className="link" to="/"><Logo></Logo></Link>
          <Shop className="shop" onClick={()=>store.dispatch({type: 'OPEN_CART' })}></Shop>
        </Row>
        <Row className="justify-content-center">
          <ul className="listInline">
            <Link className="link" to="/all"><li>All</li></Link>
            <Link className="link" to="/sweatshirts"><li>Sweatshirts</li></Link>
            <Link className="link" to="/shirts"><li>Shirts</li></Link>
            <Link className="link" to="/hats"><li>Hats</li></Link>
          </ul>
        </Row>
      </Col>
    );
  }
};

export default withRouter(Topbar);