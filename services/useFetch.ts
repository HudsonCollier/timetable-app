import { useState, useEffect } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
  
    const fetchData = async (customFetchFunction?: () => Promise<T>) => {
      try {
        setError(null);
  
        const result = await (customFetchFunction ? customFetchFunction() : fetchFunction());
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("error"));
      } finally {
      }
    };
  
    const reset = () => {
      setData(null);
      setError(null);
    };
  
    useEffect(() => {
      if (autoFetch) {
        fetchData();
      }
    }, []);
  
    return { data, error, refetch: fetchData, reset };
  };
  
  export default useFetch;
  


