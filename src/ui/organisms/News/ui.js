import React, { useRef, useEffect } from 'react';
import Masonry from 'masonry-layout';
import { news } from 'data/news';
import imagesLoaded from 'imagesloaded';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Wrapper from 'atoms/Wrapper';
import Novetly from 'molecules/Novelty';

const cn = bemHelper('news');

const News = () => {
  const newsRef = useRef(null);

  useEffect(() => {
    if (newsRef.current) {
      imagesLoaded(newsRef.current, () => {
        return new Masonry(newsRef.current, {
          itemSelector: '.news__novetly',
          columnWidth: '.news__novetly'
        });
      });
    }
  }, [newsRef]);

  return (
    <Wrapper mix={cn('wrapper').className}>
      <div {...cn('row')} ref={newsRef}>
        {news && news.map(novetly => (
          <Novetly mix={cn('novetly').className} key={novetly.title} {...novetly} />
        ))}
      </div>
    </Wrapper>
  );
};

export default News;
