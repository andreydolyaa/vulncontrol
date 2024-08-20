import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/nmapSlice";

export const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    websocket.onmessage = (event) => {
      dispatch(addMessage(event.data))
      // console.log("Message received: ", event.data);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    setSocket(websocket);

    return () => {
      websocket.close();
    };
  }, [url]);

  return socket;
};
