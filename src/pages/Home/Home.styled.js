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

export const MapContainer = styled(LeafletMapContainer)`
  height: 100%;
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
