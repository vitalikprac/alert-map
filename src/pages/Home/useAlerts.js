import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import * as API from './api';
import { SERVER_URL } from './constants';

export const useAlerts = () => {
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const citiesRef = useRef(null);

  useEffect(() => {
    import('../../resources/cities.json').then((data) => {
      citiesRef.current = data.default;
      setCitiesLoading(false);
    });
  }, []);

  const getAlerts = async (dateTime) => {
    setLoading(true);
    const newCities = await API.getAlerts(dateTime);
    setLoading(false);
    return newCities;
  };

  return { getAlerts, loading, citiesLoading, citiesRef };
};
