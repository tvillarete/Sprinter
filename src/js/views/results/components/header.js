import React from 'react';
import styled from 'styled-components';
import { animation, Stars } from '../../../toolbox';

const TitleContainer = styled.div`
   margin: 6em auto 0 auto;
   max-width: 48em;
   padding: 24px 100px;
   animation: ${animation.fadeIn} 0.3s;
`;

const Title = styled.h1`
   font-size: 55px;
   margin: 0;
`;

const StatusContainer = styled.div`
   display: flex;
   margin-top: 8px;
`;

const Status = styled.h3`
   color: ${props => (props.isOpen ? '#6cce95' : 'red')};
   margin: 0;
   font-weight: normal;
   margin-right: 12px;
`;

const Address = styled.h3`
   font-weight: 300;
   margin: 0 12px;
`;

const RatingContainer = styled.div`
   display: flex;
   padding: 8px 0;

   h4 {
      font-weight: 300;
      margin: 1px 8px 0 8px;
      color: #828282;
   }
`;

const Header = ({ business, rating, type }) => {
   if (!business.name) return null;
   const { name, location, review_count, is_closed, price } = business;
   type = type.charAt(0).toUpperCase() + type.slice(1);

   return (
      <TitleContainer>
         <Title>{name}</Title>
         <StatusContainer>
            <Status isOpen={!is_closed}>
               {is_closed ? 'Closed' : 'Open'} Now
            </Status>
            &bull;
            <Address>
               {location.address1}, {location.city}
            </Address>
         </StatusContainer>
         <RatingContainer>
            <Stars rating={rating} />
            <h4>{`(${review_count} reviews)`}</h4>
         </RatingContainer>
         <Categories categories={[type, price, 'Nearby']} />
      </TitleContainer>
   );
};

const CategoriesContainer = styled.div`
   display: flex;
   padding: 16px 0 0 0;
`;

const CategoryBubble = styled.h4`
   background: #E9E9E9;
   border-radius: 24px;
   margin: 0 12px 0 0;
   padding: 4px 24px;
   color: #444A56;
`;

const Categories = ({ categories }) => {
   return (
      <CategoriesContainer>
         {categories.map((category, index) => (
            <CategoryBubble key={`${category}-${index}`}>
               {category}
            </CategoryBubble>
         ))}
      </CategoriesContainer>
   );
};

export default Header;
