import { MapContainer as LeafletMapContainer } from 'react-leaflet';
import styled from 'styled-components';

export const Header = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const MapContainer = styled(LeafletMapContainer)`
  height: 100%;
  width: 100%;
`;
