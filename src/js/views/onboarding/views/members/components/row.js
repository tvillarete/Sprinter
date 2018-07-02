import React, { Component } from 'react';
import styled from 'styled-components';
import { TextField, Icon } from '@ifixit/toolbox';

const Container = styled.div`
   position: relative;
   height: 2.5em;
   display: flex;
   margin-bottom: 1em;
   height: ${props => props.isFirst && '5em'};
   animation: slideAppear 0.3s;

   @keyframes slideAppear {
      0% {
         opacity: 0;
         margin-bottom: -2.5em;
      }
   }
`;

const Index = styled.h3`
   width: 1em;
   margin: ${props => (props.isFirst ? '2.3em 1em' : 'auto 1em')};
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
   max-width: 7em;
   margin-right: 1em;
`;

const DeleteContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   margin: ${props => (props.isFirst ? '3.3em 1em' : 'auto 1em')};
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
         value: this.state,
      });
   };

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
         <Container isFirst={index === 0}>
            <Index isFirst={index === 0}>{index + 1}.</Index>
            <NameContainer>
               <TextField
                  type="text"
                  value={name}
                  label={index === 0 && 'Name'}
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
                  label={index === 0 && '% Working'}
                  onChange={this.updatePercent}
                  onBlur={this.updateRow}
                  placeholder="100"
               />
            </PercentContainer>
            <VacationContainer>
               <TextField
                  type="number"
                  value={vacationDays}
                  label={index === 0 && 'Vacation Days'}
                  onChange={this.updateVacationDays}
                  onBlur={this.updateRow}
                  placeholder="0"
               />
            </VacationContainer>
            <DeleteContainer isFirst={index === 0} onClick={this.deleteRow}>
               <Icon name="x" />
            </DeleteContainer>
         </Container>
      );
   }
}
