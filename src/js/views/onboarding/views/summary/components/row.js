import React, { Component } from 'react';
import styled from 'styled-components';
import { constants, TextField, Icon } from '@ifixit/toolbox';

const { color } = constants;

const Container = styled.div`
   display: flex;
   margin-bottom: 1em;
`;

const Index = styled.h3`
   width: 1em;
   margin: auto 1em;
`;

const NameContainer = styled.div`
   max-width: 10em;
   margin-right: 1em;
`;

const PercentContainer = styled.div`
   max-width: 5em;
   margin-right: 1em;
`;

const VacationContainer = styled.div`
   max-width: 5em;
   margin-right: 1em;
`;

const DeleteContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
`;

export default class MemberRow extends Component {
   state = {
      name: '',
      percent: '100',
      vacationDays: '0',
   };

   updateRow = () => {
      const { index } = this.props;

      this.props.onEvent({
         type: 'update-row',
         index,
         value: this.state
      });
   }

   updateName = ({ value }) => {
      this.setState({ name: value });
   };

   updatePercent = ({ value }) => {
      this.setState({ percent: value > 0 ? value : '0' });
   };

   updateVacationDays = ({ value }) => {
      this.setState({ vacationDays: value > 0 ? value : '0' });
   };

   deleteRow = () => {
      const { index } = this.props;

      this.props.onEvent({
         type: 'delete-member',
         index,
      });
   };

   render() {
      const { index } = this.props;
      const { name, percent, vacationDays } = this.state;

      return (
         <Container>
            <Index>{index + 1}.</Index>
            <NameContainer>
               <TextField
                  type="text"
                  value={name}
                  onChange={this.updateName}
                  onBlur={this.updateRow}
                  placeholder="Name"
                  required
               />
            </NameContainer>
            <PercentContainer>
               <TextField
                  type="number"
                  value={percent}
                  onChange={this.updatePercent}
                  onBlur={this.updateRow}
                  placeholder="100"
               />
            </PercentContainer>
            <VacationContainer>
               <TextField
                  type="number"
                  value={vacationDays}
                  onChange={this.updateVacationDays}
                  onBlur={this.updateRow}
                  placeholder="0"
               />
            </VacationContainer>
            <DeleteContainer  onClick={this.deleteRow}>
               <Icon name="x" />
            </DeleteContainer>
         </Container>
      );
   }
}
