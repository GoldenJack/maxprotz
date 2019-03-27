import React, { useState } from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Input from 'atoms/Input';

const cn = bemHelper('control');

const propTypes = {
  tags: T.array.isRequired,
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
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
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
    <div {...cn('', visible && 'open')}>
      <span {...cn('button-toggle')} onClick={toggleVisible} role="none">
        <img src={visible ? 'img/close.svg' : 'img/settings.svg'} alt="O" />
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
          <button {...cn('clear-button')} type="button" onClick={onClearControl}>Очистить</button>
        </div>
      </div>
    </div>
  );
};

Control.propTypes = propTypes;

export default Control;
