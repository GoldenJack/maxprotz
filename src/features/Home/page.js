import React, { Fragment } from 'react';
import Masonry from 'react-masonry-component';
import { useNews } from 'hooks';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Wrapper from 'atoms/Wrapper';
import Novetly from 'molecules/Novelty';
import Control from 'organisms/Control';

const cn = bemHelper('news');
const masonryOptions = {
  transitionDuration: 300
};

const Home = () => {
  const { news, tags, search, onChangeSearch, onChangeTags, onClear } = useNews();
  return (
    <Wrapper mix={cn('wrapper').className}>
      <Fragment>
        <div {...cn('title')}>
          <h2 {...cn('caption')}>Новости</h2>
        </div>
        <Masonry
          className="row"
          elementType="div"
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
          // imagesLoadedOptions={imagesLoadedOptions}
        >
          {news.map(novetly => (
            <Novetly mix={cn('novetly').className} key={novetly.title} {...novetly} />
          ))}
        </Masonry>
        <Control
          searchValue={search}
          onChangeSearch={onChangeSearch}
          tags={tags}
          toggleTag={onChangeTags}
          onClear={onClear}
        />
      </Fragment>
    </Wrapper>
  );
};

export default Home;
