import { useState, useEffect } from 'react';
import { getBlogs } from './blogStore';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const blogs = getBlogs();
      setData(blogs);
      setError(null);
    } catch (err) {
      setError('Could not load blogs.');
    } finally {
      setPending(false);
    }
  }, []);

  return { data, isPending, error };
};

export default useFetch;