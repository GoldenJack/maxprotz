import { useEffect, useState, useCallback } from 'react';
import { newsData as news } from 'data/news';

export const useNovetly = id => {
  const [novetly, setNovetly] = useState({});

  const getNovetly = useCallback(
    () => news.filter(newsItem => newsItem.id === +id), [id]
  );

  useEffect(() => setNovetly(getNovetly()[0]), [id, getNovetly]);

  return { novetly };
};
