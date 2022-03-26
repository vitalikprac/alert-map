import { Slider as SliderAntd } from 'antd';
import { MapContainer as LeafletMapContainer } from 'react-leaflet';
import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';

const PRIMARY_COLOR = '#1890ff';

export const Header = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid ${PRIMARY_COLOR};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const FOOTER_HEIGHT = 75;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${FOOTER_HEIGHT}px;
  border: 1px solid ${PRIMARY_COLOR};
  border-right: none;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const LiveCircle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 20px;
  height: 20px;

  &:before {
    content: '';
    position: relative;
    display: block;
    width: 250%;
    height: 250%;
    box-sizing: border-box;
    margin-left: -75%;
    margin-top: -75%;
    border-radius: 45px;
    background-color: #75daad;
    animation: pulse 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #75daad;
    border-radius: 50px;
    animation: circle 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  }
`;

export const SliderContainer = styled.div`
  display: flex;
  width: 300px;
  @media (max-width: 767px) {
    width: auto;
  }
`;

export const Slider = styled(SliderAntd)`
  flex: 1 1 auto;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const Question = styled(QuestionCircleOutlined)`
  cursor: pointer;
  font-size: 2rem;
  color: ${PRIMARY_COLOR};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const MapContainerWithFooter = styled.div`
  height: 100%;
  width: 100%;
`;

export const MapContainer = styled(LeafletMapContainer)`
  height: calc(100% - ${FOOTER_HEIGHT}px);
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  min-width: 350px;
  overflow-y: auto;
  overflow-x: auto;
  padding-top: 0.5rem;
  gap: 0.5rem;
  margin-right: 0.5rem;
  border-left: 1px solid ${PRIMARY_COLOR};
  @media (max-width: 767px) {
    display: none;
  }
`;

export const Loading = styled.div`
  width: 30px;
`;

export const LoadingWrapper = styled.div`
  width: 115px;
  cursor: ${(props) => (props.isLive ? 'default' : 'pointer')};
  @media (max-width: 400px) {
    width: unset;
  }
  display: flex;
  justify-content: space-between;
`;

export const LoadingLive = styled.div`
  display: flex;
  position: relative;
  width: 35px;
  align-items: center;
  top: 3px;
`;

export const LoadingText = styled.span`
  opacity: ${(props) => (props.isLive ? '1' : '0.5')};
  @media (max-width: 400px) {
    display: none;
  }
`;

export const City = styled.div`
  cursor: pointer;
  margin: 0 0.5rem 0 1rem;
  padding: 0.25rem;
  border: 1px solid red;
  border-radius: 0.5rem;
  &:hover {
    background-color: pink;
  }
`;
