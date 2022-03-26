import { useEffect, useRef } from 'react';

import { WEBSOCKET_URL } from './constants';

export const useWebSocket = ({ onNewData }) => {
  const webSocketRef = useRef(null);
  useEffect(() => {
    const webSocket = new WebSocket(WEBSOCKET_URL);
    webSocket.onmessage = (message) => {
      let data;
      try {
        data = JSON.parse(message.data);
      } catch (e) {
        data = null;
      }
      onNewData(data);
    };
    webSocketRef.current = webSocket;
  }, []);
};
