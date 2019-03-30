import { useEffect, useReducer, useMemo } from 'react';

const initialState = {
  opening: '',
  error: '',
  closing: '',
  toggle: ''
};

const init = () => {
  return initialState;
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'opening':
      return { ...state, opening: payload.cn };
    case 'closing':
      return { ...state, closing: payload.cn };
    case 'error':
      return { ...state, error: payload.cn };
    case 'toggle':
      return { ...state, toggle: payload.cn };
    case 'clear':
      return init();
    default:
      throw new Error();
  }
};

export const useAnimation = ({
  opening = false,
  error = false,
  closing = false,
  toggle = null,
  duration = 1000
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getClassName = useMemo(() => {
    return Object.keys(state).map(key => state[key]).join(' ');
  }, [state]);

  useEffect(() => {
    error && dispatch({ type: 'error', payload: { cn: 'animation-errors' } });
  }, [error]);

  useEffect(() => {
    opening && dispatch({ type: 'opening', payload: { cn: 'animation-opening' } });
    closing && dispatch({ type: 'closing', payload: { cn: 'animation-closing' } });
  }, [opening, closing]);

  useEffect(() => {
    if (typeof toggle === 'boolean') {
      toggle
        ? dispatch({ type: 'toggle', payload: { cn: 'animation-open' } })
        : dispatch({ type: 'toggle', payload: { cn: 'animation-close' } });
    }
  }, [toggle]);

  useEffect(() => {
    state.opening && setTimeout(() => dispatch({ type: 'opening', payload: { cn: '' } }), duration);
  }, [state.opening, duration]);

  useEffect(() => {
    state.error && setTimeout(() => dispatch({ type: 'clear' }), duration);
  }, [state.error, duration]);

  return getClassName;
};
