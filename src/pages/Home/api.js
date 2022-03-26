import { SERVER_URL } from './constants';

export const getAlerts = async (date = Date.now()) => {
  try {
    const data = await fetch(`${SERVER_URL}${date}`);
    return await data.json();
  } catch (e) {
    return [];
  }
};
