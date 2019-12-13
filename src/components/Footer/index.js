import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import './styles.scss';

class Footer extends Component {
  constructor() {
    super();
    this.state = {};
  };

  render() {
    return(
      <Container fluid={true} className="footerContainer">
        <Col>
          {/* <Row>
            <Col className="footerSpace" lg="1">&nbsp;</Col>
            <div className="footerFlex">
              <div className="about" onClick={() => { const cur = this.state.about; this.setState({about: !cur})}}>Other</div>
              <div className={this.state.about ? "details active" : "details"}>
                This is a test
              </div>
            </div>
          </Row> */}
          <Row className="footerLow">
            <Col className="footerSpace" lg="1">&nbsp;</Col>
            <div className="footerName">
              <p className="fiveOhNine">509<span className="cltv">cltv</span></p>
            </div>
            <div className="ml-auto my-auto">
            &#169; 509cltv | All Rights Reserved
            </div>
            <Col className="footerSpace" lg="1">&nbsp;</Col>

          </Row>
        </Col>
      </Container>
    );
  }
}

export default withRouter(Footer);
