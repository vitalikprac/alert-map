import { Button, DatePicker, Input, InputNumber, Slider, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { getAlerts, getOpenStreetMapCity } from './api';
import Map from './Map';
import * as S from './Home.styled';

const Home = () => {
  const [dateTime, setDateTime] = useState(Date.now());
  const [inputValue, setInputValue] = useState(3);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAlerts(dateTime).then((newCities) => {
      setLoading(false);
      setCities(newCities);
    });
  }, [dateTime]);

  useEffect(() => {
    setFilteredCities(
      cities.filter((x) => dateTime - inputValue * 60 * 60 * 1000 < x.date),
    );
  }, [cities, inputValue]);

  const handleChange = (value) => {
    if (value) {
      setDateTime(value.toDate().getTime());
    } else {
      setDateTime(Date.now());
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <div>
          <DatePicker showTime onChange={handleChange} onOk={handleChange} />
        </div>
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
        <div style={{ width: '100px' }}>{loading && <Spin />}</div>
        {/* <Input
          onChange={handleChangeCity}
          defaultValue={city}
          placeholder="City"
        />
        <Button onClick={handleSearch}>Search</Button> */}
      </S.Header>
      <S.MapContainer center={[49.518, 31.278]} zoom={6}>
        <Map cities={filteredCities} loading={loading} />
      </S.MapContainer>
    </S.Wrapper>
  );
};

export default Home;
