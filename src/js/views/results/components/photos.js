import React from 'react';
import styled from 'styled-components';
import { animation } from '../../../toolbox';

const Container = styled.div`
   display: flex;
   overflow: auto;
   flex-direction: column;
   animation: ${animation.fadeIn} 0.3s;
   max-width: 48em;
   margin: 16px auto 22px auto;
   padding: 0px 100px;
`;

const Header = styled.h2`
   margin: 0;
   padding: 24px 0;
`;

const PhotosContainer = styled.div`
   display: flex;
`;

const Photo = styled.img`
   max-height: 10em;
   margin-right: 16px;
`;

const Photos = ({ photos }) => {
   if (!photos) return null;

   return (
      <Container>
         <Header>Photos</Header>
         <PhotosContainer>
            {photos.map((url, index) => {
               return <Photo key={url} src={url} />;
            })}
         </PhotosContainer>
      </Container>
   );
};

export default Photos;
