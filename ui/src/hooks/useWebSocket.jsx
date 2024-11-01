import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incomingScan } from "../redux/nmap";
import { incomingToast } from "../redux/toastSlice";

export const useWebSocket = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const websocket = new WebSocket(url);
    websocket.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      if (incoming?.type) {
        dispatch(incomingToast(incoming));
      } else {
        dispatch(incomingScan(incoming));
      }
    };

    return () => {
      websocket.close();
    };
  }, [url, dispatch]);
};
