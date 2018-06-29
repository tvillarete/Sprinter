import React, { Component } from 'react';
import styled from 'styled-components';
import { animation, color } from '../../toolbox';
import Bubble from '../../components/bubble';

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding-top: 8vh;
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
   max-width: 60vh;
   margin: 0 auto;
`;

const Header = styled.h1`
   text-align: center;
`;

const Section = styled.div`
   display: flex;
   flex-direction: column;
   margin-bottom: 10vh;
`;

const Mission = styled.h2`
   text-align: center;
   font-weight: 300;
   max-width: 30em;
   margin: 0 auto;
`;

export default class AboutView extends Component {
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

   visitPortfolio = url => {
      window.open(url, '_blank');
   }

   getBubbles = () => {
      const people = [
         'Tanner Villarete',
         'Katie Mei',
         'Spoorthy Vemula',
         'Kent Tran',
         'Zane Ali',
      ];

      const portfolios = [
         'http://tannerv.com',
         'https://www.linkedin.com/in/katherinemei/',
         'https://www.linkedin.com/in/spoorthy-vemula-7412b5a7/',
         'https://www.linkedin.com/in/kent-tran-10682011a/',
         'https://www.linkedin.com/in/zane-ali-3a476a146/'
      ];

      return people.map((name, index) => {
         const c = index > 5 ? color.bubbles[index - 5] : color.bubbles[index];
         return (
            <Bubble
               key={`${name}-${index}`}
               size="15vh"
               text={name}
               color={c}
               onClick={() => this.visitPortfolio(portfolios[index])}
            />
         );
      });
   };

   render() {
      const { changingView } = this.props;

      return (
         <Container changingView={changingView}>
            <Section>
               <Header>About</Header>
               <Mission>{`Playce is about discovery. You answer a few questions and we'll show you the best stuff around.`}</Mission>
            </Section>
            <Section>
               <Header>The Crew</Header>
               <BubbleContainer>{this.getBubbles()}</BubbleContainer>
            </Section>
         </Container>
      );
   }
}
