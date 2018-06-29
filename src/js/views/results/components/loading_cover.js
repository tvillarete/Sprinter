import React, { Component } from 'react';
import styled from 'styled-components';
import { animation, Loader } from '../../../toolbox';

const Container = styled.div`
   z-index: 100;
   position: absolute;
   background: white;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: ${props => (props.isOpen || props.isClosing ? 'flex' : 'none')};
   transform: ${props => props.isClosing ? 'scale(1.5)' : null};
   transition: all 0.3s ease;
   align-items: center;
   justify-content: center;
   animation: ${props => props.isClosing ? animation.fadeOut : null} 0.3s;
`;

const LoadingContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-bottom: 10%;
`;

export default class LoadingCover extends Component {
   state = {
      isClosing: false,
      aboutToClose: false
   };

   animateClosed() {
      this.setState({
         isClosing: true,
         aboutToClose: false
      });

      setTimeout(() => {
         this.setState({
            isClosing: false,
         });
      }, 300);
   }

   componentDidUpdate(prevProps, prevState) {
      const closeRequested = prevProps.isOpen && !this.props.isOpen;
      if (closeRequested) {
         this.setState({ aboutToClose: true });
         setTimeout(() => {
            this.animateClosed();
         }, 1000);
      }
   }

   render() {
      const { isOpen } = this.props;
      const { isClosing, aboutToClose } = this.state;

      return (
         <Container isOpen={isOpen || isClosing || aboutToClose} isClosing={isClosing}>
            <LoadingContainer>
               <h2>Loading Playce...</h2>
               <Loader />
            </LoadingContainer>
         </Container>
      );
   }
}
