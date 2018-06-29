import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   height: 7.5em;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   backdrop-filter: blur(10px);
   background: rgba(0, 0, 0, 0.38);
`;

const Address = styled.p`
   margin: 0;
   margin-bottom: 13px;
   color: white;
`;

const Button = styled.p`
   padding: 10px 26px;
   background: #3380F3;
   color: white;
   margin: 0;
   font-weight: normal;
   border-radius: 50px;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
   cursor: pointer;
   transition: all 0.15s ease;

   &:hover {
      filter: brightness(110%);
   }
   &:active {
      filter: brightness(95%);
   }
`;

const DirectionsButton = ({ name, address }) => {
   const getDirections = () => {
      const search = name.split(' ').join('+');
      const url = `https://www.google.com/search?q=directions+to+${search}`;
      window.open(url, '_blank');
   }

   return (
      <Container>
         <Address>{address}</Address>
         <Button onClick={getDirections}>Get Directions</Button>
      </Container>
   );
};

export default DirectionsButton;
