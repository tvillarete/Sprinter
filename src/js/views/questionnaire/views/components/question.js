import React from 'react';
import styled from 'styled-components';

const Text = styled.h2`
   font-family: "GT Walsheim";
   font-size: 4vh;
   text-align: center;
   font-weight: 300;
   margin: 0;
`;

const Question = ({ text }) => {
   return (
      <Text>{text}</Text>
   );
}

export default Question;
