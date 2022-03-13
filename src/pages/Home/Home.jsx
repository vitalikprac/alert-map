import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';

import { getOpenStreetMapCity } from './api';
import Map from './Map';
import * as S from './Home.styled';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('Вінницька область');
  useEffect(() => {}, []);

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    const [cityData] = await getOpenStreetMapCity(city);
    if (cityData) {
      setCities((prev) => [...prev, cityData]);
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <Input
          onChange={handleChangeCity}
          defaultValue={city}
          placeholder="City"
        />
        <Button onClick={handleSearch}>Search</Button>
      </S.Header>
      <S.MapContainer center={[49.518, 31.278]} zoom={6}>
        <Map cities={cities} />
      </S.MapContainer>
    </S.Wrapper>
  );
};

export default Home;
