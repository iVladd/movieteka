import { useEffect, useState } from "react";
import { token } from "../config";

type UseFetchState<T> = [T | undefined, boolean, string | undefined];

function useFetch<T>(url: string): UseFetchState<T> {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    fetch(url, options)
      .then((res) => {
        setError(undefined);
        if (!res.ok) throw new Error("Server Error");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return [data, isLoading, error];
}

export default useFetch;
