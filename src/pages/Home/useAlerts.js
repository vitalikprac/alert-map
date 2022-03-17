import { useState } from 'react';

import * as API from './api';

export const useAlerts = () => {
  const [loading, setLoading] = useState(false);

  const getAlerts = async (dateTime) => {
    setLoading(true);
    const newCities = await API.getAlerts(dateTime);
    setLoading(false);
    return newCities;
  };

  return { getAlerts, loading };
};
