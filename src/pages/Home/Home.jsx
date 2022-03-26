import { DatePicker, InputNumber, notification, Popover, Spin } from 'antd';
import locale from 'antd/es/date-picker/locale/uk_UA';
import { useEffect, useRef, useState } from 'react';

import { getBeautifyTime } from '../../utils/helpers';

import Map from './Map';
import { useAlerts } from './useAlerts';
import { useWebSocket } from './useWebSocket';
import * as S from './Home.styled';

const MIN_HOUR = 1;
const MAX_HOUR = 24;

const UPDATE_TIME = 20_000;

const Home = () => {
  const { getAlerts, loading, citiesRef, citiesLoading } = useAlerts();
  const [dateTime, setDateTime] = useState(Date.now());
  const [inputValue, setInputValue] = useState(3);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const isLiveRef = useRef(true);
  const [datePickerValue, setDatePickerValue] = useState('');

  const mapRef = useRef(null);

  useWebSocket({
    onNewData: (newData) => {
      if (!isLiveRef.current) {
        return;
      }

      const startCities = newData
        .filter((x) => x.status === 'START')
        .map((x) => x.city);
      const endCities = newData
        .filter((x) => x.status === 'END')
        .map((x) => x.city);

      if (startCities.length > 0) {
        notification.info({
          key: startCities.join(''),
          message: 'ТРИВОГА',
          description: startCities.join(', '),
        });
      }

      if (endCities.length > 0) {
        notification.info({
          key: endCities.join(''),
          message: 'ВІДБІЙ ТРИВОГИ',
          description: endCities.join(', '),
        });
      }

      setCities((prevCities) => {
        let newCities = [...prevCities];

        newData.forEach(({ status, date, city, data }) => {
          if (status === 'START') {
            const isCityAlreadyExist = prevCities.find(
              (prevCity) => prevCity.city === city,
            );
            if (!isCityAlreadyExist) {
              newCities.push({ status, date, city, data });
            }
          } else if (status === 'END') {
            newCities = newCities.filter((x) => x.city !== city);
          }
        });
        return newCities;
      });
    },
  });

  useEffect(() => {
    if (citiesLoading) {
      return;
    }

    const newFilteredCities = cities.filter(
      (x) => dateTime - inputValue * 60 * 60 * 1000 < x.date,
    );
    newFilteredCities.forEach((filteredCity) => {
      if (!filteredCity.data) {
        // eslint-disable-next-line no-param-reassign
        filteredCity.data = citiesRef.current.find(
          (x) => x.city === filteredCity.city,
        )?.data;
      }
    });
    setFilteredCities(newFilteredCities);
  }, [cities, inputValue, citiesLoading]);

  useEffect(() => {
    if (isLiveRef.current) {
      const interval = setInterval(() => {
        if (isLiveRef.current) {
          setDateTime(Date.now());
        }
      }, UPDATE_TIME);

      return () => {
        clearInterval(interval);
      };
    }
    return () => {};
  }, [isLiveRef.current]);

  useEffect(() => {
    getAlerts(Date.now()).then(setCities);
  }, []);

  const handleChange = (value) => {
    setDatePickerValue(value);
    const date = value?.toDate?.()?.getTime?.() || Date.now();
    isLiveRef.current = !value;
    setDateTime(date);
    getAlerts(date).then(setCities);
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

  const isLive = isLiveRef.current;

  const handleLiveClick = () => {
    setDatePickerValue('');
    const now = Date.now();
    setDateTime(now);
    getAlerts(now).then(setCities);
    isLiveRef.current = true;
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.LoadingWrapper onClick={handleLiveClick} isLive={isLive}>
          <S.LoadingLive isLive={isLive}>
            <div className={`video__icon ${isLive ? '' : 'video__icon_stop'}`}>
              <div className="circle--outer" />
              <div className="circle--inner" />
            </div>
          </S.LoadingLive>
          <S.LoadingText isLive={isLive}>НАЖИВО</S.LoadingText>
        </S.LoadingWrapper>

        <div>
          <DatePicker
            value={datePickerValue}
            locale={locale}
            showTime
            onChange={handleChange}
            onOk={handleChange}
          />
        </div>
        <S.Loading>{(loading || citiesLoading) && <Spin />}</S.Loading>
      </S.Header>
      <S.Container>
        <S.MapContainerWithFooter>
          <S.MapContainer center={[49.518, 31.278]} zoom={6}>
            <Map
              ref={mapRef}
              cities={filteredCities}
              loading={loading}
              dateTime={dateTime}
            />
          </S.MapContainer>
          <S.Footer>
            <div>
              <div>
                Telegram{' '}
                <a href="tg://resolve?domain=vitalikprac">@vitalikprac</a>
              </div>
              <div>Карта повітряних тривог України</div>
              <div>
                Source:{' '}
                <a href="https://github.com/vitalikprac/alert-map">
                  https://github.com/vitalikprac/alert-map
                </a>
              </div>
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
                    Інформація про тривоги за останній час (
                    <b>{inputValue} год.</b>)
                  </div>
                }
                title="Довідка"
              >
                <S.Question />
              </Popover>
            </S.SliderContainer>
          </S.Footer>
        </S.MapContainerWithFooter>
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
