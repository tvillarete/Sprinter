import React from 'react';
import styled from 'styled-components';
import { color, animation } from '../../../toolbox';

const Container = styled.div`
   display: flex;
   padding-right: 24px;
`;

const Button = styled.p`
   padding: 11px 22px;
   background: ${props => props.isSaved ? color.bubbles[1] : color.bubbles[0]};
   color: white;
   margin: 0;
   font-weight: normal;
   border-radius: 80px;
   cursor: pointer;
   transition: all 0.15s ease;
   box-shadow: 0 5px 10px ${props => props.isSaved ? '#ff727285' : '#71d2e763'};
   animation: ${animation.fadeIn} 0.3s;

   &:hover {
      filter: brightness(110%);
   }
   &:active {
      filter: brightness(95%);
   }
`;

const SaveButton = ({ isSaved, result, onEvent }) => {
   let playces = localStorage.playces ? JSON.parse(localStorage.playces) : [];

   const saveToPlayces = () => {
      playces.push(result);
      onEvent({
         type: 'update-playces',
         playces,
      });
   };

   const removeFromPlayces = () => {
      for (let i in playces) {
         const playce = playces[i];
         if (playce.name === result.name) {
            playces.splice(i, 1);
            onEvent({
               type: 'update-playces',
               playces: playces,
            });
            return;
         }
      }
   };

   return (
      <Container>
         <Button isSaved={isSaved} onClick={isSaved ? removeFromPlayces : saveToPlayces}>
            {isSaved ? 'Remove from' : 'Save to'} Playces
         </Button>
      </Container>
   );
};

export default SaveButton;
