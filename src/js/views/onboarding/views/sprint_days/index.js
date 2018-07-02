import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@ifixit/toolbox';
import { animation } from '../../../../toolbox';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

const Container = styled.div`
   display: flex;
   height: 100%;
   animation: ${props =>
         props.changingViews ? animation.slideOutLeft : animation.slideInRight}
      0.5s;
`;

const RowContainer = styled.div`
   max-width: 40em;
   margin-left: 20%;
`;
const DaysContainer = styled.div`
   width: 10em;
   margin-bottom: 2em;
`;
const ButtonContainer = styled.div`
   margin-left: 3.5em;
`;
const Divider = styled.div`
   margin-bottom: 1em;
`;

export default class SprintDaysView extends Component {
   constructor(props) {
      super(props);
      console.log(props);
      this.state = {
         config: props.config,
      };
   }

   handleEvent = options => {
      switch (options.type) {
         case 'update-row':
            this.updateRow(options);
            break;
         case 'new-member':
            this.addMemberRow();
            break;
         case 'delete-member':
            this.removeMemberRow(options.index);
            break;
         default:
            console.log('default event');
            break;
      }
   };

   updateHolidays = ({ value }) => {
      this.setState(state => {
         state.config.holidays = value;
         return state;
      });
   };

   done = () => {
      if (!(this.state.config.start_date && this.state.config.end_date)) {
         console.log(this.state.config);
         alert('Make sure all fields are filled in');
         return;
      } else {
         let { config } = this.state;

         this.props.onEvent({
            type: 'next-view',
            view: this.props.next,
            config,
         });
      }
   };

   render() {
      const { changingViews } = this.props;
      const { config } = this.state;
      const { holidays, start_date, end_date, days_in_sprint } = config;

      return (
         <Container changingViews={changingViews}>
            <RowContainer>
               <h1>Days in Sprint</h1>
               <h2>{days_in_sprint ? (days_in_sprint - holidays) : 0} Days</h2>
               <DateRangePicker
                  startDate={start_date}
                  startDateId="your_unique_start_date_id"
                  endDate={end_date}
                  endDateId="your_unique_end_date_id"
                  onDatesChange={({ startDate, endDate }) =>
                     this.setState(state => {
                        state.config.start_date = startDate;
                        state.config.end_date = endDate;
                        if (!endDate) return state;
                        state.config.days_in_sprint = endDate.diff(
                           startDate,
                           'days',
                        );
                        return state;
                     })
                  }
                  focusedInput={this.state.focusedInput}
                  onFocusChange={focusedInput =>
                     this.setState({ focusedInput })
                  }
               />
               <Divider/>
               <DaysContainer>
                  <TextField
                     type="number"
                     label="Holidays"
                     onChange={this.updateHolidays}
                     value={holidays}
                     placeholder="0"
                  />
               </DaysContainer>
               <Button design="primary" children={'Next'} onClick={this.done} />
            </RowContainer>
         </Container>
      );
   }
}
