/**
 * @public
 * @param {Object} obj: Check for the presence of something in the object
 * Returns boolean
 */
export const isEmpty = obj => {
  return Object.keys(obj).length === 0;
};


/**
 * @public
 * @param {Array} news: list for get tags from all news
 * Returns array with tags
 */
export const getTagsFromNews = news => {
  const result = {};
  news.map(({ tags: tagsNews }) => {
    return tagsNews.forEach(tag => {
      if (result[tag]) return;
      result[tag] = {
        name: tag,
        active: false
      };
    });
  });
  return result;
};

/**
 * @public
 * @param {Array} news List of News
 * @param {String} searchValue String for search in the title of News
 * Returns new list of News
 */
export const getNewsBySearch = (news, searchValue) => {
  return news.filter(novetly => {
    return novetly.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  });
};

/**
 * @public
 * @param {Array} news List of News
 * @param {Array} filtered Array for filtered result of News
 * Returns new list of News
 */
export const getNewsByTags = (news, filtered) => {
  return news.filter(novetly => {
    return novetly.tags.some(tag => filtered.includes(tag));
  });
};
