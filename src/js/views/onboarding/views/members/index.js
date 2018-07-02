import React, { Component } from 'react';
import styled from 'styled-components';
import MemberRow from './components/row';
import { constants, Button } from '@ifixit/toolbox';
import { animation } from '../../../../toolbox';

const { color } = constants;

const Container = styled.div`
   display: flex;
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
const ButtonContainer = styled.div`
   margin-left: 3.5em;
   margin-bottom: 1em;
`;

export default class MembersView extends Component {
   constructor(props) {
      console.log(props);
      super(props);
      this.state = {
         config: props.config,
      };
   }

   static getDerivedStateFromProps(nextProps) {
      return {
         config: nextProps.config,
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

   updateRow({ index, value }) {
      this.setState(state => {
         const { config } = state;
         let { members } = config;

         members[index] = value;
         state.config.members = members;
         return state;
      });
   }

   addMemberRow = () => {
      this.setState(state => {
         const { config } = state;
         const { members } = config;

         members.push({});
         state.config.members = members;
         return state;
      });
   };

   removeMemberRow = index => {
      this.setState(
         state => {
            const { config } = state;
            let { members } = config;
            members.splice(index, 1);

            state.config.members = members;
            return state;
         },
         () => {
            console.log(this.state);
         },
      );
   };

   getMembers() {
      const { config } = this.state;
      console.log(config);
      if (!config.members) return null;
      const { members } = config;
      return members.map((member, index) => (
         <MemberRow
            key={`member-${index}-${member}`}
            index={index}
            onEvent={this.handleEvent}
         />
      ));
   }

   done = () => {
      if (!this.state.config.members.length) {
         alert('Please add at least one member');
         return;
      } else {
         const { config } = this.state;
         console.log(this.props);

         this.props.onEvent({
            type: 'next-view',
            view: this.props.next,
            config,
         });
      }
   };

   render() {
      const { changingViews } = this.props;

      return (
         <Container changingViews={changingViews}>
            <RowContainer>
               <h1>Members</h1>
               <Subheader>Add, edit, or remove squad members</Subheader>
               <form>
                  {this.getMembers()}
                  <ButtonContainer>
                     <Button
                        design="outline"
                        children="New Member"
                        onClick={this.addMemberRow}
                     />
                  </ButtonContainer>
               </form>
               <ButtonContainer>
                  <Button
                     design="primary"
                     children={'Next'}
                     onClick={this.done}
                  />
               </ButtonContainer>
            </RowContainer>
         </Container>
      );
   }
}
