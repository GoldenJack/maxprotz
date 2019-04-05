import React, { useState } from 'react';
import T from 'prop-types';
import { useAnimation } from 'hooks';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Input from 'atoms/Input';
import Button from 'atoms/Button';

const cn = bemHelper('control');

const propTypes = {
  tags: T.oneOfType([
    T.object,
    T.array
  ]).isRequired,
  toggleTag: T.func.isRequired,
  searchValue: T.string.isRequired,
  onChangeSearch: T.func.isRequired,
  onClear: T.func.isRequired
};

const Control = ({
  tags,
  toggleTag,
  searchValue,
  onChangeSearch,
  onClear
}) => {
  const [visible, setVisible] = useState(null);
  const animation = useAnimation({
    toggle: visible
  });

  const toggleVisible = () => {
    visible === null
      ? setVisible(true)
      : setVisible(!visible);
  };

  const onClearControl = () => {
    onClear();
    setVisible(false);
  };

  const _renderTags = () => {
    const tagsKeys = Object.keys(tags);
    return tagsKeys.map(tagsKey => {
      const tag = tags[tagsKey];
      return (
        <span
          {...cn('tag', tag.active && 'active')}
          key={tag.name}
          onClick={() => toggleTag(tag.name)}
          role="none"
        >
          {tag.name}
        </span>
      );
    });
  };

  return (
    <div {...cn('', animation)}>
      <span {...cn('button-toggle')} onClick={toggleVisible} role="none">
        <img src="img/settings.svg" alt="O" />
      </span>
      <div {...cn('body')}>
        <div {...cn('header')}>
          <h4 {...cn('caption')}>Фильтр новостей</h4>
        </div>
        <div {...cn('search-input')}>
          <Input
            mix={cn('input').className}
            type="text"
            placeholder="Введите запрос..."
            value={searchValue}
            onChange={onChangeSearch}
          />
        </div>
        <div {...cn('tags-filter')}>
          {_renderTags()}
        </div>
        <div {...cn('clear')}>
          <Button
            mix={cn('clear-button').className}
            type="button"
            effect={onClearControl}
          >
            Очистить
          </Button>
        </div>
      </div>
    </div>
  );
};

Control.propTypes = propTypes;

export default Control;
