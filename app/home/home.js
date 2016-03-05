import React from 'react';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class Home extends React.Component {
  render() {

    return (
      <div>
          <Row>
            <Col lg="8" style={{"border": "1px solid black","minHeight": "500px"}}>
              <Row>
                <Col lg="6" style={{"border": "1px solid black","height": "250px"}}>
                  <div>Posts</div>

                </Col>
                <Col lg="6" style={{"border": "1px solid black","height": "250px"}}>
                  <div>Tasks</div>
                </Col>
              </Row>
              <Row>
                <Col lg="6" style={{"border": "1px solid black","height": "250px"}}>
                  <div>Imgs</div>
                </Col>
                <Col lg="6" style={{"border": "1px solid black","height": "250px"}}>
                  <div>Infoposts</div>
                </Col>
              </Row>

            </Col>
            <Col lg="4" style={{"border": "1px solid black","height": "500px"}}>
              <div>Calendar</div>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Home;
