const url = `http://alert-ukraine.eu-4.evennode.com/alert/`;
// const url = `http://localhost:4000/alert/`;

export const getAlerts = async (date = Date.now()) => {
  try {
    const data = await fetch(`${url}${date}`);
    return await data.json();
  } catch (e) {
    return [];
  }
};
