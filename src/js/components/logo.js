import React, { Component } from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
   display: flex;
   flex-direction: column;
   margin: 1em auto 0 auto;
   height: 30vh;
   width: 30vh;
   background: ${props => props.isEntering ? '#ff4848' : 'transparent'};
   color: ${props => (props.isEntering ? 'white' : 'rgb(130, 130, 130);')};
   text-align: center;
   border-radius: 50%;
   font-size: 5vh;
   font-family: Yikes;
   display: flex;
   align-items: center;
   text-align: center;
   transition: all 1s ease;
   animation: bounce 2s;
   opacity: ${props => props.isEntering ? 0 : 1};

   @keyframes bounce {
      0% {
         transform: scale(0);
         opacity: 0;
      }
      50% {
         transform: scale(1.6);
         opacity: 0.7;
      }
      60% {
         transform: scale(0.6);
         opacity: 1;
      }
      100% {
         transform: scale(1);
      }
   }
`;

const LogoText = styled.h2`
   margin: auto;
   font-weight: 300;
`;

export default class Logo extends Component {
   state = {
      isEntering: true,
   };

   beginAnimation() {
      setTimeout(() => {
         this.setState({ isEntering: false });
      }, 1490);
   }

   componentDidMount() {
      this.beginAnimation();
   }

   render() {
      const { isEntering } = this.state;

      return (
         <LogoContainer isEntering={isEntering}>
            <LogoText>Playce</LogoText>
         </LogoContainer>
      );
   }
}
