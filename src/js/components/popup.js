import React, { Component } from 'react';
import styled from 'styled-components';
import { animation } from '../toolbox';

const OuterContainer = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   background: rgba(0,0,0,0.7);
   animation: ${animation.fadeIn} 0.35s;
`;

const PopupContainer = styled.div`
   height: 30vh;
   width: 30vh;
   background: white;
   margin: auto;
   border-radius: 12px;
   box-shadow: 0 0 50px rgb(70,70,70);
`;

export default class Popup extends Component {
   render() {
      return (
         <OuterContainer>
            <PopupContainer>
               <h3>Hi</h3>
            </PopupContainer>
         </OuterContainer>
      );
   }
}
