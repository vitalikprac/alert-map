import TimeAgo from 'javascript-time-ago';
import uk from 'javascript-time-ago/locale/uk.json';
import L from 'leaflet';
import React from 'react';
import { GeoJSON, TileLayer } from 'react-leaflet';

import { getCustomIcon } from '../../components/CustomIcon';

TimeAgo.addDefaultLocale(uk);

const timeAgo = new TimeAgo('en-US');
const getBeautifyTime = (from, to) => timeAgo.format(from);

const Map = ({ cities, loading }) => {
  const handleEachFeature = (feature, layer, city) => {
    const diffTime = getBeautifyTime(city.date, Date.now());
    const tooltip = `${city.city} ${diffTime}`;
    layer.bindTooltip(tooltip);
  };
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <GeoJSON onEachFeature={handleEachFeature} data={data[0].geojson} /> */}
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
};

export default Map;
