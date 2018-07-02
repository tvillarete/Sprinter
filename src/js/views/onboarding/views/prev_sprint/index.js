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

const Subheader = styled.h3`
   color: ${color.gray[6]};
`;

const RowContainer = styled.div`
   max-width: 40em;
   margin-left: 20%;
`;

const WeekContainer = styled.div`
   display: flex;
   margin-bottom: 2em;

   input[type='number'] {
      width: 10em;
      margin-right: 10px;
   }
`;
const ButtonContainer = styled.div`
   margin-left: 3.5em;
`;

export default class PrevSprintView extends Component {
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

   getRows = () => {
      const labels = ['Last sprint', 'Two Sprints Ago', 'Three Sprints Ago'];
      const rows = [];
      const { config } = this.state;
      const { prevSprints } = config;

      for (let i = 0; i < 3; i++) {
         rows.push(
            <div>
               <h2>{labels[i]}</h2>
               <WeekContainer key={`week-${i}`}>
                  <TextField
                     type="number"
                     label={i === 0 && 'Total Points'}
                     placeholder="0"
                     required
                     value={prevSprints[i].total_points}
                     onChange={({ value }) =>
                        this.updatePoints({ index: i, value })
                     }
                  />
                  <TextField
                     type="number"
                     label="Person-days"
                     label={i === 0 && 'Person-days'}
                     placeholder="0"
                     required
                     value={prevSprints[i].person_days}
                     onChange={({ value }) =>
                        this.updatePersonDays({ index: i, value })
                     }
                  />
               </WeekContainer>
            </div>,
         );
      }
      return rows;
   };

   render() {
      const { changingViews } = this.props;
      const { config, prevSprints } = this.state;

      return (
         <Container changingViews={changingViews}>
            <RowContainer>
               <h1>First Time Setup</h1>
               <div>
                  <Subheader>
                     {
                        "Since this is one of your first 3 sprints, please add your previous sprint's points & person days"
                     }
                  </Subheader>
               </div>
               <form>{this.getRows()}</form>
               <Button design="primary" children={'Next'} onClick={this.done} />
            </RowContainer>
         </Container>
      );
   }
}
