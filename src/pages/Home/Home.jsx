import { Button, Input, InputNumber, Slider } from 'antd';
import React, { useEffect, useState } from 'react';

import { getAlerts, getOpenStreetMapCity } from './api';
import Map from './Map';
import * as S from './Home.styled';

const Home = () => {
  const [inputValue, setInputValue] = useState(6);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    getAlerts().then((newCities) => {
      setCities(newCities);
    });
  }, []);

  useEffect(() => {
    setFilteredCities(
      cities.filter((x) => Date.now() - inputValue * 60 * 60 * 1000 < x.date),
    );
  }, [cities, inputValue]);

  return (
    <S.Wrapper>
      <S.Header>
        <div>
          <Slider
            min={1}
            max={48}
            onChange={(value) => {
              setInputValue(value);
            }}
            value={inputValue}
          />
          <InputNumber
            min={1}
            max={48}
            style={{ margin: '0 16px' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {/* <Input
          onChange={handleChangeCity}
          defaultValue={city}
          placeholder="City"
        />
        <Button onClick={handleSearch}>Search</Button> */}
      </S.Header>
      <S.MapContainer center={[49.518, 31.278]} zoom={6}>
        <Map cities={filteredCities} />
      </S.MapContainer>
    </S.Wrapper>
  );
};

export default Home;
