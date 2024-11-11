import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incomingScan } from "../redux/nmap";
import { incomingToast } from "../redux/toastSlice";
import {
  setSelectedScan,
  updateSubfinder,
} from "../redux/subfinder/subfinderSlice";

export const useWebSocket = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const websocket = new WebSocket(url);
    websocket.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      if (incoming?.type === "toast") {
        dispatch(incomingToast(incoming));
      } else if (incoming.type === "subfinder") {
        if (incoming.data?.status === "done") {
          dispatch(setSelectedScan(incoming.data));
        }
        dispatch(updateSubfinder(incoming));
      } else {
        dispatch(incomingScan(incoming));
      }
    };

    return () => {
      websocket.close();
    };
  }, [url, dispatch]);
};
