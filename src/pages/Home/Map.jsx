import L from 'leaflet';
import T from 'prop-types';
import React, { forwardRef, useEffect } from 'react';
import { GeoJSON, TileLayer, useMap } from 'react-leaflet';

import { getCustomIcon } from '../../components/CustomIcon';
import { getBeautifyTime } from '../../utils/helpers';

const Map = forwardRef(({ cities, loading, dateTime }, ref) => {
  const map = useMap();

  const handleEachFeature = (feature, layer, city) => {
    const diffTime = getBeautifyTime(city.date, dateTime);
    const tooltip = `${city.city} ${diffTime}`;
    // eslint-disable-next-line no-param-reassign
    layer.name = city.city;
    layer.bindTooltip(tooltip);
  };

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    ref.current = map;
  }, []);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!loading &&
        cities.map((city) => (
          <GeoJSON
            key={city.city}
            style={{
              fillColor: 'red',
              color: 'red',
            }}
            data={city.data?.[0]?.geojson}
            pointToLayer={(feature, latLng) => {
              const icon = getCustomIcon('blue-icon');
              return L.marker(latLng, { icon });
            }}
            onEachFeature={(feature, layer) => {
              handleEachFeature(feature, layer, city);
            }}
          />
        ))}
    </>
  );
});

Map.propTypes = {
  cities: T.arrayOf(
    T.shape({
      city: T.string,
      data: T.shape({}),
    }),
  ),
  loading: T.bool,
  dateTime: T.number,
};

export default Map;
