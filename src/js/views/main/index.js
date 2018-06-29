import React, { Component } from 'react';
import styled from 'styled-components';
import Bubble from '../../components/bubble';
import { animation, color } from '../../toolbox';

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding-top: 8vh;
   transition: all 0.5s ease;
   transform: ${props => (props.changingView ? 'scale(1.5)' : 'scale(1)')};
   opacity: ${props => (props.changingView ? 0 : 1)};
   animation: ${animation.scaleEnter} 0.5s;
`;

const MenuButtonContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   transition: 1s ease;
`;

export default class MainView extends Component {
   start = () => {
      this.props.onEvent({
         type: 'new-view',
         view: { name: 'setup', props: {} },
      });
   };

   render() {
      const { changingView } = this.props;

      return (
         <Container changingView={changingView}>
            <MenuButtonContainer>
               <Bubble
                  text="New Sprint"
                  color={color.bubbles[2]}
                  onClick={this.start}
               />
            </MenuButtonContainer>
         </Container>
      );
   }
}
