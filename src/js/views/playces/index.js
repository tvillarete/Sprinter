import React, { Component } from 'react';
import styled from 'styled-components';
import { animation, color } from '../../toolbox';
import Bubble from '../../components/bubble';

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding-top: 28vh;
   transition: all 0.5s ease;
   transform: ${props => (props.changingView ? 'scale(1.5)' : 'scale(1)')};
   opacity: ${props => (props.changingView ? 0 : 1)};
   animation: ${animation.scaleEnter} 0.5s;
   overflow: auto;
`;

const BubbleContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   align-content: center;
   flex: 1;
   max-width: 48em;
   margin: 0 auto;
   padding-bottom: 13em;
`;

const Header = styled.h1`
   margin: 0;
   text-align: center;
`;

const Empty = styled.h2`
   font-size: 3vh;
   color: rgb(171, 171, 171);
   font-weight: normal;
`;

export default class MyPlaycesView extends Component {
   state = {
      playces: [],
   };

   componentDidMount() {
      const playces = localStorage.playces
         ? JSON.parse(localStorage.playces)
         : [];

      if (playces.length) {
         this.setState({ playces });
      }
   }

   viewPlayce = playce => {
      this.props.onEvent({
         type: 'new-view',
         view: {
            name: 'results',
            props: {
               results: [playce],
            },
         },
         showBackButton: true,
      });
   };

   getBubbles = () => {
      const { playces } = this.state;

      return playces.map((playce, index) => {
         const c = index > 5 ? color.bubbles[index - 5] : color.bubbles[index];
         return (
            <Bubble
               key={`${playce.name}-${index}`}
               size="15vh"
               text={playce.name}
               color={c}
               onClick={() => this.viewPlayce(playce)}
            />
         );
      });
   };

   render() {
      const { changingView } = this.props;
      const { playces } = this.state;

      return (
         <Container changingView={changingView}>
            <Header>My Playces</Header>
            <BubbleContainer>
               {playces.length ? (
                  this.getBubbles()
               ) : (
                  <Empty>{'Nothing here :('}</Empty>
               )}
            </BubbleContainer>
         </Container>
      );
   }
}
