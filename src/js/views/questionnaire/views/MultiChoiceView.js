import React, { Component } from 'react';
import styled from 'styled-components';
import Question from './components/question';
import Bubble from '../../../components/bubble';
import { color, animation } from '../../../toolbox';

const QuestionCount = styled.h2`
   font-family: 'GT Walsheim';
   font-size: 5vh;
   text-align: center;
   margin: 1vh 0 0 0;
`;

const Container = styled.div`
   height: 76.5vh;
   display: flex;
   flex-direction: column;
   animation: ${props =>
         props.changingQuestions
            ? animation.slideOutLeft
            : animation.slideInRight}
      0.5s;
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
`;

export default class MultiChoiceView extends Component {
   selectAnswer = ({ answer, c }) => {
      const { next } = answer;

      this.props.onEvent({
         type: 'select-answer',
         answer: answer.answer,
         color: c,
         next,
      });
   };

   getBubbles = () => {
      const { answers } = this.props;

      return answers.map((answer, index) => {
         const c = index > 5 ? color.bubbles[index - 5] : color.bubbles[index];
         return (
            <Bubble
               key={`${answer}-${index}`}
               size="15vh"
               text={answer.answer}
               color={c}
               onClick={() => this.selectAnswer({ answer, c })}
            />
         );
      });
   };

   render() {
      const { question, index, changingQuestions } = this.props;

      return (
         <Container
            key={`${question}-${index}`}
            changingQuestions={changingQuestions}>
            <QuestionCount>Question {index}</QuestionCount>
            <Question text={question} />
            <BubbleContainer>{this.getBubbles()}</BubbleContainer>
         </Container>
      );
   }
}
