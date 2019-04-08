import { Dropdown } from 'reactstrap';
import styled from 'styled-components';

export default styled(Dropdown)`
  .btn-secondary{
    background-color: #f8f9fa;
    border: solid 1px #e8ebf0;
    border-radius: 2px;
    height: 40px;
    min-width: 160px;
    color: #747c84;
  }  
  .btn-secondary:focus{
    box-shadow: none;    
  }
  .btn-secondary.dropdown-toggle:focus{
    background-color: #f8f9fa !important;
    border: solid 1px #1173a4;
    box-shadow: none;
    color: #747c84;
  }   
  .btn-secondary.dropdown-toggle:active{
    background-color: #f8f9fa !important;
    border: solid 1px #1173a4;
    box-shadow: none;
    color: #747c84;
  }   
  .dropdown-item{
    border-bottom: 0;
    color: #747c84;
  }
  .dropdown-menu{
    box-shadow: 0 0 0 1px #e0e7ee;
    border: 0;
  }
  .dropdown-item:active{
      background-color: #e3edf2;
  }
  .dropdown-item:focus{     
    outline: none;
  }
`
