import React, { Component } from 'react';
import styled from 'styled-components';
import Bubble from '../../components/bubble';
import { constants, Button } from '@ifixit/toolbox';
import { animation, color } from '../../toolbox';

const iFixitColors = constants.color;

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

const LogoContainer = styled.div`
   width: 100%;
   margin-top: 10em;
   display: flex;
   justify-content: center;
`;

const Logo = styled.img`
   height: 6em;
`;

const Header = styled.h1`
   margin: 1em auto 2em auto;
   color: ${iFixitColors.gray[6]};
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
         view: { name: 'onboarding', props: {} },
      });
   };

   render() {
      const { changingView } = this.props;

      return (
         <Container changingView={changingView}>
            <LogoContainer>
               <Logo src="files/images/logo.svg" />
            </LogoContainer>
            <Header>Milestone Planning Tool</Header>
            <MenuButtonContainer>
               <Button
                  style={{marginRight: '1em'}}
                  children="Past Sprints"
                  onClick={this.start}
               />
               <Button
                  children="New Sprint"
                  design="primary"
                  onClick={this.start}
               />
            </MenuButtonContainer>
         </Container>
      );
   }
}
