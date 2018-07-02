import React, { Component } from 'react';
import styled from 'styled-components';
import { animation } from '../../toolbox';
import AnswerContainer from './answer_container';
import MembersView from './views/members';
import SprintDaysView from './views/sprint_days';
import PrevSprintView from './views/prev_sprint';
import SummaryView from './views/summary';
import onboardViews from './config.json';

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
   members: <MembersView />,
   sprint_days: <SprintDaysView />,
   prev_sprint: <PrevSprintView />,
   summary: <SummaryView />
};

export default class OnboardingView extends Component {
   constructor(props) {
      super(props);
      const { start } = onboardViews.options;

      this.state = {
         onboardViews,
         config: {},
         viewStack: [onboardViews.views[start]],
         answers: [],
         changingViews: false,
         finished: false,
      };
   }

   handleEvent = options => {
      switch (options.type) {
         case 'next-view':
            this.nextView(options);
            break;
         case 'backtrack':
            this.backTrack(options.index);
            break;
         default:
            this.props.onEvent(options);
      }
   };

   nextView(options) {
      const { view } = options;

      this.setState({ changingViews: true });

      setTimeout(() => {
         this.setState(state => {
            state.changingViews = false;
            state.config = options.config;

            if (!view) {
               state.finished = true;
            }
            state.viewStack.push(onboardViews.views[view]);
            return state;
         });
      }, 500);
   }

   backTrack(index) {
      this.setState(state => {
         state.viewStack = state.viewStack.slice(0, index + 1);
         state.answers = state.answers.slice(0, index);
         return state;
      });
   }

   getCurrentView = () => {
      const { viewStack, changingViews, config } = this.state;
      const viewItem = viewStack[viewStack.length - 1];
      const view = views[viewItem.view];

      const props = {
         index: viewStack.length,
         next: viewItem.next,
         config,
         changingViews,
      };
      props.onEvent = this.handleEvent;

      try {
         return React.cloneElement(view, props);
      } catch (e) {
         console.error('Error: This question is broken:', viewItem);
      }
   };

   getConclusion = () => {
      const { changingViews, config } = this.state;
      const { category } = this.props;

      const view = views.summary;
      const props = {
         changingViews,
         config,
      };
      props.onEvent = this.handleEvent;

      try {
         return React.cloneElement(view, props);
      } catch (e) {
         console.error('Error: Conclusion is broken');
      }
   };

   getConfig() {
      if (!localStorage.sprinterConfig) {
         localStorage.sprinterConfig = JSON.stringify({
            start_date: null,
            end_date: null,
            total_person_days: 0,
            avg_sp_person_days: 0,
            holidays: 0,
            members: [],
            prevSprints: [{}, {}, {}],
         });
      }
      const config = JSON.parse(localStorage.sprinterConfig);
      this.setState({ config });
   }

   componentDidMount() {
      this.getConfig();
   }

   render() {
      const { changingView } = this.props;
      const { answers, finished } = this.state;

      return (
         <Container changingView={changingView}>
            <QuestionContainer>
               {finished ? this.getConclusion() : this.getCurrentView()}
            </QuestionContainer>
            {false && (
               <AnswerContainer
                  answers={answers}
                  finished={finished}
                  onEvent={this.handleEvent}
               />
            )}
         </Container>
      );
   }
}
