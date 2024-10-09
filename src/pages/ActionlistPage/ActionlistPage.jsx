import React, { Component } from 'react';
import { CardBody, Col, Row } from 'reactstrap';

import { StandardTemplate } from 'templates';
import Actionlist from './components/Actionlist';
import { PageTitleDivStyled } from 'styled';
import { CardStyled, CardHeaderStyled } from 'styled';
import styled from 'styled-components';

const FirstCardStyled = styled(CardStyled)`
  border-top: solid 2px #1173a4;
`

class ActionlistPage extends Component {

  render() {

    return (
      <StandardTemplate>
        <div className="ActionlistPage">
          <Row>
            <Col xs="12">
              <PageTitleDivStyled>操作页面</PageTitleDivStyled>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <FirstCardStyled>
                <CardHeaderStyled>
                  操作列表
                </CardHeaderStyled>
                <CardBody>
                  <Actionlist/>
                </CardBody>
              </FirstCardStyled>
            </Col>
          </Row>
        </div>
      </StandardTemplate>
    );
  }
}

export default ActionlistPage;
