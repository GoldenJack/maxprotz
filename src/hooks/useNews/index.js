import { useEffect, useMemo, useReducer } from 'react';
import { newsData } from 'data/news';
import { getTagsFromNews, getNewsBySearch, getNewsByTags } from 'utils/helper';


const initialState = {
  news: [],
  tags: [],
  filtered: [],
  sorting: '',
  search: ''
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'news':
      return { ...state, news: payload.news };
    case 'tags':
      return { ...state, tags: payload.tags };
    case 'filtered':
      return { ...state, filtered: payload.filtered };
    case 'search':
      return { ...state, search: payload.search };
    case 'clear':
      return { ...state, filtered: [], search: '', sorting: '', tags: payload.tags };
    default:
      throw new Error();
  }
};

export const useNews = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tagsOptions = useMemo(() => getTagsFromNews(newsData), []);

  useEffect(() => {
    let initialNews = newsData;
    if (state.search) initialNews = getNewsBySearch(initialNews, state.search);
    if (state.filtered.length > 0) initialNews = getNewsByTags(initialNews, state.filtered);

    dispatch({ type: 'news', payload: { news: initialNews } });
  }, [state.search, state.filtered]);

  useEffect(() => {
    dispatch({ type: 'tags', payload: { tags: tagsOptions } });
  }, [tagsOptions]);

  useEffect(() => {
    const filltered = Object.keys(state.tags).filter(tag => {
      return state.tags[tag].active === true;
    });

    dispatch({ type: 'filtered', payload: { filtered: filltered } });
  }, [state.tags]);

  const onChangeSearch = value => dispatch({
    type: 'search',
    payload: { search: value }
  });

  const onChangeTags = tagName => {
    const tags = {};
    Object.keys(state.tags).forEach(tag => {
      tags[tag] = {
        name: tag,
        active: tag === tagName ? !state.tags[tag].active : state.tags[tag].active
      };
    });

    dispatch({ type: 'tags', payload: { tags } });
  };

  const onClear = () => dispatch({ type: 'clear', payload: { tags: tagsOptions } });

  return {
    ...state,
    onChangeSearch,
    onChangeTags,
    onClear
  };
};
