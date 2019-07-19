import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GT from '../fonts/GT/GTWalsheim.woff2';
import GTLO from '../fonts/GT/GTWalsheim-LightOblique.woff2';
import GTL from '../fonts/GT/GTWalsheim-Light.woff2';
import GTM from '../fonts/GT/GTWalsheim-Medium.woff2';
import GTB from '../fonts/GT/GTWalsheim-Bold.woff2';
import GTRO from '../fonts/GT/GTWalsheim-RegularOblique.woff2';
import GTBO from '../fonts/GT/GTWalsheim-BoldOblique.woff2';
import Home from '../images/home.svg';
import MainView from './views/main/index';
import AboutView from './views/about/index';
import OnboardingView from './views/onboarding';
import ResultsView from './views/results/index';
import MyPlaycesView from './views/playces/index';

const GlobalStyle = createGlobalStyle`
   @font-face {
      font-family: yikes;
      src: url('files/fonts/yikes.ttf') format('truetype');
   }

   @font-face {
      font-family: 'GT Walsheim';
      src: url('${GT}') format('woff2');
      font-weight: normal;
      font-style: normal;
   }

   @font-face {
      font-family: 'GT Walsheim';
      src: url('${GTLO}') format('woff2'),
      font-weight: 300;
      font-style: italic;
  }

  @font-face {
      font-family: 'GT Walsheim';
      src: url('${GTL}') format('woff2'),
      font-weight: 300;
      font-style: normal;
  }

  @font-face {
      font-family: 'GT Walsheim';
      src: url('${GTM}') format('woff2'),
      font-weight: 500;
      font-style: normal;
  }

  @font-face {
      font-family: 'GT Walsheim';
      src: url('${GTB}') format('woff2'),
      font-weight: bold;
      font-style: normal;
  }

  @font-face {
      font-family: 'GT Walsheim';
      src: url('${GTRO}') format('woff2'),
      font-weight: normal;
      font-style: italic;
  }

  @font-face {
      font-family: 'GT Walsheim';
      src: url('${GTBO}') format('woff2'),
      font-weight: bold;
      font-style: italic;
  }

`;

const Container = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   flex-direction: column;
`;

const ViewContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
   transition: all 0.4s ease;
   opacity: ${props => (props.hidden ? 0 : 1)};
`;

const HomeIcon = styled.div`
   position: fixed;
   z-index: 100;
   display: flex;
   align-items: center;
   height: 5vh;
   padding: 0 1em;
   cursor: pointer;
   opacity: ${props => (props.hide ? 0 : 1)};
   pointer-events: ${props => (props.hide ? 'none' : 'all')};
   transition: all 0.35s ease;
   background-image: url('${Home}');
   background-size: contain;
   background-repeat: no-repeat;
   margin: 14px 0 0 16px;
   height: 69px;
   width: 69px;
   &:hover {
      opacity: 0.7;
   }
`;

const views = {
   main: <MainView />,
   playces: <MyPlaycesView />,
   onboarding: <OnboardingView />,
   about: <AboutView />,
   results: <ResultsView />,
};

export default class Sprinter extends Component {
   state = {
      viewStack: [{ name: 'main', props: {} }],
      changingView: false,
      emptyingViews: false,
   };

   handleEvent = options => {
      switch (options.type) {
         case 'new-view':
            this.newView(options);
            break;
         case 'empty-view-stack':
            this.emptyViewStack();
            break;
         default:
            console.error('Error: Empty event');
            break;
      }
   };

   emptyViewStack = () => {
      this.setState({ emptyingViews: true });

      console.log(this.state);
      setTimeout(() => {
         this.setState(state => {
            state.viewStack = state.viewStack.slice(0, 1);
            state.emptyingViews = false;
            return state;
         });
      }, 500);
   };

   newView(options) {
      const { view } = options;

      this.setState({ changingView: true });

      setTimeout(() => {
         this.setState(state => {
            state.changingView = false;
            state.viewStack.push(view);
            return state;
         });
      }, 500);
   }

   getCurrentView = () => {
      const { viewStack, changingView } = this.state;
      const currentView = viewStack[viewStack.length - 1];
      const view = views[currentView.name];
      let props = {
         ...currentView.props,
         changingView,
      };
      props.onEvent = this.handleEvent;

      try {
         return React.cloneElement(view, props);
      } catch (e) {
         console.error('Error: this sidebar view is broken');
         console.error('view: ', view);
      }
   };

   render() {
      const { viewStack, emptyingViews } = this.state;

      return (
         <Container>
            <GlobalStyle />
            <HomeIcon
               hide={viewStack.length === 1}
               onClick={this.emptyViewStack}>
            </HomeIcon>
            <ViewContainer hidden={emptyingViews}>
               {this.getCurrentView()}
            </ViewContainer>
         </Container>
      );
   }
}
