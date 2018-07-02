import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, TextField, constants } from '@ifixit/toolbox';
import { animation } from '../../../../toolbox';

const { color } = constants;

const Container = styled.div`
   height: 100%;
   animation: ${props =>
         props.changingViews ? animation.slideOutLeft : animation.slideInRight}
      0.5s;
`;

const Header = styled.h1``;

const ResultsTable = styled.div`
   max-width: 40em;
   margin: 0 auto;
`;

const Row = styled.div`
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid ${color.gray[5]};

   h3, h2 {
      font-weight: ${props => props.important ? 'bold' : 'normal'};
      color: ${props => props.important ? color.blue[5] : 'black'};
   }
`;
const Column = styled.div``;

const Label = styled.h3`
   font-weight: normal;
`;
const Answer = styled.h2`
   padding: 0 1em;
`;

const ButtonContainer = styled.div`
   max-width: 40em;
   margin: 0 auto;
   margin-top: 1em;
`;

const round = (num) => {
   return Math.round(num*100)/100;
}

export default class SummaryView extends Component {
   constructor(props) {
      super(props);
      const { config } = props;

      this.state = {
         config,
         prevSprints: config.prevSprints,
      };
   }

   handleEvent = options => {
      switch (options.type) {
         default:
            console.log('default event');
            break;
      }
   };

   updatePoints = ({ index, value }) => {
      this.setState(state => {
         state.config.prevSprints[index].total_points = value;
         return state;
      });
   };

   updatePersonDays = ({ index, value }) => {
      this.setState(state => {
         state.config.prevSprints[index].person_days = value;
         return state;
      });
   };

   done = () => {
      if (false) {
         console.log(this.state.config);
         alert('Make sure all fields are filled in');
         return;
      } else {
         const { config } = this.state;
         console.log(config);

         this.props.onEvent({
            type: 'next-view',
            view: this.props.next,
            config,
         });
      }
   };

   getMemberData = () => {
      const { config } = this.state;
      const { members, days_in_sprint } = config;
      console.log(members);
      let totalPersonDays = 0;

      for (let i = 0; i < members.length; i++) {
         const member = members[i];
         const { vacationDays, percent } = member;
         totalPersonDays += days_in_sprint * (percent / 100) - vacationDays;
      }
      console.log('Total person days:', totalPersonDays);
      this.setState(state => {
         state.config.total_person_days = totalPersonDays;
         return state;
      });
   };

   getAvgSPPersonDays = () => {
      const { config } = this.state;
      const { prevSprints } = config;
      let total = 0;

      for (let i = 0; i < 3; i++) {
         const sprint = prevSprints[i];
         const { total_points, person_days } = sprint;

         total += total_points / person_days;
      }
      this.setState(state => {
         state.config.avg_sp_person_days = total / 3;
         return state;
      });
   };

   goHome = () => {
      this.props.onEvent({
         type: 'empty-view-stack',
      });
   }

   componentDidMount() {
      this.getMemberData();
      this.getAvgSPPersonDays();
   }

   render() {
      const { changingViews } = this.props;
      const { config } = this.state;
      const {
         days_in_sprint,
         holidays,
         total_person_days,
         avg_sp_person_days,
      } = config;

      return (
         <Container changingViews={changingViews}>
            <ResultsTable>
               <Header>Results</Header>
               <Row>
                  <Label>Days in Sprint:</Label>
                  <Answer>{round(days_in_sprint - holidays)}</Answer>
               </Row>
               <Row>
                  <Label>Person-Days:</Label>
                  <Answer>{round(total_person_days)}</Answer>
               </Row>
               <Row>
               <Label>Points/Person-Days (Average of Last 3 sprints):</Label>
                  <Answer>{round(avg_sp_person_days)}</Answer>
               </Row>
               <Row>
                  <Label>Total Points:</Label>
                  <Answer>{round(total_person_days * avg_sp_person_days)}</Answer>
               </Row>
               <Row important>
                  <Label>Points Without FastPass: </Label>

                  <Answer>
                     {round(total_person_days * avg_sp_person_days * 0.8)}
                  </Answer>
               </Row>
               <Row important>
                  <Label>Fastpass Points:</Label>
                  <Answer>
                     {round(total_person_days * avg_sp_person_days * 0.2)}
                  </Answer>
               </Row>
            </ResultsTable>
            <ButtonContainer>
               <Button children="Done" design="primary" onClick={this.goHome}/>
            </ButtonContainer>
         </Container>
      );
   }
}
