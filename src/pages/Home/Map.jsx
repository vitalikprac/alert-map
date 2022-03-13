import L from 'leaflet';
import React from 'react';
import { GeoJSON, TileLayer } from 'react-leaflet';

import { getCustomIcon } from '../../components/CustomIcon';

const Map = ({ cities }) => {
  const handleEachFeature = (feature, layer, city) => {
    layer.bindTooltip(city.display_name);
  };
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <GeoJSON onEachFeature={handleEachFeature} data={data[0].geojson} /> */}
      {cities.map((city) => (
        <GeoJSON
          key={city.osm_id}
          style={{
            fillColor: 'red',
            color: 'red',
          }}
          data={city.geojson}
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
