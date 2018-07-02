import React, { Component } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
   background: dodgerblue;
   border-radius: 6px;
`;

const Text = styled.h3`
   color: white;
   padding: 0 10px;
   font-weight: 400;
`;

export default class Bubble extends Component {
   state = {
      clicked: false,
   };

   handleClick = () => {
      this.setState({ clicked: true });
      setTimeout(() => {
         this.props.onClick();
      }, 500);
   };

   render() {
      const { text, color, size, } = this.props;

      return (
         <ButtonContainer
            size={size}
            color={color}
            onClick={this.handleClick}>
            <Text>{text || 'Empty Bubble'}</Text>
         </ButtonContainer>
      );
   }
}
