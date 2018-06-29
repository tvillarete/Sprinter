import React from 'react';
import styled, { keyframes } from 'styled-components';
import LoadingIndicator from 'react-loading-indicator';
import StarRatings from 'react-star-ratings';

export const animation = {
   scaleEnter: keyframes`
      0% {
         opacity: 0;
         transform: scale(0.8);
      }
   `,
   fadeIn: keyframes`
      0% {
         opacity: 0;
      }
   `,
   fadeOut: keyframes`
      100% {
         opacity: 0;
      }
   `,
   slideIn: keyframes`
      0% {
         opacity: 0;
         transform: translateY(100%);
      }
   `,
   bounce: keyframes`
      0% {
         transform: scale(0);
         opacity: 0;
      }
      50% {
         transform: scale(1.6);
         opacity: 0.7;
      }
      60% {
         transform: scale(0.6);
         opacity: 1;
      }
      100% {
         transform: scale(1);
      }
   `,
   slideOutLeft: keyframes`
      100% {
         opacity: 0;
         transform: translateX(-20%);
      }
   `,
   slideInRight: keyframes`
      0% {
         opacity: 0;
         transform: translateX(10%);
      }
   `,
};

export const color = {
   /* Blue        Red        Green */
   bubbles: ['#71D2E7', '#FF7272', '#9CDA6C', '#B979F2', '#FF9E75'],
};

const LoaderContainer = styled.div`
   animation: ${animation.bounce} 0.5s;
`;

export const Loader = () => {
   return (
      <LoaderContainer>
         <LoadingIndicator segmentLength={8} segmentWidth={3} />
      </LoaderContainer>
   );
};

export const Stars = ({ rating }) => {
   return (
      <StarRatings
         rating={rating}
         starRatedColor={'#FFC342'}
         starDimension="20px"
         starSpacing="1px"
      />
   );
};
