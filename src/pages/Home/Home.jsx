import { DatePicker, InputNumber, Popover, Spin } from 'antd';
import locale from 'antd/es/date-picker/locale/uk_UA';
import { useEffect, useRef, useState } from 'react';

import { getBeautifyTime } from '../../utils/helpers';

import Map from './Map';
import { useAlerts } from './useAlerts';
import * as S from './Home.styled';

const MIN_HOUR = 1;
const MAX_HOUR = 24;

const Home = () => {
  const { getAlerts, loading } = useAlerts();
  const [dateTime, setDateTime] = useState(Date.now());
  const [inputValue, setInputValue] = useState(3);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const mapRef = useRef(null);

  useEffect(() => {
    setFilteredCities(
      cities.filter((x) => dateTime - inputValue * 60 * 60 * 1000 < x.date),
    );
  }, [cities, inputValue]);

  useEffect(() => {
    if (dateTime) {
      getAlerts(dateTime).then(setCities);
    }
  }, [dateTime]);

  const handleChange = (value) => {
    if (value) {
      setDateTime(value.toDate().getTime());
    } else {
      setDateTime(Date.now());
    }
  };

  const handleCityClick = (city) => {
    if (!mapRef.current) {
      return;
    }

    // eslint-disable-next-line no-underscore-dangle
    const cityElement = Object.values(mapRef.current._layers).find(
      (x) => x.name === city,
    );
    if (!cityElement) {
      return;
    }

    const bounds = cityElement?.getBounds?.();
    if (!bounds) {
      const latLng = cityElement?.getLatLng();
      mapRef.current.flyTo(latLng, 10);
      return;
    }
    mapRef.current.flyToBounds(bounds);
  };

  return (
    <S.Wrapper>
      <S.Header>
        <div>
          <DatePicker
            locale={locale}
            showTime
            onChange={handleChange}
            onOk={handleChange}
          />
        </div>

        <S.SliderContainer>
          <S.Slider
            min={MIN_HOUR}
            max={MAX_HOUR}
            onChange={(value) => {
              if (value) {
                setInputValue(value);
              }
            }}
            value={inputValue}
          />
          <InputNumber
            min={MIN_HOUR}
            max={MAX_HOUR}
            style={{ margin: '0 8px' }}
            value={inputValue}
            onChange={setInputValue}
          />
          <Popover
            content={
              <div>
                Інформація про тривоги за останній час (<b>{inputValue} год.</b>
                )
              </div>
            }
            title="Довідка"
          >
            <S.Question />
          </Popover>
        </S.SliderContainer>
        <S.Loading>{loading && <Spin />}</S.Loading>
      </S.Header>
      <S.Container>
        <S.MapContainer center={[49.518, 31.278]} zoom={6}>
          <Map
            ref={mapRef}
            cities={filteredCities}
            loading={loading}
            dateTime={dateTime}
          />
        </S.MapContainer>
        <S.SideBar>
          {!loading &&
            filteredCities
              .sort((a, b) => b.date - a.date)
              .map(({ city, date }) => (
                <S.City onClick={() => handleCityClick(city)} key={city}>
                  {city} - <b>{getBeautifyTime(date, dateTime)}</b>
                </S.City>
              ))}
        </S.SideBar>
      </S.Container>
    </S.Wrapper>
  );
};

export default Home;
