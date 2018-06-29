import React from 'react';
import styled from 'styled-components';
import { animation } from '../../../toolbox';

const Container = styled.div`
   margin-top: 24px;
   padding: 5px 100px 90px 100px;
   max-width: 48em;
   margin: 0 auto;
   animation: ${animation.fadeIn} 0.3s;
`;

const Header = styled.h2`
`;

const Reviews = ({ reviews }) => {
   if (!reviews.reviews) return null;

   return (
      <Container>
         <Header>Reviews</Header>
         {reviews.reviews.map((review, index) => {
            const { user, text, rating } = review;
            return (
               <Review key={text} user={user} text={text} rating={rating} />
            );
         })}
      </Container>
   );
};

const ReviewContainer = styled.div`
   display: flex;
   margin: 16px 0 0 0;
`;

const UserImage = styled.img`
   width: 3em;
   height: 3em;
   margin: 4px 16px;
   border-radius: 50%;
`;

const TextContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 80%;
   max-width: 40em;
`;

const ReviewText = styled.p`
   font-weight: normal;
   margin: 0;
   line-height: 1.35;
`;

const Author = styled.p`
   margin: 5px 0;
`;

const Review = ({ user, text, rating }) => {
   const { image_url, name } = user;

   return (
      <ReviewContainer>
         <UserImage src={image_url || 'files/images/user.png'} />
         <TextContainer>
            <ReviewText>{`"${text}"`}</ReviewText>
            <Author>- {name}</Author>
         </TextContainer>
      </ReviewContainer>
   );
};

export default Reviews;
