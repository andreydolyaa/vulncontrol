import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/baseUrl";

export const useFetch = (url, fallback) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const fullUrl = BASE_URL + "/api" + url;
        const response = await fetch(fullUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result || fallback);
      } catch (error) {
        if (error.name === "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};
