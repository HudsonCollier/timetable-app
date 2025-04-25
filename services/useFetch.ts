import { useState, useEffect } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  
    const fetchData = async (customFetchFunction?: () => Promise<T>) => {
      try {
        setLoading(true);
        setError(null);
  
        const result = await (customFetchFunction ? customFetchFunction() : fetchFunction());
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("error"));
      } finally {
        setLoading(false);
      }
    };
  
    const reset = () => {
      setData(null);
      setLoading(false);
      setError(null);
    };
  
    useEffect(() => {
      if (autoFetch) {
        fetchData();
      }
    }, []);
  
    return { data, loading, error, refetch: fetchData, reset };
  };
  
  export default useFetch;
  


