import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckCircle } from 'react-feather';
import { animation, Loader, color } from '../../../toolbox';
import Bubble from '../../../components/bubble';
import ApiManager from '../../../api_manager';

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

const TitleContainer = styled.div`
   padding: 10vh 0 2.5vh 0;
`;

const Title = styled.h2`
   font-size: 3em;
   text-align: center;
   margin: 0;
`;

const Subtitle = styled.h3`
   font-size: 1.5em;
   font-weight: 300;
   text-align: center;
   margin: 0;
`;

const LoadingContainer = styled.div`
   display: flex;
   justify-content: center;
   margin: 2.5vh 0;
   transition: all 0.35s ease;
   opacity: ${props => (props.hidden ? 0 : 1)};
`;

const ButtonContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 5vh;
`;

const phrases = [
   'Querying our home-grown neural net...',
   'Throwing out the boring stuff...',
   'Reticulating splines...',
   'Parsing the blockchain...',
];

export default class Conclusion extends Component {
   state = {
      phraseIndex: 0,
      loading: true,
      data: null,
   };

   selectAnswer = answer => {
      const { next } = answer;

      this.props.onEvent({
         type: 'select-answer',
         answer: answer.answer,
         next,
      });
   };

   fetchResults() {
      const { category, answers, coords } = this.props;
      const api = new ApiManager();
      const packet = {
         category,
         latitude: coords.latitude,
         longitude: coords.longitude,
      };
      for (let i in answers) {
         const answer = answers[i];
         packet[answer.shorthand] = answer.answer;
      }

      api
         .getResults(packet)
         .then(response => {
            setTimeout(() => {
               this.setState({
                  data: response,
                  loading: false,
               });
               clearInterval(this.state.intervalId);
            }, 4000);
         })
         .catch(e => {
            console.error('Error: Unable to get results:', e);
         });
   }

   viewResults = () => {
      const { data } = this.state;

      this.props.onEvent({
         type: 'new-view',
         view: {
            name: 'results',
            props: {
               results: data.results,
            },
         },
      });
   };

   incrementPhrases = () => {
      this.setState(state => {
         state.phraseIndex++;
         return state;
      });
   };

   componentDidMount() {
      this.fetchResults();
      const intervalId = setInterval(this.incrementPhrases, 2000);
      this.setState({ intervalId });
   }

   render() {
      const { changingQuestions } = this.props;
      const { phraseIndex, data } = this.state;

      return (
         <Container
            key={`conclusion-view`}
            changingQuestions={changingQuestions}>
            <TitleContainer>
               <Title>{'Gathering Results'}</Title>
               <Subtitle>{data ? 'Got it!' : phrases[phraseIndex]}</Subtitle>
            </TitleContainer>
            <LoadingContainer>
               {data ? <CheckCircle size={40} color="#56dc56" /> : <Loader />}
            </LoadingContainer>
            <ButtonContainer>
               {data && (
                  <Bubble
                     text="View Results"
                     color={color.bubbles[0]}
                     onClick={this.viewResults}
                  />
               )}
            </ButtonContainer>
         </Container>
      );
   }
}
