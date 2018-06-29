import React from 'react';
import { Home } from 'react-feather';
import styled from 'styled-components';

const Container = styled.div`
   z-index: 100;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   height: 4em;
   opacity: ${props => (props.hidden ? 0 : 1)};
   display: flex;
   align-items: center;
   max-width: 72em;
   margin: 0 auto;
   transition: all 0.15s ease;
   backdrop-filter: blur(15px);
   background: rgba(255,255,255,0.7);
   padding: 0 24px;
`;

const Header = ({ hidden, onEvent }) => {
   const goHome = () => {
      onEvent({
         type: 'empty-view-stack',
      });
   };

   return (
      <Container hidden={hidden}>
         <Home style={{ cursor: 'pointer' }} onClick={goHome} />
      </Container>
   );
};

export default Header;
