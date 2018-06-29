import React, { Component } from 'react';
import styled from 'styled-components';
import { animation } from '../../toolbox';
import AnswerContainer from './answer_container';
import MultiChoiceView from './views/MultiChoiceView';
import ConclusionView from './views/Conclusion';

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   transition: all 0.5s ease;
   transform: ${props => (props.changingView ? 'scale(1.5)' : 'scale(1)')};
   opacity: ${props => (props.changingView ? 0 : 1)};
   animation: ${animation.scaleEnter} 0.5s;
   overflow: auto;
   padding-top: 5.2em;
`;

const QuestionContainer = styled.div`
   display: flex;
   flex-direction: column;
`;

const views = {
   MultiChoiceView: <MultiChoiceView />,
   ConclusionView: <ConclusionView />,
};

export default class QuestionnaireView extends Component {
   constructor(props) {
      super(props);
      const { questionnaire, coords } = props;
      const { start } = questionnaire.options;

      this.state = {
         questionnaire,
         questionStack: [questionnaire.questions[start]],
         answers: [],
         coords,
         changingQuestions: false,
         finished: false,
      };
   }

   handleEvent = options => {
      switch (options.type) {
         case 'select-answer':
            this.selectAnswer(options);
            break;
         case 'backtrack':
            this.backTrack(options.index);
            break;
         default:
            this.props.onEvent(options);
      }
   };

   selectAnswer(options) {
      const { questionStack } = this.state;
      const currentQuestion = questionStack[questionStack.length - 1];
      const { shorthand } = currentQuestion;
      const { answer, next, color } = options;

      this.setState({ changingQuestions: true });

      setTimeout(() => {
         this.setState(state => {
            state.changingQuestions = false;
            state.answers.push({
               shorthand,
               color,
               answer,
            });
            if (!next) {
               state.finished = true;
            }
            state.questionStack.push(state.questionnaire.questions[next]);
            return state;
         });
      }, 500);
   }

   backTrack(index) {
      this.setState(state => {
         state.questionStack = state.questionStack.slice(0, index + 1);
         state.answers = state.answers.slice(0, index);
         return state;
      });
   }

   getCurrentQuestion = () => {
      const { questionStack, changingQuestions } = this.state;
      const questionItem = questionStack[questionStack.length - 1];
      const view = views[questionItem.view];
      const props = {
         index: questionStack.length,
         question: questionItem.question,
         answers: questionItem.answers,
         changingQuestions,
      };
      props.onEvent = this.handleEvent;

      try {
         return React.cloneElement(view, props);
      } catch (e) {
         console.error('Error: This question is broken:', questionItem);
      }
   };

   getConclusion = () => {
      const { changingQuestions, answers, coords } = this.state;
      const { category } = this.props;

      const view = views.ConclusionView;
      const props = {
         changingQuestions,
         answers,
         coords,
         category: category.toLowerCase()
      };
      props.onEvent = this.handleEvent;

      try {
         return React.cloneElement(view, props);
      } catch (e) {
         console.error('Error: This question is broken');
      }
   };

   render() {
      const { changingView } = this.props;
      const { answers, finished } = this.state;

      return (
         <Container changingView={changingView}>
            <QuestionContainer>
               {finished ? this.getConclusion() : this.getCurrentQuestion()}
            </QuestionContainer>
            <AnswerContainer
               answers={answers}
               finished={finished}
               onEvent={this.handleEvent}
            />
         </Container>
      );
   }
}
