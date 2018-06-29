import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Loader, animation } from '../../../toolbox';

const Container = styled.div`
   animation: ${animation.fadeIn} 0.3s;
`;

const LoadingContainer = () => <Loader />;

export class MapContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         position: props.position
      }
   }

   static getDerivedStateFromProps(nextProps) {
      return {
         position: nextProps.position
      }
   }

   render() {
      const { position } = this.state;

      return (
         <Container>
            <Map key={position} google={this.props.google} zoom={18} initialCenter={position}>
               <Marker position={position} />
            </Map>
         </Container>
      );
   }
}

export default GoogleApiWrapper({
   apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo',
   LoadingContainer: LoadingContainer,
})(MapContainer);
