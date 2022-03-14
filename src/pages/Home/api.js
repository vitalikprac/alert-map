export const getOpenStreetMapCity = async (cityName) => {
  const url = `https://nominatim.openstreetmap.org/search.php?q=${cityName}&polygon_geojson=1&format=jsonv2&limit=1`;

  try {
    const data = await fetch(url);
    return await data.json();
  } catch (e) {
    return {};
  }
};

export const getAlerts = async () => {
  const url = `http://alert-ukraine.eu-4.evennode.com/alert/`;
  try {
    const data = await fetch(url);
    return await data.json();
  } catch (e) {
    return [];
  }
};
