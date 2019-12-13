import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import { fadeInRight, fadeInUp } from 'react-animations';
import {Row,Col} from 'react-bootstrap';
import {StyleSheet, css} from 'aphrodite';
import logo from './Triangle.png';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/animations.scss';
import './styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.sweatshirts = React.createRef();
  }
  
  render() {
    const styles = StyleSheet.create({
      fadeInRight: {
        animationName: fadeInRight,
        animationDuration: '2s'
      },
      fadeInUp: {
        animationName: fadeInUp,
        animationDuration: '2s'
      }
    });
    return(
      <React.Fragment>
        <Container fluid={true}>
          <Col className="homeHero">
            <Row className="justify-content-center">
              
              <div className={css(styles.fadeInRight) + " homeText"}>
                <div className="five">509CLTV
                  </div>
                  <span className="collection">Winter Collection</span>
                </div>
            </Row>
            
            <Row className="justify-content-center">
              <div className={css(styles.fadeInUp)}>
                <img className="tiger" src={logo} alt="Home logo"/>
              </div>
            </Row>

            <Row className="justify-content-center">
              <div className="description"> lifestyle brand for your
              5to9 when you’re not at 
              your 9to5</div>
            </Row>
            
          </Col>
        </Container>
      </React.Fragment>
    );
  }
};

export default withRouter(connect((state) => state)(Home));
