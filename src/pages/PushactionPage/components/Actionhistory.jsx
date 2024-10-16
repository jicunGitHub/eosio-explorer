import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Row, Col, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadingSpinner, LimitSelectDropdown } from 'components';
import styled from 'styled-components';
import { TableStyled, ButtonPrimary, DropdownStyled, ButtonSecondary, ExclamationIconStyled, SuccessIconStyled, ToolTipUncontrolledStyled } from 'styled';
import { recordsUpdate, filterUpdate } from '../PushactionPageReducer';

const CustomButton = styled(ButtonPrimary)`
  margin: 0 auto;
`
const TableStyledNoPointer = styled(TableStyled)`
  tbody tr:hover{
    cursor: initial;
  }
`
const TdStyled = styled.td`
  padding-top: 19px !important;
  font-family: monospace, monospace;
`
const ColStyled = styled(Col)`
  margin-bottom: 20px;
  padding-right: 10px;
`
const CustomDropdown = styled(DropdownStyled)`
  .btn-secondary {
    width: 100%;
  }
  .dropdown-menu {
    width: 100%;
  }  
  [disabled] {
    pointer-events: none;
  }
`

const dropdownMaxHeight = {
  setMaxHeight: {
    enabled: true,
    fn: (data) => {
      return {
        ...data,
        styles: {
          ...data.styles,
          overflow: 'auto',
          maxHeight: 300,
        },
      };
    },
  }
}

// Sort smartcontract list by alphabetical order
const alphabeticalSort = (a, b) => {
  let contractNameA = a.name,
    contractNameB = b.name;
  if (contractNameA < contractNameB)
    return -1;
  if (contractNameA > contractNameB)
    return 1;
  return 0;
}

const Actionhistory = (props) => {

  let { pushactionPage: { isFetchingActionHistory, data: { actionsList = [] }, records, filter, smartContracts: { smartContractsList = [] } } } = props;

  const [isOpenDropDownSmartContract, toggleDropDownSmartContract] = useState(false);

  return (
    <div className="Actionhistory">
      <Row>
        <Col xs="12">
          <Row>
            <ColStyled xs="3">
              <CustomDropdown id="SmartContractFilterDropdown" isOpen={isOpenDropDownSmartContract} toggle={() => { toggleDropDownSmartContract(!isOpenDropDownSmartContract) }}>
                <DropdownToggle caret>{filter.smartContractName || "按Smart协议过滤"}</DropdownToggle>
                <DropdownMenu modifiers={dropdownMaxHeight}>
                  {smartContractsList &&
                    (smartContractsList.sort(alphabeticalSort)).map((smartContract, index) =>
                      <DropdownItem key={index} onClick={(e) => { (smartContract.name !== filter.smartContractName) && props.filterUpdate({ smartContractName: smartContract.name }); }}>
                        {smartContract.name}
                      </DropdownItem>)}
                </DropdownMenu>
              </CustomDropdown>
            </ColStyled>
            <ColStyled xs="6" className="text-left pl-0">
              <ButtonSecondary block size="sm" onClick={(e) => { props.filterUpdate({ smartContractName: "" }); }}>清除</ButtonSecondary>
            </ColStyled>

            <ColStyled xs="3" className="text-right">
              <LimitSelectDropdown limit={records} onChange={(limit) => { props.recordsUpdate(limit) }} />
            </ColStyled>

            <Col xs="12">
              <TableStyledNoPointer borderless>
                <thead>
                  <tr className="font-weight-bold">
                    <th width="20%">Smart协议名称</th>
                    <th width="20%">操作类型</th>
                    <th width="20%">时间</th>
                    <th width="20%">权限</th>
                    <th width="5%" className="text-center">成功</th>
                    <th width="15%" className="text-center">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {isFetchingActionHistory ?
                    <tr><td colSpan="6" className="text-center"><LoadingSpinner /></td></tr>
                    : actionsList.length < 1 ?
                      <tr><td colSpan="6" className="text-center">未找到任何操作{filter.smartContractName && ` Smart协议为 ${filter.smartContractName}`}</td></tr>
                      : actionsList.map((action, index) =>
                        <tr key={index}>
                          <TdStyled><Link to={`/contract/${action.act_account}`}>{action.act_account}</Link></TdStyled>
                          <TdStyled>{action.act_name}</TdStyled>
                          <TdStyled>{action.timestamp}</TdStyled>
                          <TdStyled>{action.actor + "@" + action.permission}</TdStyled>
                          <TdStyled className="text-center">
                            {action.except ?
                              <>
                                <ExclamationIconStyled id={"actionErrorIndicator" + index} className="fa fa-exclamation-circle"></ExclamationIconStyled>
                                <ToolTipUncontrolledStyled placement="left" target={"actionErrorIndicator" + index}
                                  delay={{ show: 0, hide: 0 }}
                                  trigger="hover"
                                  autohide={true}
                                >
                                  {action.except.message}
                                </ToolTipUncontrolledStyled>
                              </>
                              : <SuccessIconStyled className="fa fa-check-circle"></SuccessIconStyled>}
                          </TdStyled>
                          <td className="text-center">
                            {/* When the prefill button is clicked, call the prefill callback supplied by the parent component */}
                            <CustomButton block size="sm" onClick={(e) => { e.preventDefault(); props.prefillCallback(action); }}>预填充</CustomButton>
                          </td>
                        </tr>
                      )}
                </tbody>
              </TableStyledNoPointer>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default connect(
  ({ pushactionPage, router }) => ({
    pushactionPage,
    router
  }),
  {
    recordsUpdate,
    filterUpdate
  }
)(Actionhistory);
