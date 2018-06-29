import React, { Component } from 'react';
import styled from 'styled-components';
import { animation, color } from '../../toolbox';

const Container = styled.div`
   display: flex;
   align-items: center;
   height: 14vh;
   width: 100%;
   margin: 0.5em auto 0 auto;
   padding: 0 2em;
   color: white;
   box-sizing: border-box;
   transition: all 0.5s ease-in-out;
   background: #dddee0;
   transform: ${props => (props.hidden ? 'translateY(100%)' : null)};
   opacity: ${props => (props.hidden ? 0 : 1)};
`;

const AnswerBubble = styled.div`
   height: 7vh;
   width: 7vh;
   background: ${props => props.color || color.bubbles[1]};
   border-radius: 50%;
   box-sizing: border-box;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 0 1em;
   cursor: pointer;
   animation: ${animation.bounce} 1s;
   transition: all 0.5s ease;
   opacity: ${props => (props.hidden ? 0 : 1)};
   transform: ${props => (props.hidden ? 'scale(1.3)' : 'scale(1)')};

   &:hover {
      filter: brightness(1.1);
   }
`;

export default class AnswerContainer extends Component {
   state = {
      clicked: false,
      index: 0,
   };

   static getDerivedStateFromProps(nextProps, prevState) {
      return {
         index: nextProps.answers.length,
      };
   }

   backTrack = index => {
      this.setState({
         clicked: true,
         index,
      });

      setTimeout(() => {
         this.setState({
            clicked: false,
            index: 0,
         });
         this.props.onEvent({
            type: 'backtrack',
            index,
         });
      }, 500);
   };

   getAnswerBubbles = () => {
      const { answers } = this.props;
      const { clicked, index } = this.state;

      return answers.map((answer, i) => {
         return (
            <AnswerBubble
               key={'answer-bubble-' + i}
               color={answer.color}
               hidden={clicked && index <= i + 1}
               onClick={() => this.backTrack(i)}>
               <h3>{i + 1}</h3>
            </AnswerBubble>
         );
      });
   };

   render() {
      const { finished } = this.props;

      return <Container hidden={finished}>{this.getAnswerBubbles()}</Container>;
   }
}
